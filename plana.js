/* ============================================================
   plana.js - la hoja para imprimir y hacer con lápiz.

   El padre lo dijo claro: el trazado en pantalla no estaba
   cumpliendo. El dedo sobre vidrio no entrena la mano — no hay
   agarre, no hay presión, no hay fricción de papel. La pantalla
   sirve para mostrar POR DÓNDE empieza el trazo y para dónde va;
   para aprender a escribir hace falta lápiz.

   Esto no reemplaza nada: se suma.

   Una plana de verdad va en tres pasos, y así se arman los
   renglones de acá:
       modelo  →  punteado para repasar  →  blanco para hacerlo solo

   El dibujo sale de escritura/dibujo.js, el mismo que usa la
   pantalla. La letra del papel es la misma letra del sitio.
   ============================================================ */
(function () {
  "use strict";

  var FICHAS = window.FICHAS || [];
  var LETRAS = window.ABECEDARIO || [];
  var D = window.DIBUJO;

  /* Hoja carta: 21,6 x 27,9 cm, con 1,4 cm de margen a los lados.
     Quedan 18,8 cm de ancho útil. */
  var UTIL_CM = 18.8;

  /* Cuántas unidades de dibujo caben a lo ancho. De esto sale el
     tamaño de la letra: con 550 el cuerpo queda entre 1,7 y 1,9 cm,
     que es el de la cartilla y el que le queda cómodo a una mano de
     cinco años. Subirlo achica la letra; bajarlo deja menos
     repeticiones por renglón. */
  var ANCHO_UNIDADES = 550;

  /* Cuántas repeticiones quedan en blanco al final de cada renglón:
     ahí es donde la hace solo, sin nada debajo. */
  var EN_BLANCO = 2;

  var NEGRO = {
    tinta: "#1f1c1a",      /* el modelo */
    punteado: "#a9a9a9",   /* lo que se repasa */
    guia: "#d2d2d2",       /* el renglón */
    marcas: "#555",        /* el punto de salida y la flecha */
    grosor: 6,
    finura: 2.6,
    raya: "7 8"
  };

  function param(n) {
    var m = new RegExp("[?&]" + n + "=([^&]*)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }

  function ficha(id) {
    for (var i = 0; i < FICHAS.length; i++) if (FICHAS[i].id === id) return FICHAS[i];
    return null;
  }

  /* ---------- qué planas existen ----------

     Se arman solas a partir de las fichas y del abecedario, así que
     una letra nueva trae sus dos hojas sin tocar nada de aquí. */

  function catalogo() {
    var out = [];
    FICHAS.forEach(function (f) {
      if (f.grupo === "trazos" || f.grupo === "vocales") {
        out.push({ id: f.id, titulo: f.titulo, pista: f.pista, bloques: [{ ficha: f.id }] });
      }
    });
    /* las palabras de cada vocal: dibujo a la izquierda, la palabra al
       frente; el niño repasa la vocal y después la escribe sola */
    (window.VOCALES_PALABRAS || []).forEach(function (V) {
      out.push({
        id: "vocal-" + V.vocal + "-palabras",
        titulo: "La " + V.vocal + " · palabras que empiezan con " + V.vocal,
        pista: "Mira el dibujo y di la palabra. Repasa la letra punteada y después escríbela sola en el espacio.",
        dibujos: V
      });
    });
    /* los números: dos hojas por número. La primera, el número y su
       nombre en letras; la segunda, contar y escribir cuántos hay. */
    (window.NUMEROS || []).forEach(function (N) {
      var nombre = N.palabra.charAt(0).toUpperCase() + N.palabra.slice(1);
      out.push({
        id: "numero-" + N.id,
        titulo: nombre + " · el número y su nombre",
        pista: "Primero el número: el modelo, la línea punteada para repasar y el espacio para hacerlo solo. Después la palabra.",
        numero: N
      });
      out.push({
        id: "contar-" + N.id,
        titulo: nombre + " · cuenta y escribe",
        pista: N.n === 0
          ? "Cuenta las cosas de cada marco, una por una, y escribe cuántas hay. Si el marco está vacío, no hay ninguna: se escribe 0."
          : "Cuenta las cosas de cada marco, tocando una por una, y escribe cuántas hay. En los dos primeros, repasa el número punteado.",
        contar: N
      });
    });

    LETRAS.forEach(function (L) {
      var h = L.hojas || [];
      /* La hoja se llena hasta seis renglones. Casi todas las letras traen
         cinco sílabas y entonces la letra sola ocupa uno; la c trae tres
         (ca, co, cu) y entonces la letra sola se lleva los tres que sobran,
         en vez de dejar media hoja en blanco. */
      var sil = ficha(h[1]);
      var cuantas = sil && sil.lineas ? sil.lineas.length : 5;
      out.push({
        id: L.id + "-1",
        titulo: (L.nombre || "La " + L.letra) + " · la letra y las sílabas",
        pista: "Primero la letra sola; después pegada a cada vocal.",
        bloques: [{ ficha: h[0], filas: Math.max(1, 6 - cuantas) }, { ficha: h[1] }]
      });
      out.push({
        id: L.id + "-2",
        titulo: (L.nombre || "La " + L.letra) + " · las frases",
        pista: "Repasa la línea punteada y después hazla sola en el renglón de abajo.",
        bloques: [{ ficha: h[2], aparte: true }]
      });
    });
    return out;
  }

  /* ---------- los renglones de una hoja ----------

     Cada renglón dice qué ficha dibuja, qué línea de texto (si es de
     texto) y qué va en cada repetición. */

  /* La celda de una hoja de texto trae mucho aire a los lados, que en
     pantalla se ve bien y en papel es letra desperdiciada. Para el
     papel se encoge a lo que de verdad ocupa la línea más larga. */
  function paraPapel(f) {
    if (!f.lineas || !f.lineas.length) return f;
    var w = 0;
    f.lineas.forEach(function (l) { w = Math.max(w, D.ancho(l)); });
    var cw = Math.min(f.celda[0], Math.round(w) + 55);
    /* sílabas largas (gue, gui): con dos repeticiones no queda nada que
       repasar. Se fuerzan tres por renglón; celdaTexto achica la letra
       lo justo para que quepa. */
    if (f.repeticiones > 1 && Math.round(ANCHO_UNIDADES / cw) < 3) cw = Math.floor(ANCHO_UNIDADES / 3);
    if (cw === f.celda[0]) return f;
    var copia = {};
    for (var k in f) copia[k] = f[k];
    copia.celda = [cw, f.celda[1]];
    return copia;
  }

  function repeticiones(f) {
    return Math.max(1, Math.round(ANCHO_UNIDADES / f.celda[0]));
  }

  /* El patrón de una fila: el modelo solo en la primera de todas,
     después punteado, y siempre la última (o las dos últimas, si el
     renglón da para tanto) en blanco. Con pocas repeticiones no
     pueden ser dos: quedaría el modelo y nada que repasar. */
  function patron(n, conModelo) {
    var vacias = n >= 5 ? EN_BLANCO : 1;
    var c = [], i;
    for (i = 0; i < n; i++) {
      c.push(i < n - vacias ? (i === 0 && conModelo ? "modelo" : "punteado") : "vacio");
    }
    return c;
  }

  function renglones(plana) {
    var filas = [];
    plana.bloques.forEach(function (b) {
      var f = paraPapel(ficha(b.ficha));
      if (!f) return;

      /* Las frases ocupan el ancho entero, así que no caben repetidas
         al lado. El repasar y el hacerlo solo van uno debajo del otro,
         y se repite el par: repasa, hazla sola, repasa otra vez, y
         otra vez sola. */
      if (b.aparte) {
        (f.lineas || []).forEach(function (linea) {
          for (var v = 0; v < 2; v++) {
            filas.push({ f: f, linea: linea, reps: 1, celdas: ["punteado"] });
            filas.push({ f: f, linea: linea, reps: 1, celdas: ["vacio"] });
          }
        });
        return;
      }

      var n = repeticiones(f);
      if (f.lineas) {
        f.lineas.forEach(function (linea, i) {
          filas.push({ f: f, linea: linea, reps: n, celdas: patron(n, true) });
        });
      } else {
        var cuantas = b.filas || 6;
        for (var i = 0; i < cuantas; i++) {
          filas.push({ f: f, linea: null, reps: n, celdas: patron(n, i === 0) });
        }
      }
    });
    return filas;
  }

  /* ---------- la hoja de un número ----------

     Cuatro renglones del número y después la palabra. La palabra se
     arma con las mismas letras de una sola línea de las otras hojas.
     Las cortas (uno, dos, tres, seis, diez) caben tres veces por
     renglón; las largas (cuatro, cinco, siete, ocho, nueve, cero), dos,
     y entonces llevan un renglón más para que también quede dónde
     hacerla sola. */

  function renglonesNumero(N) {
    var filas = [];
    var f = ficha("numero-" + N.id);
    var n = repeticiones(f);
    for (var i = 0; i < 4; i++) filas.push({ f: f, linea: null, reps: n, celdas: patron(n, i === 0) });

    var w = D.ancho(N.palabra);
    var reps = w <= 200 ? 3 : 2;
    var pf = {
      celda: [Math.floor(ANCHO_UNIDADES / reps), 150], guia: true, tamano: 100,
      linea: 110, cuerpo: 55, tinta: NEGRO.tinta, lineas: [N.palabra], trazos: []
    };
    var pat = reps === 3
      ? [["modelo", "punteado", "vacio"], ["punteado", "punteado", "vacio"]]
      : [["modelo", "punteado"], ["punteado", "vacio"], ["punteado", "vacio"]];
    pat.forEach(function (c) { filas.push({ f: pf, linea: N.palabra, reps: reps, celdas: c }); });
    return filas;
  }

  /* ---------- la hoja de contar ----------

     Cada renglón: un marco de diez (dos filas de cinco) con las cosas
     adentro, y al lado el espacio para escribir cuántas hay. El marco es
     el mismo de la pantalla: cinco es una fila llena, diez las dos, y el
     cero es el marco vacío.

     Los dos primeros renglones traen el número punteado, para que se
     entienda qué hay que hacer; en los demás cuenta y lo escribe solo. */

  var CELDA_MARCO = 50;

  function filaContar(q, N, punteado) {
    var W = ANCHO_UNIDADES, x0 = 6, y0 = 10, c = CELDA_MARCO;
    var dibujo = (window.NUMEROS_OBJETOS || {})[N.objeto];
    var s = '<svg viewBox="0 0 ' + W + ' 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
    /* el marco */
    s += '<g fill="none" stroke="#8f8f8f" stroke-width="2">';
    s += '<rect x="' + x0 + '" y="' + y0 + '" width="' + 5 * c + '" height="' + 2 * c + '" rx="4"/>';
    for (var k = 1; k < 5; k++) s += '<path d="M' + (x0 + k * c) + " " + y0 + " V" + (y0 + 2 * c) + '"/>';
    s += '<path d="M' + x0 + " " + (y0 + c) + " H" + (x0 + 5 * c) + '"/></g>';
    /* las cosas, primero la fila de arriba */
    for (var i = 0; i < q; i++) {
      var cx = x0 + (i % 5) * c, cy = y0 + Math.floor(i / 5) * c;
      s += '<g transform="translate(' + (cx + 6) + "," + (cy + 6) + ') scale(.38)">' +
        (dibujo ? dibujo(true) : '<circle cx="50" cy="50" r="30" fill="#222"/>') + "</g>";
    }
    /* el renglón para escribir: raya arriba, la de la mitad punteada y el piso */
    var xa = x0 + 5 * c + 40;
    s += '<g fill="none" stroke="' + NEGRO.guia + '" stroke-width="1.6">' +
      '<path d="M' + xa + " 40 H" + W + '"/>' +
      '<path d="M' + xa + " 75 H" + W + '" stroke-dasharray="8 8"/>' +
      '<path d="M' + xa + " 110 H" + W + '"/></g>';
    if (punteado) {
      var t = (window.NUMEROS_TRAZOS || {})[String(q)] || [];
      s += '<g transform="translate(' + (xa + 20) + ',0)">';
      t.forEach(function (tr) {
        s += '<path d="' + tr.d + '" fill="none" stroke="' + NEGRO.punteado + '" stroke-width="' +
          NEGRO.finura + '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="' + NEGRO.raya + '"/>' +
          '<circle cx="' + tr.ini[0] + '" cy="' + tr.ini[1] + '" r="4.5" fill="' + NEGRO.marcas + '"/>';
      });
      s += "</g>";
    }
    return '<div class="renglon">' + s + "</svg></div>";
  }

  /* ---------- dibujar ----------

     La celda trae aire de sobra arriba y abajo para la pantalla, y
     además no todas las fichas usan el mismo alto: las sílabas de la
     d, la n, la r, la s y la t están en celdas de 150 (el alto que
     necesita el rabito de la p) aunque ninguna de esas letras tenga
     rabito. En papel ese aire sobrante es espacio perdido y hace que
     la hoja se desborde a una segunda página.

     Así que el recorte no se calcula: se MIDE con getBBox después de
     dibujar, igual que se miden las letras. Lo que ocupe el renglón
     de verdad, más un respiro. */

  var AIRE = 10;

  /* El corredor: dos rayas finas de lado a lado, a la altura a la que
     llega el trazo. Las hojas de letras ya traen su renglón, pero las
     de trazos sueltos no tenían ninguno, y entonces el renglón se veía
     terminar donde terminaba el dibujo — a dos tercios de la hoja — en
     vez de llegar al margen.

     Hace dos cosas a la vez: dice hasta dónde hay que seguir, y dice
     hasta dónde sube y baja el trazo, que es justo lo que se está
     practicando. Cuando el trazo es acostado (la raya de un lado al
     otro) no hay dos alturas que marcar: va una sola raya, debajo.

     Se dibuja DESPUÉS de medir, y entre las alturas ya medidas, para
     que no cambie el recorte. */
  function corredor(svg, b, W) {
    var alto = b.height;
    var abajo = b.y + alto - 1.5;
    var d = "M0 " + abajo.toFixed(1) + " H" + W;
    if (alto >= 45) d += " M0 " + (b.y + 1.5).toFixed(1) + " H" + W;
    var g = document.createElementNS("http://www.w3.org/2000/svg", "path");
    g.setAttribute("d", d);
    g.setAttribute("fill", "none");
    g.setAttribute("stroke", NEGRO.guia);
    g.setAttribute("stroke-width", "1.6");
    svg.insertBefore(g, svg.firstChild);
  }

  function recortar(caja) {
    [].forEach.call(caja.querySelectorAll(".renglon svg"), function (svg) {
      var vb = svg.getAttribute("viewBox").split(/\s+/).map(Number);
      var b;
      try { b = svg.getBBox(); } catch (x) { return; }
      if (!b || !b.height) return;
      if (svg.getAttribute("data-corredor") === "si") corredor(svg, b, vb[2]);
      var y = Math.max(0, b.y - AIRE);
      var alto = Math.min(vb[3] - y, b.y + b.height + AIRE - y);
      svg.setAttribute("viewBox", "0 " + y.toFixed(1) + " " + vb[2] + " " + alto.toFixed(1));
    });
  }

  /* Red de seguridad: si aun así no cabe, se achican todos los
     renglones en bloque. Más vale la letra un poco más chica que una
     hoja partida en dos páginas. */
  function caber(caja) {
    var filas = [].slice.call(caja.querySelectorAll(".renglon"));
    if (!filas.length) return;
    var disponible = caja.clientHeight;
    var total = 0;
    filas.forEach(function (f) { total += f.getBoundingClientRect().height; });
    var respiro = 10 * filas.length;
    if (total + respiro <= disponible) return;
    var k = (disponible - respiro) / total;
    filas.forEach(function (f) {
      f.style.width = (k * 100).toFixed(2) + "%";
      f.style.margin = "0 auto";
    });
  }

  /* En las hojas de trazos sueltos el punto de salida y la flecha van
     en TODAS las repeticiones, incluidas las que quedan en blanco.
     Antes iban solo en el primer renglón, pensando que repetidos eran
     ruido; con la hoja impresa en la mano resultó al revés: ahí no hay
     renglón ni letra que oriente, y sin marca el niño arranca por donde
     le parece — que es justo el hábito que la plana tiene que evitar.
     Y las repeticiones en blanco, que antes no dibujaban nada, ahora se
     leen como lo que son: espacio para escribir, con su punto de
     salida, no papel sobrante.

     En las hojas de letras y sílabas no: ahí el renglón ya llega al
     margen y las letras de dos trazos llevan números, que repetidos
     treinta veces tapan la letra. Esas se quedan con la marca en el
     primer renglón. */
  function dibujarFila(fila, primera) {
    var f = fila.f;
    var W = f.celda[0] * fila.reps;
    var op = {};
    for (var k in NEGRO) op[k] = NEGRO[k];
    op.celdas = fila.celdas;
    op.sinMarcas = f.guia ? !primera : false;
    var svg = D.guias(f, W, f.celda[1], fila.reps, fila.linea, op);
    /* el corredor va donde no hay renglón: en las hojas de trazos */
    if (!f.guia && fila.linea == null) {
      svg = svg.replace('class="guias"', 'class="guias" data-corredor="si"');
    }
    return '<div class="renglon">' + svg + "</div>";
  }

  /* ---------- la hoja de palabras de una vocal ----------

     Cada renglón: el dibujo, y al frente la palabra dos veces. En la
     primera la vocal va punteada para repasar; en la segunda va el
     hueco para escribirla sola. El resto de la palabra va en gris, como
     texto de Quicksand: lo lee el adulto, el niño no tiene que
     descifrarlo, y así caben letras que el motor todavía no dibuja
     (la h de «ocho», la j de «oreja»).

     Todas las filas usan el mismo ancho, para que la letra sea del
     mismo tamaño en toda la hoja. */

  var GRIS_TEXTO = "#c4c4c4";
  /* la vocal es lo que cuenta: va más oscura y más gruesa que el
     punteado de las otras hojas, y el resto de la palabra más claro */
  var VOCAL = { punteado: "#3a3a3a", finura: 4.2, raya: "6 7" };
  var ESPACIO = 80;

  function medir(txt) {
    var c = medir.c || (medir.c = document.createElement("canvas").getContext("2d"));
    c.font = "500 100px Quicksand";
    return c.measureText(txt).width;
  }

  function filaPalabra(p, W) {
    var v = p.palabra.charAt(0), resto = p.palabra.slice(1);
    var av = D.AVANCE[v] || 60, cw = av + 24;
    var f = { celda: [cw, 150], guia: true, tamano: 100, linea: 110, cuerpo: 55, tinta: NEGRO.tinta };
    var op = {};
    for (var k in NEGRO) op[k] = NEGRO[k];
    for (var q in VOCAL) op[q] = VOCAL[q];
    op.celdas = ["punteado"];
    var svg = D.guias(f, W, 150, 1, v, op);
    var tw = medir(resto);
    var x2 = 12 + av + tw + ESPACIO;
    var texto = function (x) {
      return '<text x="' + x.toFixed(1) + '" y="110" font-family="Quicksand, sans-serif" ' +
        'font-size="100" font-weight="500" fill="' + GRIS_TEXTO + '">' + resto + "</text>";
    };
    /* el hueco donde la escribe solo: una rayita más oscura en el
       renglón, del ancho de la letra, para que se vea dónde va */
    var hueco = '<path d="M' + (x2 + 6).toFixed(1) + " 118 H" + (x2 + av + 2).toFixed(1) +
      '" stroke="#6f6f6f" stroke-width="3" stroke-linecap="round"/>';
    svg = svg.replace("</svg>", texto(12 + av) + hueco + texto(x2 + av) + "</svg>");
    return '<div class="fila-dibujo"><img src="' + p.foto + '" alt="' + p.palabra + '">' +
      '<div class="renglon">' + svg + "</div></div>";
  }

  /* La letra tiene que salir lo más grande que quepa. Se arranca con el
     ancho que pide la palabra más larga de la hoja y, si la hoja se
     desborda, se va achicando hasta que cabe. El alto disponible se
     calcula a mano (la hoja en pantalla no tiene alto fijo, solo en la
     impresión). */
  var CM = 96 / 2.54;

  function armarDibujos(plana, caja, listo) {
    var lista = plana.dibujos.palabras;
    var hecho = function () {
      var W = 0;
      lista.forEach(function (p) {
        var av = D.AVANCE[p.palabra.charAt(0)] || 60;
        W = Math.max(W, 2 * (12 + av + medir(p.palabra.slice(1))) + ESPACIO + 20);
      });
      caja.classList.add("con-dibujos");
      /* con pocas palabras el dibujo crece: la hoja de la i (cinco) no
         tiene por qué tener los dibujos del tamaño de la de la a (nueve) */
      var lado = Math.min(3.2, 20.5 / lista.length - 0.35);
      caja.style.setProperty("--lado", lado.toFixed(2) + "cm");
      var enc = document.querySelector(".encabezado");
      var disponible = 27.9 * CM - 2.0 * CM - enc.getBoundingClientRect().height - 0.6 * CM;
      for (var vuelta = 0; vuelta < 25; vuelta++) {
        caja.innerHTML = lista.map(function (p) { return filaPalabra(p, Math.ceil(W)); }).join("");
        recortar(caja);
        var total = 0;
        [].forEach.call(caja.querySelectorAll(".fila-dibujo"), function (f) {
          total += f.getBoundingClientRect().height;
        });
        if (total + 8 * lista.length <= disponible) break;
        W *= 1.06;
      }
      var imgs = [].slice.call(caja.querySelectorAll("img"));
      Promise.all(imgs.map(function (im) {
        return im.decode ? im.decode().catch(function () {}) : Promise.resolve();
      })).then(listo);
    };
    if (document.fonts && document.fonts.load) {
      document.fonts.load("500 100px Quicksand").then(hecho, hecho);
    } else {
      hecho();
    }
  }

  /* ---------- armar la página ---------- */

  function armar() {
    /* planas.html también carga este archivo, solo por el catálogo.
       Si no hay hoja que dibujar, no hay nada que hacer. */
    if (!document.getElementById("renglones")) return;
    var todas = catalogo();
    var pedida = param("hoja") || (todas[0] && todas[0].id);
    var plana = null;
    todas.forEach(function (p) { if (p.id === pedida) plana = p; });
    if (!plana) plana = todas[0];
    if (!plana) return;

    document.title = plana.titulo + " · para imprimir";
    document.getElementById("titulo").textContent = plana.titulo;
    document.getElementById("pista").textContent = plana.pista || "";

    var caja = document.getElementById("renglones");
    var imprimir = document.getElementById("imprimir");
    if (imprimir) imprimir.addEventListener("click", function () { window.print(); });

    if (plana.dibujos) {
      armarDibujos(plana, caja, function () {
        document.documentElement.setAttribute("data-lista", "si");
      });
      return;
    }

    if (plana.contar) {
      caja.innerHTML = plana.contar.cuentas.map(function (q, i) {
        return filaContar(q, plana.contar, i < 2);
      }).join("");
      recortar(caja);
      caber(caja);
      document.documentElement.setAttribute("data-lista", "si");
      return;
    }

    var filas = plana.numero ? renglonesNumero(plana.numero) : renglones(plana);
    caja.innerHTML = filas.map(function (fila, i) {
      return dibujarFila(fila, i === 0);
    }).join("");
    recortar(caja);
    caber(caja);

    /* para el generador de PDF: avisa que ya terminó de dibujar */
    document.documentElement.setAttribute("data-lista", "si");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", armar);
  } else {
    armar();
  }

  window.PLANAS = { catalogo: catalogo };
})();
