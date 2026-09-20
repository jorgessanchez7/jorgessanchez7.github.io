/* ============================================================
   trazos.js - la hoja de escritura que se traza con el dedo
   o con el mouse.

   Los trazos del niño se guardan en coordenadas del SVG, no en
   píxeles: así la hoja se puede redimensionar (o girar el
   teléfono) sin que se borre ni se deforme lo que dibujó.

   No hay puntaje, ni acierto, ni error. Se traza y ya.
   ============================================================ */
(function () {
  "use strict";

  var FICHAS = window.FICHAS || [];
  var GROSOR = 7;

  var CRAYONES = [
    { nombre: "azul",    color: "#2f6690" },
    { nombre: "rojo",    color: "#c1516a" },
    { nombre: "verde",   color: "#3f7a4a" },
    { nombre: "morado",  color: "#8a4f9e" },
    { nombre: "naranja", color: "#d4742f" },
    { nombre: "negro",   color: "#2b2622" }
  ];

  var DESTINOS = {
    global:   { href: "global.html",   texto: "Método global" },
    silabico: { href: "silabico.html", texto: "Método silábico" }
  };

  function param(n) {
    var m = new RegExp("[?&]" + n + "=([^&]*)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }

  function buscar(id) {
    for (var i = 0; i < FICHAS.length; i++) if (FICHAS[i].id === id) return FICHAS[i];
    return null;
  }

  var ficha = buscar(param("hoja")) || FICHAS[0];
  var de = DESTINOS[param("de")] || { href: "lecciones.html", texto: "Lecciones" };
  var colorActual = CRAYONES[0].color;
  var pizarras = [];

  /* ---------- las guías, dibujadas en SVG ---------- */

  function bolita(x, y, num) {
    var r = num ? 7.5 : 4.5;
    var s = '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#d1495b"/>';
    if (num) {
      s += '<text x="' + x + '" y="' + (y + 3.6) + '" text-anchor="middle" fill="#fff" ' +
        'font-family="Quicksand, sans-serif" font-size="10" font-weight="700">' + num + "</text>";
    }
    return s;
  }

  /* `corre` mueve SOLO la insignia del numero, no el punto de salida ni la
     flecha. Hace falta en letras de dos trazos cuyos inicios quedan muy
     cerca (la t): sin eso, los dos numeros se montan y tapan el modelo. */
  function punta(x, y, ang, num, cx, cy, corre) {
    var a = (ang * Math.PI) / 180;
    var dx = Math.cos(a), dy = Math.sin(a);
    var px = -dy, py = dx;
    /* la flecha va al lado del camino, no encima: si lo tapa,
       el niño no ve por dónde pasar el dedo. Y se corre hacia
       afuera de la letra, no hacia adentro. */
    if ((x - cx) * px + (y - cy) * py < 0) { px = -px; py = -py; }
    var ox = x + px * 12, oy = y + py * 12;
    var tx = ox + dx * 22, ty = oy + dy * 22;
    var bx = ox + dx * 11, by = oy + dy * 11;
    var ix = x + (corre ? corre[0] : 0), iy = y + (corre ? corre[1] : 0);
    return bolita(x, y, 0) + (num ? bolita(ix, iy, num) : "") +
      '<path d="M' + tx.toFixed(1) + " " + ty.toFixed(1) +
      " L" + (bx + px * 5.5).toFixed(1) + " " + (by + py * 5.5).toFixed(1) +
      " L" + (bx - px * 5.5).toFixed(1) + " " + (by - py * 5.5).toFixed(1) +
      ' Z" fill="#d1495b" opacity=".85"/>';
  }

  /* ---------- dibujar un trazo, de modelo o para repasar ---------- */

  function camino(d, f, modelo) {
    return modelo
      ? '<path d="' + d + '" fill="none" stroke="' + f.tinta +
        '" stroke-width="' + GROSOR + '" stroke-linecap="round" stroke-linejoin="round"/>'
      : '<path d="' + d + '" fill="none" stroke="#c9b79d" stroke-width="3" ' +
        'stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 9"/>';
  }

  function puntico(x, y, f, modelo) {
    return modelo
      ? '<circle cx="' + x + '" cy="' + y + '" r="5" fill="' + f.tinta + '"/>'
      : '<circle cx="' + x + '" cy="' + y + '" r="4.5" fill="none" stroke="#c9b79d" ' +
        'stroke-width="2.5" stroke-dasharray="4 5"/>';
  }

  /* Los trazos de una letra, sin las marcas de salida. */
  function pluma(trazos, f, modelo) {
    var out = "";
    for (var i = 0; i < trazos.length; i++) {
      var t = trazos[i];
      out += t.punto ? puntico(t.punto[0], t.punto[1], f, modelo) : camino(t.d, f, modelo);
    }
    return out;
  }

  function celda(f, modelo, marcar) {
    var out = "";
    var varios = f.trazos.length > 1;
    var cx = f.celda[0] / 2, cy = f.celda[1] / 2;
    for (var i = 0; i < f.trazos.length; i++) {
      var t = f.trazos[i];
      var num = varios ? i + 1 : 0;
      if (t.punto) {
        out += puntico(t.punto[0], t.punto[1], f, modelo);
        if (marcar && num) out += bolita(t.punto[0] + 15, t.punto[1], num);
        continue;
      }
      out += camino(t.d, f, modelo);
      if (marcar) out += punta(t.ini[0], t.ini[1], t.ang, num, cx, cy, t.insignia);
    }
    return out;
  }

  /* ---------- las sílabas y las frases, letra por letra ----------

     Antes se escribían con <text> y se punteaba el CONTORNO de la
     letra rellena: cada letra salían dos líneas punteadas con un área
     en medio, que no es lo que el niño tiene que repasar. Ahora se
     arman con los mismos trazos de una sola línea de las vocales y
     las consonantes: lo que se traza en la hoja de la letra es
     exactamente lo que se traza en la de las sílabas.

     El dibujo es nuestro; el espaciado es de Quicksand, medido a
     tamaño 100, para que la palabra escrita ocupe lo mismo que la
     palabra leída. Una letra nueva entra sola: basta que su ficha
     tenga `letra` y su avance esté en esta tabla. */

  var AVANCE = {
    a: 63, e: 59, i: 24, o: 62, u: 59,
    "á": 63, "é": 59, "í": 24, "ó": 62, "ú": 59,
    m: 92, p: 63, s: 48, l: 27, n: 60, t: 41, d: 63,
    " ": 28, ".": 25
  };

  var CON_TILDE = "áéíóú", SIN_TILDE = "aeiou";

  /* la tilde, medida desde el centro de la vocal: sube hacia la
     derecha y queda por encima del cuerpo (55) sin llegar al alto (36) */
  var TILDE = "M-6 46 L6 31";

  var ALFABETO = null, CAJAS = null;

  function alfabeto() {
    if (ALFABETO) return ALFABETO;
    ALFABETO = {};
    for (var i = 0; i < FICHAS.length; i++) {
      var f = FICHAS[i];
      if (!f.letra || !f.trazos || !f.trazos.length) continue;
      if (f.grupo !== "vocales" && f.grupo !== "letras") continue;
      if (!ALFABETO[f.letra]) ALFABETO[f.letra] = f.trazos;
    }
    return ALFABETO;
  }

  /* Cuánto ocupa de ancho el dibujo de cada letra. Se mide con
     getBBox en vez de calcularlo a mano: los arcos abultan y un
     cálculo a ojo deja las letras descentradas. */
  function cajas() {
    if (CAJAS) return CAJAS;
    CAJAS = {};
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.style.visibility = "hidden";
    document.body.appendChild(svg);
    var A = alfabeto();
    for (var k in A) {
      var g = document.createElementNS(ns, "g");
      for (var i = 0; i < A[k].length; i++) {
        var t = A[k][i], el;
        if (t.punto) {
          el = document.createElementNS(ns, "circle");
          el.setAttribute("cx", t.punto[0]);
          el.setAttribute("cy", t.punto[1]);
          el.setAttribute("r", 4.5);
        } else {
          el = document.createElementNS(ns, "path");
          el.setAttribute("d", t.d);
          el.setAttribute("fill", "none");
        }
        g.appendChild(el);
      }
      svg.appendChild(g);
      var b = g.getBBox();
      CAJAS[k] = b.x + b.width / 2;
      svg.removeChild(g);
    }
    document.body.removeChild(svg);
    return CAJAS;
  }

  function ancho(texto) {
    var w = 0;
    for (var i = 0; i < texto.length; i++) w += AVANCE[texto.charAt(i)] || AVANCE[" "];
    return w;
  }

  function celdaTexto(f, modelo, linea) {
    var A = alfabeto(), C = cajas();
    var w = ancho(linea);
    var k = (f.tamano || 96) / 100;
    /* si la frase no cabe en la celda, se achica antes de salirse */
    if (w * k > f.celda[0] - 24) k = (f.celda[0] - 24) / w;
    var piso = f.linea || 110;
    var out = '<g transform="translate(' + ((f.celda[0] - w * k) / 2).toFixed(1) + "," +
      (piso - 110 * k).toFixed(1) + ") scale(" + k.toFixed(4) + ')">';
    var pen = 0;
    for (var i = 0; i < linea.length; i++) {
      var ch = linea.charAt(i);
      var av = AVANCE[ch] || AVANCE[" "];
      var j = CON_TILDE.indexOf(ch);
      var base = j < 0 ? ch : SIN_TILDE.charAt(j);
      var eje = pen + av / 2;
      if (A[base]) {
        out += '<g transform="translate(' + (eje - C[base]).toFixed(1) + ',0)">' +
          pluma(A[base], f, modelo) + "</g>";
        if (j >= 0) {
          out += '<g transform="translate(' + eje.toFixed(1) + ',0)">' +
            camino(TILDE, f, modelo) + "</g>";
        }
      } else if (ch === ".") {
        out += puntico(eje.toFixed(1), 105, f, modelo);
      }
      pen += av;
    }
    return out + "</g>";
  }

  function guias(f, W, H, reps, linea) {
    var s = '<svg class="guias" viewBox="0 0 ' + W + " " + H +
      '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
    if (f.guia) {
      s += '<g fill="none" stroke="#e3d4bd" stroke-width="1.6">' +
        '<path d="M0 ' + (f.cuerpo || 55) + " H" + W + '" stroke-dasharray="8 8"/>' +
        '<path d="M0 ' + (f.linea || 110) + " H" + W + '"/></g>';
    }
    for (var i = 0; i < reps; i++) {
      /* en los trazos encadenados (zigzag, olas, bucles) la marca de
         salida va solo al principio: el camino es uno solo */
      var marcar = f.continuo ? i === 0 : true;
      var dentro = linea != null
        ? celdaTexto(f, i === 0 && !f.sinModelo, linea)
        : celda(f, i === 0, marcar);
      s += '<g transform="translate(' + i * f.celda[0] + ',0)">' + dentro + "</g>";
    }
    return s + "</svg>";
  }

  /* ---------- el lienzo ---------- */

  function pintar(p) {
    var c = p.lienzo;
    var r = c.getBoundingClientRect();
    if (!r.width || !r.height) return;
    var dpr = window.devicePixelRatio || 1;
    var pw = Math.round(r.width * dpr), ph = Math.round(r.height * dpr);
    if (c.width !== pw || c.height !== ph) { c.width = pw; c.height = ph; }
    var ctx = c.getContext("2d");
    var k = (r.width / p.W) * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.setTransform(k, 0, 0, k, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (var i = 0; i < p.trazos.length; i++) {
      var t = p.trazos[i];
      ctx.strokeStyle = t.color;
      ctx.fillStyle = t.color;
      ctx.lineWidth = t.w;
      if (t.pts.length === 1) {
        ctx.beginPath();
        ctx.arc(t.pts[0][0], t.pts[0][1], t.w / 2, 0, 6.2832);
        ctx.fill();
        continue;
      }
      ctx.beginPath();
      ctx.moveTo(t.pts[0][0], t.pts[0][1]);
      for (var j = 1; j < t.pts.length; j++) ctx.lineTo(t.pts[j][0], t.pts[j][1]);
      ctx.stroke();
    }
  }

  function punto(p, e) {
    var r = p.lienzo.getBoundingClientRect();
    return [
      ((e.clientX - r.left) / r.width) * p.W,
      ((e.clientY - r.top) / r.height) * p.H
    ];
  }

  function conectar(p) {
    var activo = null;

    p.lienzo.addEventListener("pointerdown", function (e) {
      if (activo !== null) return;
      activo = e.pointerId;
      try { p.lienzo.setPointerCapture(e.pointerId); } catch (x) {}
      p.actual = { color: colorActual, w: GROSOR, pts: [punto(p, e)] };
      p.trazos.push(p.actual);
      pintar(p);
      e.preventDefault();
    });

    p.lienzo.addEventListener("pointermove", function (e) {
      if (e.pointerId !== activo || !p.actual) return;
      p.actual.pts.push(punto(p, e));
      pintar(p);
      e.preventDefault();
    });

    function soltar(e) {
      if (e.pointerId !== activo) return;
      activo = null;
      p.actual = null;
    }
    p.lienzo.addEventListener("pointerup", soltar);
    p.lienzo.addEventListener("pointercancel", soltar);
  }

  function borrar(p) {
    p.trazos.length = 0;
    p.actual = null;
    pintar(p);
  }

  /* Quita UN trazo, el último. Borrar el renglón entero por un toque
     castiga el error: el niño arregla la panza de la a y pierde las
     seis letras que ya le habían quedado bien. */
  function deshacer(p) {
    p.trazos.pop();
    p.actual = null;
    pintar(p);
  }

  /* ---------- voz ---------- */

  function decir(txt) {
    if (!window.speechSynthesis) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(txt);
      u.lang = "es-MX";
      u.rate = 0.82;
      var vs = speechSynthesis.getVoices() || [];
      for (var i = 0; i < vs.length; i++) {
        if (/^es/i.test(vs[i].lang)) { u.voice = vs[i]; break; }
      }
      speechSynthesis.speak(u);
    } catch (x) {}
  }

  /* ---------- armar la página ---------- */

  function hermanas() {
    var g = [];
    for (var i = 0; i < FICHAS.length; i++) if (FICHAS[i].grupo === ficha.grupo) g.push(FICHAS[i]);
    g.sort(function (a, b) { return (a.orden || 0) - (b.orden || 0); });
    return g;
  }

  /* En un teléfono la misma cantidad de repeticiones deja cada letra
     del tamaño de una uña. Se muestran menos, más grandes. */
  function cuantas(f) {
    var a = window.innerWidth;
    if (f.repeticiones <= 2) return f.repeticiones;
    if (a < 520) return Math.max(2, Math.round(f.repeticiones * 0.35));
    if (a < 780) return Math.max(3, Math.round(f.repeticiones * 0.6));
    return f.repeticiones;
  }

  function armar() {
    var f = ficha;
    var reps = cuantas(f);
    var W = f.celda[0] * reps;
    var H = f.celda[1];

    document.title = f.titulo + " · Lecciones de lectura";

    var volver = document.getElementById("volver");
    volver.href = de.href;
    volver.innerHTML = "&#8592; " + de.texto;

    document.getElementById("titulo").textContent = f.titulo;
    document.getElementById("pista").textContent = f.pista;

    /* la muestra grande, solo en las vocales */
    var muestra = document.getElementById("muestra");
    if (f.letra) {
      var html = '<button type="button" class="glifo-grande" style="color:' + f.tinta + '">' +
        f.letra + "</button>";
      if (f.dibujo) {
        html += '<span class="dibujo"><svg viewBox="0 0 100 100" ' +
          'xmlns="http://www.w3.org/2000/svg">' + f.dibujo + "</svg></span>";
      }
      if (f.palabra) {
        html += '<span class="palabra"><b>' + f.letra + "</b>" + f.palabra.slice(1) + "</span>";
      }
      muestra.innerHTML = html;
      muestra.querySelector(".glifo-grande").addEventListener("click", function () {
        /* en las consonantes el nombre de la letra no sirve: se repite el sonido */
        decir(f.grupo === "letras" ? f.letra + f.letra + f.letra : f.letra);
      });
      if (f.palabra) {
        muestra.querySelector(".palabra").addEventListener("click", function () {
          decir(f.palabra);
        });
      }
      muestra.hidden = false;
    } else {
      muestra.hidden = true;
    }

    /* los crayones */
    var caja = document.getElementById("crayones");
    CRAYONES.forEach(function (c, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "crayon" + (i === 0 ? " puesto" : "");
      b.style.background = c.color;
      b.setAttribute("aria-label", "Crayón " + c.nombre);
      b.addEventListener("click", function () {
        colorActual = c.color;
        var todos = caja.querySelectorAll(".crayon");
        for (var k = 0; k < todos.length; k++) todos[k].classList.remove("puesto");
        b.classList.add("puesto");
      });
      caja.appendChild(b);
    });

    /* los renglones. En las hojas de texto cada renglón es una
       sílaba o una frase distinta; en las demás, todos iguales. */
    var hoja = document.getElementById("hoja");
    var filas = f.lineas ? f.lineas.length : f.renglones;
    for (var r = 0; r < filas; r++) {
      /* el botón va POR FUERA del renglón. Adentro, en la esquina de
         arriba a la derecha, caía justo encima del punto de salida de
         la última repetición en las rayas paradas y en las verticales:
         el niño ponía el dedo donde se le dice y se le borraba todo. */
      var fila = document.createElement("div");
      fila.className = "fila";

      var div = document.createElement("div");
      div.className = "renglon";
      div.style.background = f.banda;
      div.innerHTML = guias(f, W, H, reps, f.lineas ? f.lineas[r] : null) +
        '<canvas class="lienzo"></canvas>';

      var atras = document.createElement("button");
      atras.type = "button";
      atras.className = "deshacer";
      atras.title = "Quitar el último trazo";
      atras.setAttribute("aria-label", "Quitar el último trazo de este renglón");
      atras.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M8 8 H15 a5 5 0 0 1 0 10 H8" fill="none" stroke="currentColor" ' +
        'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M11 4 L7 8 L11 12" fill="none" stroke="currentColor" ' +
        'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

      fila.appendChild(div);
      fila.appendChild(atras);
      hoja.appendChild(fila);

      var p = { lienzo: div.querySelector(".lienzo"), W: W, H: H, trazos: [], actual: null };
      pizarras.push(p);
      conectar(p);
      (function (pp) {
        atras.addEventListener("click", function () { deshacer(pp); });
      })(p);
    }

    document.getElementById("borrar-todo").addEventListener("click", function () {
      pizarras.forEach(borrar);
    });

    /* anterior y siguiente dentro del mismo grupo */
    var g = hermanas();
    var pos = g.indexOf(f);
    var nav = document.getElementById("saltos");
    var cola = "&de=" + encodeURIComponent(param("de"));
    if (pos > 0) {
      nav.innerHTML += '<a class="salto" href="trazos.html?hoja=' + g[pos - 1].id + cola +
        '">&#8592; ' + g[pos - 1].titulo + "</a>";
    }
    if (pos > -1 && pos < g.length - 1) {
      nav.innerHTML += '<a class="salto der" href="trazos.html?hoja=' + g[pos + 1].id + cola +
        '">' + g[pos + 1].titulo + " &#8594;</a>";
    }

    /* primer pintado y repintado al cambiar de tamaño */
    setTimeout(function () { pizarras.forEach(pintar); }, 0);
    var esperando;
    window.addEventListener("resize", function () {
      clearTimeout(esperando);
      esperando = setTimeout(function () { pizarras.forEach(pintar); }, 120);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", armar);
  } else {
    armar();
  }
})();
