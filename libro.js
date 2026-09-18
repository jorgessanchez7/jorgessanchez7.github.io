/* ============================================================
   libro.js - motor del libro animado
   Uso:  libro.html?id=tres-cerditos
   ============================================================ */
(function () {
  "use strict";

  var ANCHO_SIMPLE = 820;   // por debajo de esto se lee de a una página

  var libro, lista, hojas = [], total = 0, maxHoja = 0, actual = 0, modo = "", animando = false;

  var stage   = document.getElementById("stage");
  var book    = document.getElementById("book");
  var visor   = document.getElementById("visor");
  var elTit   = document.getElementById("titulo");
  var btnPrev = document.getElementById("btn-prev");
  var btnNext = document.getElementById("btn-next");
  var btnVoz  = document.getElementById("btn-voz");
  var btnFull = document.getElementById("btn-full");
  var btnAct  = document.getElementById("btn-act");
  var slider  = document.getElementById("slider");
  var contador= document.getElementById("contador");

  /* ---------------- cargar el libro ---------------- */
  function parametro(n) {
    var m = new RegExp("[?&]" + n + "=([^&]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  var id = parametro("id");
  var catalogo = window.BIBLIOTECA || [];
  for (var i = 0; i < catalogo.length; i++) if (catalogo[i].id === id) libro = catalogo[i];
  if (!libro) libro = catalogo[0];

  if (!libro) {
    document.body.innerHTML = '<p style="padding:40px;font-family:sans-serif">No se encontró ningún libro. Revisa libros/biblioteca.js</p>';
    return;
  }

  document.title = libro.titulo + " · Plan de lectura";
  elTit.textContent = libro.titulo;

  /* ---------------- armar la lista de páginas ---------------- */
  function armarLista(m) {
    var l = [{ t: "portada" }];
    if (m === "doble") l.push({ t: "blanca" });
    var acts = libro.actividades || [];
    libro.paginas.forEach(function (pg, idx) {
      l.push({ t: "pagina", pg: pg, n: idx + 1 });
      // una actividad puede pedir salir justo despues de cierta pagina
      acts.forEach(function (a, k) {
        if (a.despuesDePagina === idx + 1) l.push({ t: "actividad", i: k });
      });
    });
    acts.forEach(function (a, k) {
      if (!a.despuesDePagina) l.push({ t: "actividad", i: k });
    });
    // en doble pagina, "Fin" debe caer en una cara frontal para que se vea
    // junto a la ultima pagina del cuento
    if (m === "doble") { while (l.length % 2) l.push({ t: "blanca" }); }
    l.push({ t: "fin" });
    if (m === "doble") l.push({ t: "blanca" });
    return l;
  }

  function htmlPagina(item) {
    if (!item) return '<div class="pagina blanca"></div>';
    if (item.t === "blanca") return '<div class="pagina blanca"></div>';
    if (item.t === "portada") {
      var tapa = libro.portadaImagen
        ? '<img src="' + libro.portadaImagen + '" alt="">'
        : libro.portada;
      return '<div class="pagina portada">' +
        '<div class="marco">' + tapa + '</div>' +
        '<h1>' + libro.titulo + '</h1>' +
        '<p class="autor">' + libro.autor + '</p>' +
        '<p class="pista">Toca la flecha para empezar</p>' +
        '</div>';
    }
    if (item.t === "actividad") {
      return window.ACTIVIDADES
        ? window.ACTIVIDADES.html(libro.actividades[item.i], item.i)
        : '<div class="pagina blanca"></div>';
    }
    if (item.t === "fin") {
      var credito = libro.credito
        ? '<p class="credito"><a href="' + libro.credito.url + '" target="_blank" rel="noopener">' +
          libro.credito.texto + '</a></p>'
        : '';
      return '<div class="pagina fin">' +
        '<h2>Fin</h2>' +
        '<p>' + libro.titulo + '</p>' +
        '<div class="acciones">' +
        '<button class="btn" data-accion="reiniciar">Leerlo otra vez</button>' +
        '<a class="btn" href="index.html">Otro libro</a>' +
        '</div>' + credito + '</div>';
    }
    var ilus = item.pg.imagen
      ? '<img src="' + item.pg.imagen + '" alt="" loading="lazy">'
      : item.pg.svg;
    var cuerpo;
    if (item.pg.estribillo) {
      cuerpo = '<div class="lineas">' +
        item.pg.estribillo.map(function (l, k) {
          return '<b class="l' + Math.min(k + 1, 4) + '">' + l + '</b>';
        }).join("") + '</div>';
    } else {
      cuerpo = '<p class="texto">' + item.pg.texto + '</p>';
    }
    return '<div class="pagina' + (item.pg.estribillo ? ' estribillo' : '') + '">' +
      '<div class="ilustracion">' + ilus + '</div>' + cuerpo +
      '<span class="folio">' + item.n + '</span>' +
      '</div>';
  }

  function construir(m) {
    modo = m;
    lista = armarLista(m);
    book.innerHTML = "";
    hojas = [];

    var paso = (m === "doble") ? 2 : 1;
    for (var i = 0; i < lista.length; i += paso) {
      var hoja = document.createElement("div");
      hoja.className = "leaf";
      var frente = document.createElement("div");
      frente.className = "cara frente";
      frente.innerHTML = htmlPagina(lista[i]);
      var atras = document.createElement("div");
      atras.className = "cara atras";
      atras.innerHTML = htmlPagina(m === "doble" ? lista[i + 1] : null);
      hoja.appendChild(frente);
      hoja.appendChild(atras);
      book.appendChild(hoja);
      hojas.push(hoja);
    }
    total = hojas.length;
    maxHoja = Math.max(0, total - 1);
    actual = 0;

    book.classList.toggle("simple", m === "simple");
    stage.classList.toggle("simple", m === "simple");

    slider.min = 0;
    slider.max = maxHoja;
    slider.value = 0;

    if (window.ACTIVIDADES && libro.actividades) {
      window.ACTIVIDADES.activar(book, libro.actividades);
    }

    aplicarZ();
    actualizar();
    ajustar();
  }

  function hojaDeActividades() {
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].t === "actividad") return (modo === "doble") ? Math.floor(i / 2) : i;
    }
    return 0;
  }

  function aplicarZ() {
    hojas.forEach(function (h, i) {
      h.style.zIndex = h.classList.contains("volteada") ? (i + 1) : (total - i);
    });
  }

  /* ---------------- navegación ---------------- */
  function pasar(hacia) {
    if (animando) return;
    if (hacia > 0 && actual >= maxHoja) return;
    if (hacia < 0 && actual <= 0) return;

    var hoja = hacia > 0 ? hojas[actual] : hojas[actual - 1];
    animando = true;
    hoja.style.zIndex = total + 2;
    if (hacia > 0) { hoja.classList.add("volteada"); actual++; }
    else { hoja.classList.remove("volteada"); actual--; }

    window.setTimeout(function () {
      animando = false;
      aplicarZ();
    }, 900);

    actualizar();
  }

  function irA(n) {
    n = Math.max(0, Math.min(maxHoja, n));
    hojas.forEach(function (h, i) { h.classList.toggle("volteada", i < n); });
    actual = n;
    aplicarZ();
    actualizar();
  }

  function paginasVisibles() {
    var v = [];
    if (modo === "doble") {
      if (actual > 0 && lista[actual * 2 - 1]) v.push(lista[actual * 2 - 1]);
      if (lista[actual * 2]) v.push(lista[actual * 2]);
    } else if (lista[actual]) {
      v.push(lista[actual]);
    }
    return v;
  }

  function actualizar() {
    book.classList.toggle("cerrado", actual === 0);
    btnPrev.disabled = (actual <= 0);
    btnNext.disabled = (actual >= maxHoja);
    slider.value = actual;

    var vis = paginasVisibles(), nums = [], acts = [];
    vis.forEach(function (p) {
      if (p && p.t === "pagina") nums.push(p.n);
      if (p && p.t === "actividad") acts.push(p.i + 1);
    });
    if (nums.length === 0 && acts.length) {
      contador.textContent = (acts.length > 1 ? "Actividades " + acts[0] + "-" + acts[acts.length - 1] : "Actividad " + acts[0]) +
        " de " + libro.actividades.length;
    } else if (nums.length === 0) {
      contador.textContent = (actual === 0) ? "Portada" : "· " + libro.paginas.length + " páginas ·";
    } else if (acts.length) {
      contador.textContent = "Página " + nums[nums.length - 1] + " · Actividad " + acts[0];
    } else if (nums.length === 1) {
      contador.textContent = "Página " + nums[0] + " de " + libro.paginas.length;
    } else {
      contador.textContent = "Páginas " + nums[0] + "-" + nums[nums.length - 1] + " de " + libro.paginas.length;
    }
    if (leyendo) leerVisible();
  }

  /* ---------------- escala para que quepa ---------------- */
  function ajustar() {
    var r = visor.getBoundingClientRect();
    var bw = (modo === "simple") ? 440 : 880;
    var s = Math.min((r.width - 24) / bw, (r.height - 16) / 570);
    s = Math.max(.25, Math.min(s, 1.35));
    stage.style.transform = "scale(" + s + ")";
  }

  function modoQueToca() {
    return window.innerWidth < ANCHO_SIMPLE ? "simple" : "doble";
  }

  function alRedimensionar() {
    var m = modoQueToca();
    if (m !== modo) {
      var proporcion = maxHoja ? actual / maxHoja : 0;
      construir(m);
      irA(Math.round(proporcion * maxHoja));
    } else {
      ajustar();
    }
  }

  /* ---------------- lectura en voz alta ---------------- */
  var leyendo = false;
  var puedeHablar = ("speechSynthesis" in window);

  function vozEspanol() {
    var vs = window.speechSynthesis.getVoices() || [];
    for (var i = 0; i < vs.length; i++) if (/^es[-_]MX/i.test(vs[i].lang)) return vs[i];
    for (var j = 0; j < vs.length; j++) if (/^es/i.test(vs[j].lang)) return vs[j];
    return null;
  }

  function leerVisible() {
    if (!puedeHablar) return;
    window.speechSynthesis.cancel();
    var textos = [];
    paginasVisibles().forEach(function (p) {
      if (p && p.t === "pagina") textos.push(p.pg.estribillo ? p.pg.estribillo.join(" ") : p.pg.texto);
      if (p && p.t === "portada") textos.push(libro.titulo);
    });
    if (!textos.length) return;
    var u = new SpeechSynthesisUtterance(textos.join(" "));
    u.lang = "es-MX";
    u.rate = .88;
    u.pitch = 1.05;
    var v = vozEspanol();
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  }

  if (!puedeHablar) btnVoz.style.display = "none";

  btnVoz.addEventListener("click", function () {
    leyendo = !leyendo;
    btnVoz.classList.toggle("activo", leyendo);
    if (leyendo) leerVisible();
    else window.speechSynthesis.cancel();
  });

  /* ---------------- pantalla completa ---------------- */
  btnFull.addEventListener("click", function () {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
  });

  /* ---------------- eventos ---------------- */
  if (libro.actividades && libro.actividades.length) {
    btnAct.addEventListener("click", function () { irA(hojaDeActividades()); });
  } else {
    btnAct.style.display = "none";
  }

  btnPrev.addEventListener("click", function () { pasar(-1); });
  btnNext.addEventListener("click", function () { pasar(1); });
  slider.addEventListener("input", function () { irA(parseInt(slider.value, 10)); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); pasar(1); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); pasar(-1); }
    if (e.key === "Home") irA(0);
    if (e.key === "End") irA(maxHoja);
  });

  book.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-accion]") : null;
    if (b && b.getAttribute("data-accion") === "reiniciar") { irA(0); return; }
    if (e.target.closest && e.target.closest("a")) return;
    // dentro de una actividad manda la actividad, no el paso de pagina
    if (e.target.closest && e.target.closest(".pagina.actividad")) return;
    var r = book.getBoundingClientRect();
    if (e.clientX > r.left + r.width / 2) pasar(1); else pasar(-1);
  });

  var x0 = null;
  visor.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  visor.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) pasar(dx < 0 ? 1 : -1);
    x0 = null;
  }, { passive: true });

  window.addEventListener("resize", alRedimensionar);
  if (puedeHablar) window.speechSynthesis.onvoiceschanged = function () {};

  /* ---------------- arranque ---------------- */
  construir(modoQueToca());
  window.setTimeout(ajustar, 60);
})();
