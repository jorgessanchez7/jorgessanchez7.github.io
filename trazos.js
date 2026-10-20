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
  var GROSOR = (window.DIBUJO || {}).GROSOR || 7;

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

  /* El PDF de una hoja. Los trazos y las vocales tienen el suyo; las
     tres hojas de una letra se reparten en dos: letra + sílabas, y
     frases aparte, que ocupan el ancho entero del papel. */
  function planaDe(id) {
    var m = /^(letra|silabas|frases)-(.+)$/.exec(id);
    if (!m) return "pdf/plana-" + id + ".pdf";
    return "pdf/plana-" + m[2] + (m[1] === "frases" ? "-2" : "-1") + ".pdf";
  }

  function buscar(id) {
    for (var i = 0; i < FICHAS.length; i++) if (FICHAS[i].id === id) return FICHAS[i];
    return null;
  }

  var ficha = buscar(param("hoja")) || FICHAS[0];
  var de = DESTINOS[param("de")] || { href: "lecciones.html", texto: "Lecciones" };
  var colorActual = CRAYONES[0].color;
  var pizarras = [];

  /* Lo que dibuja letras, guías y marcas de salida vive en
     escritura/dibujo.js, porque el papel (plana.js) tiene que dibujar
     exactamente lo mismo. Acá queda solo lo de la pantalla: el lienzo,
     el dedo, los crayones y el deshacer. */
  var DIBUJO = window.DIBUJO;

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
        /* cuántas letras van en color: normalmente una, pero la hoja de la
           rr dice «rr» y su palabra es «rosa», que empieza con una sola.
           Se pinta lo que de verdad calce al principio de la palabra. */
        var n = f.palabra.toLowerCase().indexOf(f.letra.toLowerCase()) === 0 ? f.letra.length : 1;
        html += '<span class="palabra"><b>' + f.palabra.slice(0, n) + "</b>" +
          f.palabra.slice(n) + "</span>";
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
      div.innerHTML = DIBUJO.guias(f, W, H, reps, f.lineas ? f.lineas[r] : null) +
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

    /* la misma hoja, pero para hacerla con lápiz. Las tres hojas de una
       letra caben en dos PDF: la letra con sus sílabas, y las frases. */
    var pdf = document.getElementById("imprimible");
    if (pdf) {
      /* la pizarra libre no tiene nada que imprimir: no hay modelo */
      if (f.grupo === "libre") pdf.hidden = true;
      else pdf.href = planaDe(f.id);
    }

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
