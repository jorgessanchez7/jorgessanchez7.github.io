/* ============================================================
   numero.js - la lección de un número
   Se abre con numero.html?n=3

   Tres cosas, las de siempre: contar la cantidad, el nombre del
   número en letras y el número escrito. Todo lo que se toca suena.
   No hay puntaje, ni acierto, ni error: contar es tocar cada cosa
   una vez, y el último número que se dice es cuántas hay.

   El número NUNCA va en texto: va dibujado con sus trazos
   (NUMERO_SVG, de escritura/numeros.js), para que sea el mismo de
   la plana y el de la escuela, no el de la fuente.
   ============================================================ */
(function () {
  "use strict";

  var NUMEROS = window.NUMEROS || [];
  var OBJETOS = window.NUMEROS_OBJETOS || {};
  var SVG = window.NUMERO_SVG;

  function param(n) {
    var m = new RegExp("[?&]" + n + "=([^&]*)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }

  function buscar(id) {
    for (var i = 0; i < NUMEROS.length; i++) if (NUMEROS[i].id === id) return NUMEROS[i];
    return NUMEROS[0];
  }

  function palabraDe(n) {
    for (var i = 0; i < NUMEROS.length; i++) if (NUMEROS[i].n === n) return NUMEROS[i].palabra;
    return String(n);
  }

  var N = buscar(param("n"));

  /* ---------- voz ---------- */
  var sonando = null;

  function decir(txt, nodo, lang) {
    if (nodo) {
      if (sonando) sonando.classList.remove("sonando");
      nodo.classList.add("sonando");
      sonando = nodo;
      setTimeout(function () { nodo.classList.remove("sonando"); }, 1200);
    }
    if (!window.speechSynthesis) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(txt);
      u.lang = lang || "es-MX";
      u.rate = 0.8;
      var pref = u.lang.slice(0, 2);
      var vs = speechSynthesis.getVoices() || [];
      for (var i = 0; i < vs.length; i++) {
        if (vs[i].lang.toLowerCase().indexOf(pref) === 0) { u.voice = vs[i]; break; }
      }
      speechSynthesis.speak(u);
    } catch (x) {}
  }

  function cosa(papel) {
    var f = OBJETOS[N.objeto];
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      (f ? f(papel) : "") + "</svg>";
  }

  /* ---------- contar tocando ----------

     Cada cosa se toca una vez: queda marcada y debajo aparece el número
     que le tocó. Tocarla otra vez no cuenta doble, que es justo el error
     de contar que se quiere evitar. Al llegar a la última, se dice el
     total con la cosa: «tres manzanas». */

  function armarConteo() {
    var caja = document.getElementById("cosas");
    var fin = document.getElementById("fin");
    var otra = document.getElementById("otra-vez");
    var cuenta = 0;

    if (N.n === 0) {
      document.getElementById("nota-contar").textContent =
        "Aquí no hay nada que tocar: el plato está vacío. Cuando no hay ninguna, son cero.";
      caja.style.display = "block";
      caja.innerHTML = '<div class="plato-vacio">' + cosaVacia() + "</div>";
      fin.hidden = false;
      fin.innerHTML = SVG("0", N.tinta, 9, "num-fin") + "<span>" + N.cosas + "</span>";
      fin.addEventListener("click", function () { decir(N.cosas, fin); });
      otra.hidden = true;
      return;
    }

    function poner() {
      cuenta = 0;
      fin.hidden = true;
      caja.innerHTML = "";
      caja.dataset.cuantas = N.n;
      for (var i = 0; i < N.n; i++) {
        /* después de diez, una raya: el primer diez queda aparte */
        if (i === 10) {
          var sep = document.createElement("div");
          sep.className = "separa-diez";
          caja.appendChild(sep);
        }
        var b = document.createElement("button");
        b.type = "button";
        b.className = "cosa";
        b.setAttribute("aria-label", N.objeto);
        b.innerHTML = cosa(false) + '<span class="cual"></span>';
        b.addEventListener("click", tocar);
        caja.appendChild(b);
      }
    }

    function tocar(e) {
      var b = e.currentTarget;
      if (b.classList.contains("contada")) return;
      cuenta++;
      b.classList.add("contada");
      b.querySelector(".cual").innerHTML = SVG(String(cuenta), N.tinta, 9);
      if (cuenta < N.n) {
        decir(palabraDe(cuenta));
        return;
      }
      decir(palabraDe(cuenta));
      fin.innerHTML = SVG(N.id, N.tinta, 9, "num-fin") + "<span>" + N.cosas + "</span>";
      fin.hidden = false;
      setTimeout(function () { decir(N.cosas, fin); }, 900);
    }

    fin.addEventListener("click", function () { decir(N.cosas, fin); });
    otra.addEventListener("click", poner);
    poner();
  }

  /* el plato del cero */
  function cosaVacia() {
    return '<svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<ellipse cx="100" cy="62" rx="92" ry="38" fill="#fff" stroke="#c9b79d" stroke-width="4"/>' +
      '<ellipse cx="100" cy="58" rx="62" ry="22" fill="none" stroke="#e3d4bd" stroke-width="3"/></svg>';
  }

  /* ---------- el marco de diez ---------- */

  /* Del 11 al 20, dos marcos: el primero lleno y lo que sobra en el
     segundo, que es exactamente lo que dice el número. */
  function unMarco(x, n, color) {
    var c = 60, s = '<rect x="' + (x + 4) + '" y="4" width="' + 5 * c + '" height="' + 2 * c +
      '" rx="8" fill="#fff" stroke="#c9b79d" stroke-width="3"/>';
    for (var k = 1; k < 5; k++) s += '<path d="M' + (x + 4 + k * c) + " 4 V" + (4 + 2 * c) + '" stroke="#e3d4bd" stroke-width="3"/>';
    s += '<path d="M' + (x + 4) + " " + (4 + c) + " H" + (x + 4 + 5 * c) + '" stroke="#e3d4bd" stroke-width="3"/>';
    for (var i = 0; i < n; i++) {
      s += '<circle cx="' + (x + 4 + (i % 5) * c + c / 2) + '" cy="' + (4 + Math.floor(i / 5) * c + c / 2) +
        '" r="20" fill="' + color + '"/>';
    }
    return s;
  }

  function marco(n, color) {
    var dos = n > 10, W = dos ? 2 * 308 + 24 : 308;
    var s = '<svg viewBox="0 0 ' + W + ' 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      unMarco(0, Math.min(10, n), color);
    if (dos) s += unMarco(332, n - 10, color);
    return s + "</svg>";
  }

  /* ---------- la fila de los números ----------

     Del 0 al 10, en línea, como una regla: los que ya se vieron, en su
     color; los que vienen, más claritos pero igual se pueden tocar. */

  function armarFila() {
    var caja = document.getElementById("fila");
    /* Del 11 en adelante la fila va de diez en diez, empezando en el cero
       (también lo estudian): 0 a 9, 10 a 19, y el 20. Así el 14 queda
       debajo del 4, y se ve que es «diez y cuatro». */
    var dos = N.n > 10;
    if (dos) caja.classList.add("dos-filas");
    for (var n = 0; n <= (dos ? 20 : 10); n++) {
      var M = buscar(String(n));
      var b = document.createElement("button");
      b.type = "button";
      b.className = "casilla" + (M === N ? " actual" : "") + (M.orden > N.orden ? " despues" : "");
      b.setAttribute("aria-label", M.palabra);
      b.innerHTML = SVG(M.id, M === N ? "#fff" : M.tinta, 9);
      (function (M, b) {
        b.addEventListener("click", function () { decir(M.palabra, b); });
      })(M, b);
      caja.appendChild(b);
    }
  }

  function armar() {
    document.title = "El " + N.palabra + " · Los números";
    document.documentElement.style.setProperty("--letra", N.tinta);
    document.documentElement.style.setProperty("--letra-suave", N.banda);

    document.getElementById("titulo").textContent = "El " + N.palabra;
    document.getElementById("lead").textContent = N.lead;

    var glifo = document.getElementById("glifo");
    glifo.innerHTML = SVG(N.id, N.tinta, 8);
    if (N.id.length > 1) glifo.classList.add("dos");
    glifo.setAttribute("aria-label", N.palabra);
    glifo.addEventListener("click", function () { decir(N.palabra, glifo); });

    var pal = document.getElementById("palabra");
    pal.textContent = N.palabra;
    pal.addEventListener("click", function () { decir(N.palabra, pal); });

    /* y en inglés, como en las figuras: más chico y con su voz */
    var en = document.getElementById("palabra-en");
    en.textContent = N.en;
    en.addEventListener("click", function () { decir(N.en, en, "en-US"); });

    armarConteo();

    var m = document.getElementById("marco");
    m.innerHTML = marco(N.n, N.tinta);
    m.setAttribute("aria-label", N.palabra);
    m.addEventListener("click", function () { decir(N.palabra, m); });

    armarFila();

    var hojas = document.getElementById("hojas");
    var a = document.createElement("a");
    a.className = "btn grande";
    a.href = "trazos.html?hoja=numero-" + N.id + "&de=numeros";
    a.textContent = "Trazarlo en pantalla →";
    hojas.appendChild(a);

    var papel = document.getElementById("imprimibles");
    [["numero-", "El número y su nombre"], ["contar-", "Cuenta y escribe"]].forEach(function (par) {
      var p = document.createElement("a");
      p.className = "btn papel";
      p.href = "pdf/plana-" + par[0] + N.id + ".pdf";
      p.setAttribute("download", "");
      p.textContent = par[1] + " (PDF)";
      papel.appendChild(p);
    });

    var aviso = document.getElementById("aviso");
    (N.aviso || []).forEach(function (t) {
      var pp = document.createElement("p");
      pp.textContent = t;
      aviso.appendChild(pp);
    });

    /* el anterior y el siguiente, en el orden de las lecciones */
    var nav = document.createElement("nav");
    nav.id = "saltos";
    var i = NUMEROS.indexOf(N);
    if (i > 0) {
      nav.innerHTML += '<a class="salto" href="numero.html?n=' + NUMEROS[i - 1].id + '">&#8592; El ' +
        NUMEROS[i - 1].palabra + "</a>";
    }
    if (i < NUMEROS.length - 1) {
      nav.innerHTML += '<a class="salto der" href="numero.html?n=' + NUMEROS[i + 1].id + '">El ' +
        NUMEROS[i + 1].palabra + " &#8594;</a>";
    }
    aviso.parentNode.appendChild(nav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", armar);
  } else {
    armar();
  }
})();
