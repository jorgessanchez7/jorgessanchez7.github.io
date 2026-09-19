/* Banco de palabras — método global.
 *
 * Dos modos: una a la vez (el que se usa con Antonio) y todas (para que el
 * adulto escoja). Arranca en «una a la vez» a propósito: el IEP dice que
 * «toca al azar», y una rejilla de doce tarjetas es justo una invitación a
 * tocar al azar. Una sola tarjeta grande no le pide nada.
 *
 * No hay puntaje, no hay pregunta y no hay respuesta correcta. Lo único que
 * hace tocar una tarjeta es decir la palabra en voz alta.
 *
 * Las tarjetas cuya imagen no existe todavía se esconden solas (onerror), así
 * el banco se va llenando a medida que llegan las fotos sin tocar el código.
 */
(function () {
  "use strict";

  var BANCO = window.BANCO || [];

  var el = function (id) { return document.getElementById(id); };
  var campo = null;      // el campo que se está viendo
  var i = 0;             // en cuál tarjeta va
  var vivas = [];        // las del campo actual cuya imagen sí cargó

  /* ---------- la voz ---------- */

  function decir(texto) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    var v = new SpeechSynthesisUtterance(texto);
    v.lang = "es-MX";
    v.rate = 0.85;
    window.speechSynthesis.speak(v);
  }

  /* ---------- qué imágenes existen de verdad ---------- */

  function revisar(cartas, listo) {
    var faltan = cartas.length, buenas = [];
    if (!faltan) return listo([]);
    cartas.forEach(function (c, orden) {
      var img = new Image();
      img.onload  = function () { buenas.push({ c: c, orden: orden }); fin(); };
      img.onerror = function () { fin(); };
      img.src = c.img;
      function fin() { if (--faltan === 0) {
        buenas.sort(function (a, b) { return a.orden - b.orden; });
        listo(buenas.map(function (x) { return x.c; }));
      } }
    });
  }

  /* ---------- una a la vez ---------- */

  function pintarSola() {
    var c = vivas[i];
    if (!c) return;
    el("carta-img").src = c.img;
    el("carta-img").alt = c.palabra;
    el("carta").classList.toggle("pictograma", !!c.pict);
    el("carta-palabra").textContent = c.palabra;
    el("cuenta").textContent = (i + 1) + " de " + vivas.length;
    el("nota").textContent = c.nota || "";
    el("nota").hidden = !c.nota;
    el("antes").disabled = (i === 0);
    el("sigue").disabled = (i === vivas.length - 1);
  }

  function mover(d) {
    var n = i + d;
    if (n < 0 || n >= vivas.length) return;
    i = n;
    pintarSola();
  }

  /* ---------- todas ---------- */

  function pintarTodas() {
    var caja = el("todas");
    caja.innerHTML = "";
    vivas.forEach(function (c, n) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "carta chica" + (c.pict ? " pictograma" : "");
      b.innerHTML = '<span class="marco"><img alt=""></span><span class="palabra"></span>';
      b.querySelector("img").src = c.img;
      b.querySelector("img").alt = c.palabra;
      b.querySelector(".palabra").textContent = c.palabra;
      b.addEventListener("click", function () {
        i = n;
        verModo("sola");
        pintarSola();
      });
      caja.appendChild(b);
    });
  }

  /* ---------- modos y campos ---------- */

  function verModo(cual) {
    var sola = (cual === "sola");
    el("sola").hidden = !sola;
    el("todas").hidden = sola;
    el("modo").textContent = sola ? "Ver todas" : "Una a la vez";
    el("eyebrow").textContent = sola ? "Una palabra a la vez" : "Todas las del campo";
  }

  function abrir(id) {
    campo = BANCO.filter(function (c) { return c.id === id; })[0] || BANCO[0];
    if (!campo) return;
    i = 0;
    el("titulo").textContent = campo.titulo;
    el("sub").textContent = campo.sub || "";
    [].forEach.call(document.querySelectorAll("#campos .btn"), function (b) {
      b.classList.toggle("puesto", b.dataset.campo === campo.id);
    });

    revisar(campo.cartas, function (buenas) {
      vivas = buenas;
      var hay = vivas.length > 0;
      el("sola").hidden = !hay;
      el("modo").hidden = !hay;
      if (!hay) {
        el("todas").hidden = false;
        el("todas").innerHTML = '<p class="vacio">Todavía no hay imágenes para este campo. ' +
          'Van en <code>img/lecciones/antonio/</code>.</p>';
        return;
      }
      pintarSola();
      pintarTodas();
      verModo("sola");
      /* el crédito de ARASAAC solo si de verdad hay pictogramas en pantalla */
      el("credito").hidden = !vivas.some(function (c) { return c.pict; });
    });
  }

  /* ---------- arranque ---------- */

  function arrancar() {
    if (!BANCO.length) return;

    var caja = el("campos");
    BANCO.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "btn suave";
      b.dataset.campo = c.id;
      b.textContent = c.titulo;
      b.addEventListener("click", function () { abrir(c.id); });
      caja.appendChild(b);
    });

    el("carta").addEventListener("click", function () {
      if (vivas[i]) decir(vivas[i].palabra);
    });
    el("antes").addEventListener("click", function () { mover(-1); });
    el("sigue").addEventListener("click", function () { mover(1); });
    el("modo").addEventListener("click", function () {
      verModo(el("sola").hidden ? "sola" : "todas");
    });

    /* flechas del teclado, por si se usa con computador */
    document.addEventListener("keydown", function (e) {
      if (el("sola").hidden) return;
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    });

    var pedido = new URLSearchParams(location.search).get("campo");
    abrir(pedido || BANCO[0].id);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", arrancar);
  } else {
    arrancar();
  }
})();
