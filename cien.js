/* ============================================================
   cien.js - la tabla del 1 al 100.

   Tres cosas, todas con la misma tabla de 10 x 10:
   1. El juego: faltan algunos números y Chepe los escribe con el
      teclado. Se escoge hasta dónde llega la tabla (del 1 al 10, al
      20, … al 100) y cuántos huecos tiene. También se puede jugar con
      la hoja exacta de la escuela, que es del 1 al 100.
   2. La hoja de la escuela en PDF (pdf/cien-escuela.pdf), igual a
      la que trajo: en inglés, con «Name:» arriba y los mismos huecos.
   3. Hojas nuevas al azar, en el mismo formato, para imprimir.

   Los números van dibujados con los trazos de numeros.js, en la
   pantalla y en el PDF, nunca en texto (el 7 con su rayita, el 4
   abierto…). Por eso el PDF se dibuja aquí con jsPDF y no se
   imprime la página.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- los huecos ---------- */

  /* La hoja que mandaron de la escuela («Name: chepe»). */
  var ESCUELA = [3, 6, 9, 14, 18, 22, 25, 30, 31, 37, 43, 46, 48, 52, 55,
                 60, 64, 67, 73, 76, 79, 81, 88, 92, 95, 100];

  /* La cantidad de huecos va en proporción al tamaño de la tabla: en
     la del 1 al 100, pocos son 10, como la hoja 25 y muchos 40. */
  var NIVELES = {
    pocos:   { parte: 0.10, minimo: 2 },
    hoja:    { parte: 0.25, minimo: 3 },
    muchos:  { parte: 0.40, minimo: 4 },
    escuela: {}
  };

  function cuantosHuecos(nivel, hasta) {
    if (nivel === "escuela") return ESCUELA.length;
    var N = NIVELES[nivel];
    return Math.max(N.minimo, Math.round(hasta * N.parte));
  }

  /* Huecos al azar, distintos cada vez. Ninguna fila queda vacía del
     todo: con al menos un número en cada fila siempre hay de dónde
     agarrarse. */
  function huecosAlAzar(cuantos, hasta) {
    var todos = [], n;
    hasta = hasta || 100;
    for (n = 1; n <= hasta; n++) todos.push(n);
    for (n = todos.length - 1; n > 0; n--) {
      var j = Math.floor(Math.random() * (n + 1));
      var t = todos[n]; todos[n] = todos[j]; todos[j] = t;
    }
    var elegidos = [], porFila = {};
    for (n = 0; n < todos.length && elegidos.length < cuantos; n++) {
      var fila = Math.floor((todos[n] - 1) / 10);
      if ((porFila[fila] || 0) >= 7) continue;
      porFila[fila] = (porFila[fila] || 0) + 1;
      elegidos.push(todos[n]);
    }
    return elegidos.sort(function (a, b) { return a - b; });
  }

  function huecosDe(nivel, hasta) {
    return nivel === "escuela" ? ESCUELA.slice() : huecosAlAzar(cuantosHuecos(nivel, hasta), hasta);
  }

  /* ---------- la hoja en PDF ----------
     Tamaño carta, vertical, como la de la escuela: «Name:» con su
     raya arriba a la izquierda y la tabla ocupando la hoja. */

  var HOJA = { ancho: 215.9, alto: 279.4, x0: 15, y0: 38, celdaW: 18.59, celdaH: 22 };

  /* Los caminos solo tienen M, L y C absolutos. */
  function pasos(d) {
    var t = d.match(/[MLC]|-?\d+(\.\d+)?/g), out = [], op = null, num = [];
    function cerrar() {
      if (op) out.push({ op: op, c: num });
    }
    t.forEach(function (x) {
      if (/[MLC]/.test(x)) { cerrar(); op = x; num = []; }
      else num.push(parseFloat(x));
    });
    cerrar();
    return out;
  }

  function numeroEnPDF(doc, n, cx, cy, alto) {
    var id = String(n);
    var trazos = window.NUMERO_TRAZOS_DE(id);
    var s = alto / 70 * (id.length > 2 ? 0.92 : 1);   // los números miden 70 de alto (y de 40 a 110)
    var mx = id.length > 1 ? 75 : 48;                  // el centro de su celda
    function X(x) { return cx + (x - mx) * s; }
    function Y(y) { return cy + (y - 75) * s; }
    doc.setLineWidth(7 * s);
    doc.setLineCap("round");
    doc.setLineJoin("round");
    trazos.forEach(function (t) {
      var lista = pasos(t.d).map(function (p) {
        if (p.op === "C") {
          return { op: "c", c: [X(p.c[0]), Y(p.c[1]), X(p.c[2]), Y(p.c[3]), X(p.c[4]), Y(p.c[5])] };
        }
        return { op: p.op === "M" ? "m" : "l", c: [X(p.c[0]), Y(p.c[1])] };
      });
      doc.path(lista);
      doc.stroke();
    });
  }

  function hojaPDF(huecos, hasta) {
    hasta = hasta || 100;
    var filas = hasta / 10;
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ unit: "mm", format: "letter", orientation: "portrait" });
    var H = HOJA, vacio = {};
    huecos.forEach(function (n) { vacio[n] = true; });

    doc.setProperties({ title: "Hundreds chart" });
    doc.setTextColor(0);
    doc.setDrawColor(0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.text("Name:", H.x0, 25);
    doc.setLineWidth(0.4);
    doc.line(H.x0 + 23, 26, H.x0 + 110, 26);

    var w = H.celdaW * 10, h = H.celdaH * filas, i;
    doc.setLineWidth(0.45);
    for (i = 0; i <= 10; i++) doc.line(H.x0 + i * H.celdaW, H.y0, H.x0 + i * H.celdaW, H.y0 + h);
    for (i = 0; i <= filas; i++) doc.line(H.x0, H.y0 + i * H.celdaH, H.x0 + w, H.y0 + i * H.celdaH);
    for (var n = 1; n <= hasta; n++) {
      if (vacio[n]) continue;
      var f = Math.floor((n - 1) / 10), c = (n - 1) % 10;
      numeroEnPDF(doc, n, H.x0 + (c + 0.5) * H.celdaW, H.y0 + (f + 0.5) * H.celdaH, 8.5);
    }
    return doc;
  }

  window.CIEN = { hojaPDF: hojaPDF, ESCUELA: ESCUELA, huecosAlAzar: huecosAlAzar };

  /* ---------- la voz ----------
     Se escoge en el juego: español o inglés. Se le pasa el número en
     cifras y la voz lo dice en el idioma que toca. */

  var FRASES = {
    es: {
      lang: "es-MX",
      casi: "Casi. Mira el número de antes y el de después.",
      pista: function (n) { return n > 1 ? "Después del " + (n - 1) + " viene…" : "Es el primero."; },
      fin: "¡Muy bien! Completaste la tabla."
    },
    en: {
      lang: "en-US",
      casi: "Almost. Look at the number before and the number after.",
      pista: function (n) { return n > 1 ? "After " + (n - 1) + " comes…" : "It is the first one."; },
      fin: "Great job! You finished the chart."
    }
  };

  var voz = "es";

  function decir(txt, nodo) {
    if (nodo) {
      nodo.classList.add("sonando");
      setTimeout(function () { nodo.classList.remove("sonando"); }, 1200);
    }
    if (!("speechSynthesis" in window)) return;
    var F = FRASES[voz];
    var u = new SpeechSynthesisUtterance(String(txt));
    u.lang = F.lang;
    u.rate = 0.8;
    var pref = F.lang.slice(0, 2);
    var v = speechSynthesis.getVoices().filter(function (x) { return x.lang && x.lang.toLowerCase().indexOf(pref) === 0; });
    var exacta = v.filter(function (x) { return x.lang.replace("_", "-") === F.lang; });
    if (exacta.length) u.voice = exacta[0]; else if (v.length) u.voice = v[0];
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  function leer(clave, porDefecto) {
    try { return localStorage.getItem(clave) || porDefecto; } catch (e) { return porDefecto; }
  }
  function guardar(clave, valor) {
    try { localStorage.setItem(clave, valor); } catch (e) { /* sin almacenamiento: no pasa nada */ }
  }

  /* ---------- el juego ---------- */

  var tabla = document.getElementById("tabla-cien");
  if (!tabla) return;

  var teclado = document.getElementById("teclado");
  var estado = document.getElementById("cien-estado");
  var final = document.getElementById("cien-final");
  var celdas = [];
  var faltan = {};          // n -> intentos fallidos
  var escrito = "";
  var elegida = null;       // número del hueco seleccionado
  var nivel = leer("cien-nivel", "pocos");
  if (!NIVELES[nivel]) nivel = "pocos";
  var hasta = Number(leer("cien-hasta", "20"));
  if (!(hasta >= 10 && hasta <= 100 && hasta % 10 === 0)) hasta = 20;
  if (nivel === "escuela") hasta = 100;
  voz = leer("cien-voz", "es") === "en" ? "en" : "es";

  var TINTA = "#3a3330", TINTA_ESCRITA = "#336e93";

  function dibujo(n, color) { return window.NUMERO_SVG(String(n), color, 8); }

  function cuantosFaltan() { return Object.keys(faltan).length; }

  function pintarEstado() {
    var k = cuantosFaltan();
    estado.textContent = k === 0 ? "" : (k === 1 ? "Falta 1 número" : "Faltan " + k + " números");
  }

  function armarTabla() {
    tabla.innerHTML = "";
    celdas = [];
    faltan = {};
    escrito = "";
    elegida = null;
    final.hidden = true;
    tabla.classList.remove("completa");
    tabla.setAttribute("aria-label", "Tabla del 1 al " + hasta);
    huecosDe(nivel, hasta).forEach(function (n) { faltan[n] = 0; });

    for (var n = 1; n <= hasta; n++) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "celda";
      b.dataset.n = n;
      if (n in faltan) {
        b.classList.add("hueco");
        b.setAttribute("aria-label", "Hueco: ¿qué número va aquí?");
      } else {
        b.innerHTML = dibujo(n, TINTA);
        b.setAttribute("aria-label", String(n));
      }
      tabla.appendChild(b);
      celdas[n] = b;
    }
    pintarEstado();
    siguiente(0);
  }

  function seleccionar(n) {
    if (elegida && celdas[elegida]) {
      celdas[elegida].classList.remove("elegida");
      if (elegida in faltan) celdas[elegida].innerHTML = "";
    }
    escrito = "";
    elegida = n;
    if (n) {
      celdas[n].classList.add("elegida");
      celdas[n].focus({ preventScroll: true });
    }
    pintarEscrito();
  }

  /* El siguiente hueco después de n (y si no hay, el primero que quede). */
  function siguiente(n) {
    var k;
    for (k = n + 1; k <= hasta; k++) if (k in faltan) return seleccionar(k);
    for (k = 1; k <= n; k++) if (k in faltan) return seleccionar(k);
    seleccionar(null);
  }

  function pintarEscrito() {
    var vista = document.getElementById("escrito");
    if (elegida) {
      celdas[elegida].innerHTML = escrito ? dibujo(escrito, TINTA_ESCRITA) : "";
    }
    vista.innerHTML = escrito ? dibujo(escrito, TINTA_ESCRITA) : "";
    vista.classList.toggle("vacio", !escrito);
  }

  function escribir(cifra) {
    if (!elegida) return;
    if (escrito.length >= 3) return;
    if (escrito === "" && cifra === "0") return;    // ningún número empieza con 0
    escrito += cifra;
    pintarEscrito();
  }

  function borrar() {
    escrito = escrito.slice(0, -1);
    pintarEscrito();
  }

  function marcarVecinos(n) {
    [n - 1, n + 1].forEach(function (k) {
      var c = celdas[k];
      if (!c) return;
      c.classList.add("vecino");
      setTimeout(function () { c.classList.remove("vecino"); }, 2600);
    });
  }

  function revisar() {
    if (!elegida || !escrito) return;
    var n = elegida, c = celdas[n];
    if (Number(escrito) === n) {
      delete faltan[n];
      c.classList.remove("hueco", "elegida", "fallo");
      c.classList.add("bien");
      c.innerHTML = dibujo(n, "#2f7a3e");
      c.setAttribute("aria-label", String(n));
      escrito = "";
      elegida = null;
      pintarEstado();
      if (cuantosFaltan() === 0) {
        terminar();
      } else {
        decir(n, c);
        siguiente(n);
      }
      return;
    }
    faltan[n]++;
    c.classList.remove("fallo");
    void c.offsetWidth;                 // reinicia el meneo
    c.classList.add("fallo");
    marcarVecinos(n);
    decir(faltan[n] > 1 ? FRASES[voz].pista(n) : FRASES[voz].casi);
    escrito = "";
    pintarEscrito();
  }

  function terminar() {
    tabla.classList.add("completa");
    final.hidden = false;
    pintarEscrito();
    decir(FRASES[voz].fin);
    final.querySelector("button").focus({ preventScroll: true });
    final.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* toques en la tabla */
  tabla.addEventListener("click", function (e) {
    var c = e.target.closest(".celda");
    if (!c) return;
    var n = Number(c.dataset.n);
    if (n in faltan) {
      if (n !== elegida) seleccionar(n);
    } else {
      decir(n, c);                      // un número que ya está: se oye
    }
  });

  /* el teclado: las cifras van dibujadas, no en texto */
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "borrar", "0", "listo"].forEach(function (k) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "tecla";
    if (k === "borrar") {
      b.classList.add("tecla-borrar");
      b.setAttribute("aria-label", "Borrar");
      b.innerHTML = '<svg viewBox="0 0 48 32" aria-hidden="true"><path d="M16 4 H42 a3 3 0 0 1 3 3 V25 a3 3 0 0 1 -3 3 H16 L4 16 Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M23 11 L33 21 M33 11 L23 21" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
      b.addEventListener("click", borrar);
    } else if (k === "listo") {
      b.classList.add("tecla-listo");
      b.setAttribute("aria-label", "Listo");
      b.innerHTML = '<svg viewBox="0 0 40 32" aria-hidden="true"><path d="M7 17 L16 26 L33 7" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      b.addEventListener("click", revisar);
    } else {
      b.setAttribute("aria-label", k);
      b.innerHTML = dibujo(k, TINTA);
      b.addEventListener("click", function () { escribir(k); });
    }
    teclado.appendChild(b);
  });

  /* y el teclado de la computadora */
  document.addEventListener("keydown", function (e) {
    if (e.target.closest && e.target.closest("select, input, textarea")) return;
    if (/^[0-9]$/.test(e.key)) { escribir(e.key); e.preventDefault(); }
    else if (e.key === "Backspace") { borrar(); e.preventDefault(); }
    else if (e.key === "Enter" && elegida && !(e.target.closest && e.target.closest(".cien-controles, .imprimir, .cien-final"))) {
      revisar(); e.preventDefault();
    }
  });

  /* niveles e idioma */
  function marcarGrupo(id, valor) {
    document.querySelectorAll("#" + id + " button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.valor === valor ? "true" : "false");
    });
  }

  /* los botones de «hasta»: el número va dibujado, como en todas partes */
  var hastas = document.getElementById("hastas");
  for (var h = 10; h <= 100; h += 10) {
    var bh = document.createElement("button");
    bh.type = "button";
    bh.className = "opcion opcion-num";
    bh.dataset.valor = String(h);
    bh.setAttribute("aria-label", "Del 1 al " + h);
    bh.innerHTML = window.NUMERO_SVG(String(h), "currentColor", 9);
    hastas.appendChild(bh);
  }

  /* cuántos huecos lleva cada nivel con la tabla escogida */
  function pintarNiveles() {
    marcarGrupo("hastas", String(hasta));
    marcarGrupo("niveles", nivel);
    ["pocos", "hoja", "muchos"].forEach(function (k) {
      var s = document.querySelector('#niveles [data-valor="' + k + '"] small');
      if (s) s.textContent = cuantosHuecos(k, hasta);
    });
    var t = document.getElementById("titulo-tabla");
    if (t) t.innerHTML = "Del " + window.NUMERO_SVG("1", "currentColor", 10) + " al " + window.NUMERO_SVG(String(hasta), "currentColor", 10);
  }

  hastas.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    hasta = Number(b.dataset.valor);
    if (nivel === "escuela" && hasta !== 100) { nivel = "hoja"; guardar("cien-nivel", nivel); }
    guardar("cien-hasta", String(hasta));
    pintarNiveles();
    armarTabla();
  });

  document.getElementById("niveles").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    nivel = b.dataset.valor;
    if (nivel === "escuela") { hasta = 100; guardar("cien-hasta", "100"); }   // la hoja de la escuela es del 1 al 100
    guardar("cien-nivel", nivel);
    pintarNiveles();
    armarTabla();
  });

  document.getElementById("voces").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    voz = b.dataset.valor;
    guardar("cien-voz", voz);
    marcarGrupo("voces", voz);
    decir(voz === "en" ? "English" : "Español", b);
  });

  document.getElementById("otra-vez").addEventListener("click", armarTabla);

  /* ---------- hojas al azar para imprimir ---------- */

  var aviso = document.getElementById("aviso-pdf");
  document.getElementById("hacer-pdf").addEventListener("click", function () {
    if (!window.jspdf) {
      aviso.textContent = "No se pudo cargar la herramienta para hacer el PDF. Revise la conexión e intente otra vez.";
      return;
    }
    var hastaPDF = Number(document.getElementById("hasta-pdf").value);
    var cuantos = cuantosHuecos(document.getElementById("huecos-pdf").value, hastaPDF);
    hojaPDF(huecosAlAzar(cuantos, hastaPDF), hastaPDF).save("chart-1-" + hastaPDF + "-" + cuantos + ".pdf");
    aviso.textContent = "Listo. Cada vez que lo toque sale una hoja distinta.";
  });

  pintarNiveles();
  marcarGrupo("voces", voz);
  if ("speechSynthesis" in window) speechSynthesis.getVoices();
  armarTabla();
})();
