/* ============================================================
   dibujo.js - lo que dibuja las letras, las guías y las marcas
   de salida. Lo usan la pantalla (trazos.js) y el papel
   (plana.js), para que el trazo sea EXACTAMENTE el mismo en los
   dos lados. Si esto se duplicara, tarde o temprano la letra del
   papel y la de la pantalla dejarían de ser la misma letra.

   Nada de aquí toca el DOM de la página ni escucha eventos: solo
   devuelve SVG en texto. La única excepción es cajas(), que mide
   con getBBox y para eso necesita un <svg> de verdad.

   Las opciones (`op`) son para el papel: en la hoja impresa no hay
   color, el punteado es más oscuro para que la impresora lo coja,
   y hay celdas que van en blanco para que el niño escriba solo.
   ============================================================ */
(function () {
  "use strict";

  var GROSOR = 7;

  /* los colores de la pantalla; el papel los reemplaza por `op` */
  var TINTA_PUNTEADO = "#c9b79d";
  var TINTA_GUIA     = "#e3d4bd";
  var ROJO           = "#d1495b";

  function ops(op) {
    op = op || {};
    return {
      tinta:     op.tinta     || null,              /* null = la de la ficha */
      punteado:  op.punteado  || TINTA_PUNTEADO,
      guia:      op.guia      || TINTA_GUIA,
      marcas:    op.marcas    || ROJO,
      grosor:    op.grosor    || GROSOR,
      finura:    op.finura    || 3,                 /* grosor del punteado */
      raya:      op.raya      || "6 9",             /* patrón del punteado */
      celdas:    op.celdas    || null,              /* modo por celda */
      sinMarcas: !!op.sinMarcas
    };
  }

  function tintaDe(f, o) { return o.tinta || f.tinta; }

  /* ---------- las marcas de salida ---------- */

  function bolita(x, y, num, o) {
    var r = num ? 7.5 : 4.5;
    var s = '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + o.marcas + '"/>';
    if (num) {
      s += '<text x="' + x + '" y="' + (y + 3.6) + '" text-anchor="middle" fill="#fff" ' +
        'font-family="Quicksand, sans-serif" font-size="10" font-weight="700">' + num + "</text>";
    }
    return s;
  }

  /* `corre` mueve SOLO la insignia del numero, no el punto de salida ni la
     flecha. Hace falta en letras de dos trazos cuyos inicios quedan muy
     cerca (la t): sin eso, los dos numeros se montan y tapan el modelo. */
  function punta(x, y, ang, num, cx, cy, corre, o) {
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
    return bolita(x, y, 0, o) + (num ? bolita(ix, iy, num, o) : "") +
      '<path d="M' + tx.toFixed(1) + " " + ty.toFixed(1) +
      " L" + (bx + px * 5.5).toFixed(1) + " " + (by + py * 5.5).toFixed(1) +
      " L" + (bx - px * 5.5).toFixed(1) + " " + (by - py * 5.5).toFixed(1) +
      ' Z" fill="' + o.marcas + '" opacity=".85"/>';
  }

  /* ---------- dibujar un trazo, de modelo o para repasar ---------- */

  function camino(d, f, modelo, o) {
    return modelo
      ? '<path d="' + d + '" fill="none" stroke="' + tintaDe(f, o) +
        '" stroke-width="' + o.grosor + '" stroke-linecap="round" stroke-linejoin="round"/>'
      : '<path d="' + d + '" fill="none" stroke="' + o.punteado + '" stroke-width="' + o.finura +
        '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + o.raya + '"/>';
  }

  function puntico(x, y, f, modelo, o) {
    return modelo
      ? '<circle cx="' + x + '" cy="' + y + '" r="5" fill="' + tintaDe(f, o) + '"/>'
      : '<circle cx="' + x + '" cy="' + y + '" r="4.5" fill="none" stroke="' + o.punteado +
        '" stroke-width="' + (o.finura - 0.5) + '" stroke-dasharray="4 5"/>';
  }

  /* Los trazos de una letra, sin las marcas de salida. */
  function pluma(trazos, f, modelo, o) {
    var out = "";
    for (var i = 0; i < trazos.length; i++) {
      var t = trazos[i];
      out += t.punto ? puntico(t.punto[0], t.punto[1], f, modelo, o)
                     : camino(t.d, f, modelo, o);
    }
    return out;
  }

  /* `soloMarcas` deja la celda en blanco y pone nada más el punto de
     salida y la flecha. Es para el papel: en las repeticiones donde el
     niño la hace solo no hay nada que repasar, pero sí tiene que saber
     por dónde empieza — y así el renglón llega hasta el margen en vez
     de morirse a dos tercios de la hoja. */
  function celda(f, modelo, marcar, o, soloMarcas) {
    var out = "";
    var varios = f.trazos.length > 1;
    var cx = f.celda[0] / 2, cy = f.celda[1] / 2;
    for (var i = 0; i < f.trazos.length; i++) {
      var t = f.trazos[i];
      var num = varios ? i + 1 : 0;
      if (t.punto) {
        if (!soloMarcas) out += puntico(t.punto[0], t.punto[1], f, modelo, o);
        if (marcar && num) out += bolita(t.punto[0] + 15, t.punto[1], num, o);
        continue;
      }
      if (!soloMarcas) out += camino(t.d, f, modelo, o);
      if (marcar) out += punta(t.ini[0], t.ini[1], t.ang, num, cx, cy, t.insignia, o);
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
    m: 92, p: 63, s: 48, l: 27, n: 60, t: 41, d: 63, r: 43, c: 52,
    "\u00f1": 60,
    " ": 28, ".": 25, ",": 25
  };

  var CON_TILDE = "áéíóú", SIN_TILDE = "aeiou";

  /* la tilde, medida desde el centro de la vocal: sube hacia la
     derecha y queda por encima del cuerpo (55) sin llegar al alto (36) */
  var TILDE = "M-6 46 L6 31";

  /* la coma: cuelga del renglón, también medida desde el centro */
  var COMA = "M2 103 Q4 112 -3 119";

  var ALFABETO = null, CAJAS = null;

  function alfabeto() {
    if (ALFABETO) return ALFABETO;
    ALFABETO = {};
    var F = window.FICHAS || [];
    for (var i = 0; i < F.length; i++) {
      var f = F[i];
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

  function celdaTexto(f, modelo, linea, o) {
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
          pluma(A[base], f, modelo, o) + "</g>";
        if (j >= 0) {
          out += '<g transform="translate(' + eje.toFixed(1) + ',0)">' +
            camino(TILDE, f, modelo, o) + "</g>";
        }
      } else if (ch === ".") {
        out += puntico(eje.toFixed(1), 105, f, modelo, o);
      } else if (ch === ",") {
        out += '<g transform="translate(' + eje.toFixed(1) + ',0)">' +
          camino(COMA, f, modelo, o) + "</g>";
      }
      pen += av;
    }
    return out + "</g>";
  }

  /* ---------- el renglón entero ----------

     `op.celdas` dice qué va en cada repetición: "modelo", "punteado"
     o "vacio". Sin eso se comporta como siempre: la primera es el
     modelo y las demás van punteadas. El papel lo usa para dejar las
     últimas en blanco, que es donde el niño la hace solo. */

  function guias(f, W, H, reps, linea, op) {
    var o = ops(op);
    var s = '<svg class="guias" viewBox="0 0 ' + W + " " + H +
      '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
    if (f.guia) {
      s += '<g fill="none" stroke="' + o.guia + '" stroke-width="1.6">' +
        '<path d="M0 ' + (f.cuerpo || 55) + " H" + W + '" stroke-dasharray="8 8"/>' +
        '<path d="M0 ' + (f.linea || 110) + " H" + W + '"/></g>';
    }
    /* dónde empieza el tramo en blanco: ahí el niño vuelve a arrancar
       solo, así que ahí va otra marca de salida aunque el trazo sea
       encadenado */
    var primerVacio = o.celdas ? o.celdas.indexOf("vacio") : -1;

    for (var i = 0; i < reps; i++) {
      var modo = o.celdas ? (o.celdas[i] || "punteado")
                          : (i === 0 && !f.sinModelo ? "modelo" : "punteado");
      var vacio = modo === "vacio";
      /* en una línea de texto no hay marcas que poner: la celda vacía
         de verdad queda vacía */
      if (vacio && linea != null) continue;
      /* en los trazos encadenados (zigzag, olas, bucles) la marca de
         salida va al principio del renglón y al principio del tramo
         en blanco: en medio, el camino es uno solo */
      var marcar = !o.sinMarcas &&
        (f.continuo ? (i === 0 || i === primerVacio) : true);
      if (vacio && !marcar) continue;
      var dentro = linea != null
        ? celdaTexto(f, modo === "modelo", linea, o)
        : celda(f, modo === "modelo", marcar, o, vacio);
      s += '<g transform="translate(' + i * f.celda[0] + ',0)">' + dentro + "</g>";
    }
    return s + "</svg>";
  }

  window.DIBUJO = {
    GROSOR: GROSOR,
    guias: guias,
    ancho: ancho,
    alfabeto: alfabeto,
    AVANCE: AVANCE
  };
})();
