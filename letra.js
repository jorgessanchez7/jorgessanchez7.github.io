/* ============================================================
   letra.js - la lección de una letra
   Se abre con letra.html?letra=m&de=chepe
   Todo lo que tenga texto se puede tocar para oírlo.
   ============================================================ */
(function () {
  "use strict";

  var LETRAS = window.ABECEDARIO || [];

  var DESTINOS = {
    global:   { href: "global.html",   texto: "Método global" },
    silabico: { href: "silabico.html", texto: "Método silábico" }
  };

  function param(n) {
    var m = new RegExp("[?&]" + n + "=([^&]*)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }

  function buscar(id) {
    for (var i = 0; i < LETRAS.length; i++) if (LETRAS[i].id === id) return LETRAS[i];
    return LETRAS[0];
  }

  var L = buscar(param("letra"));
  var de = DESTINOS[param("de")] || { href: "lecciones.html", texto: "Lecciones" };

  /* ---------- voz ---------- */
  var sonando = null;

  function decir(txt, nodo) {
    if (nodo) {
      if (sonando) sonando.classList.remove("sonando");
      nodo.classList.add("sonando");
      sonando = nodo;
      setTimeout(function () { nodo.classList.remove("sonando"); }, 1400);
    }
    if (!window.speechSynthesis) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(txt);
      u.lang = "es-MX";
      u.rate = 0.8;
      var vs = speechSynthesis.getVoices() || [];
      for (var i = 0; i < vs.length; i++) {
        if (/^es/i.test(vs[i].lang)) { u.voice = vs[i]; break; }
      }
      speechSynthesis.speak(u);
    } catch (x) {}
  }

  /* La m de la palabra va en color: es la letra de la semana y
     tiene que saltar a la vista sin que nadie la señale. */
  function pintar(texto, letra) {
    var out = "";
    for (var i = 0; i < texto.length; i++) {
      var c = texto.charAt(i);
      out += c.toLowerCase() === letra ? "<b>" + c + "</b>" : c;
    }
    return out;
  }

  function boton(clase, html, dicho) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = clase;
    b.innerHTML = html;
    b.addEventListener("click", function () { decir(dicho, b); });
    return b;
  }

  function armar() {
    document.title = "La " + L.letra + " · Lecciones de lectura";
    document.documentElement.style.setProperty("--letra", L.tinta);
    document.documentElement.style.setProperty("--letra-suave", L.banda);

    var volver = document.getElementById("volver");
    volver.href = de.href;
    volver.innerHTML = "&#8592; " + de.texto;

    document.getElementById("titulo").textContent = "La " + L.letra;
    document.getElementById("como-suena").textContent = L.comoSuena;
    document.getElementById("aviso").textContent = L.aviso;

    /* la palabra grande, con su foto */
    var foto = document.getElementById("foto-clave");
    foto.src = L.foto;
    foto.alt = L.palabra;
    var pc = document.getElementById("palabra-clave");
    pc.innerHTML = pintar(L.palabra, L.letra);
    pc.addEventListener("click", function () { decir(L.palabra, pc); });

    /* el glifo grande: toca y suena el sonido, no el nombre */
    var glifo = document.getElementById("glifo");
    glifo.textContent = L.letra;
    glifo.addEventListener("click", function () {
      decir(L.letra + L.letra + L.letra, glifo);
    });

    /* las sílabas */
    var cajaS = document.getElementById("silabas");
    L.silabas.forEach(function (s) {
      cajaS.appendChild(boton("silabon", pintar(s, L.letra), s));
    });

    /* las palabras */
    var cajaP = document.getElementById("palabras");
    L.palabras.forEach(function (p) {
      cajaP.appendChild(boton("palabrota", pintar(p, L.letra), p));
    });

    /* las frases, cada una con su foto */
    var cajaF = document.getElementById("frases");
    L.frases.forEach(function (f) {
      var div = document.createElement("div");
      div.className = "frase";
      var img = document.createElement("img");
      img.src = f.foto;
      img.alt = f.texto;
      img.loading = "lazy";
      div.appendChild(img);
      div.appendChild(boton("renglon-frase", pintar(f.texto, L.letra), f.texto));
      cajaF.appendChild(div);
    });

    /* las hojas para escribirla */
    var cajaH = document.getElementById("hojas");
    var cola = "&de=" + encodeURIComponent(param("de"));
    (L.hojas || []).forEach(function (id) {
      var f = null, F = window.FICHAS || [];
      for (var i = 0; i < F.length; i++) if (F[i].id === id) f = F[i];
      var a = document.createElement("a");
      a.className = "btn grande";
      a.href = "trazos.html?hoja=" + id + cola;
      a.textContent = (f ? f.titulo : id) + " \u2192";
      cajaH.appendChild(a);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", armar);
  } else {
    armar();
  }
})();
