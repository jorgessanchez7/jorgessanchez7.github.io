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
    { nombre: "naranja", color: "#d4742f" }
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

  function punta(x, y, ang, num, cx, cy) {
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
    return bolita(x, y, num) +
      '<path d="M' + tx.toFixed(1) + " " + ty.toFixed(1) +
      " L" + (bx + px * 5.5).toFixed(1) + " " + (by + py * 5.5).toFixed(1) +
      " L" + (bx - px * 5.5).toFixed(1) + " " + (by - py * 5.5).toFixed(1) +
      ' Z" fill="#d1495b" opacity=".85"/>';
  }

  function escapar(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* Las hojas de sílabas y de frases no se dibujan con caminos: son
     texto, con la misma letra de la pantalla. Así no hay que dibujar
     a mano cada palabra, y el modelo y la copia punteada salen
     exactamente iguales. */
  function celdaTexto(f, modelo, linea) {
    var base = '<text x="' + (f.celda[0] / 2) + '" y="' + (f.linea || 110) +
      '" text-anchor="middle" font-family="Baloo 2, Trebuchet MS, sans-serif" ' +
      'font-size="' + (f.tamano || 96) + '" font-weight="700" ';
    return base + (modelo
      ? 'fill="' + f.tinta + '"'
      : 'fill="none" stroke="#c4b096" stroke-width="3" stroke-linejoin="round" ' +
        'stroke-dasharray="9 10"') + ">" + escapar(linea) + "</text>";
  }

  function celda(f, modelo, marcar) {
    var out = "";
    var varios = f.trazos.length > 1;
    var cx = f.celda[0] / 2, cy = f.celda[1] / 2;
    for (var i = 0; i < f.trazos.length; i++) {
      var t = f.trazos[i];
      var num = varios ? i + 1 : 0;
      if (t.punto) {
        out += modelo
          ? '<circle cx="' + t.punto[0] + '" cy="' + t.punto[1] + '" r="5" fill="' + f.tinta + '"/>'
          : '<circle cx="' + t.punto[0] + '" cy="' + t.punto[1] +
            '" r="4.5" fill="none" stroke="#c9b79d" stroke-width="2.5" stroke-dasharray="4 5"/>';
        if (marcar && num) out += bolita(t.punto[0] + 15, t.punto[1], num);
        continue;
      }
      out += modelo
        ? '<path d="' + t.d + '" fill="none" stroke="' + f.tinta +
          '" stroke-width="' + GROSOR + '" stroke-linecap="round" stroke-linejoin="round"/>'
        : '<path d="' + t.d + '" fill="none" stroke="#c9b79d" stroke-width="3" ' +
          'stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 9"/>';
      if (marcar) out += punta(t.ini[0], t.ini[1], t.ang, num, cx, cy);
    }
    return out;
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
      var div = document.createElement("div");
      div.className = "renglon";
      div.style.background = f.banda;
      div.innerHTML = guias(f, W, H, reps, f.lineas ? f.lineas[r] : null) +
        '<canvas class="lienzo"></canvas>' +
        '<button type="button" class="goma" aria-label="Borrar este renglón">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17 L13 6 a3 3 0 0 1 5 3 L12 19 Z" ' +
        'fill="#fff" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M5 20 H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
        '</button>';
      hoja.appendChild(div);

      var p = { lienzo: div.querySelector(".lienzo"), W: W, H: H, trazos: [], actual: null };
      pizarras.push(p);
      conectar(p);
      (function (pp) {
        div.querySelector(".goma").addEventListener("click", function () { borrar(pp); });
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
