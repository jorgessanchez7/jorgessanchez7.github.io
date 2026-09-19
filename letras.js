/* ============================================================
   letras.js - las letras y sus sonidos
   Se dice el SONIDO, no el nombre: la M no es "eme", es /m/
   estirada y pegada a cada vocal.
   ============================================================ */
(function () {
  "use strict";

  var VOCALES = ["a", "e", "i", "o", "u"];

  // el orden no es el del abecedario: primero las que se pueden
  // estirar con la voz, que son las más fáciles de pegar a la vocal
  var CONSONANTES = [
    { letra: "m", pista: "Con los labios juntos: mmm…" },
    { letra: "l", pista: "Con la lengua arriba: lll…" },
    { letra: "s", pista: "Como una culebra: sss…" },
    { letra: "n", pista: "Por la nariz: nnn…" },
    { letra: "p", pista: "Un golpecito de labios: p." }
  ];

  /* ---------------- voz ---------------- */
  var puedeHablar = ("speechSynthesis" in window);

  function vozEspanol() {
    var vs = window.speechSynthesis.getVoices() || [], i;
    for (i = 0; i < vs.length; i++) if (/^es[-_]MX/i.test(vs[i].lang)) return vs[i];
    for (i = 0; i < vs.length; i++) if (/^es/i.test(vs[i].lang)) return vs[i];
    return null;
  }

  function decir(texto, lento) {
    if (!puedeHablar) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(texto);
      u.lang = "es-MX";
      u.rate = lento ? 0.6 : 0.8;
      u.pitch = 1.05;
      var v = vozEspanol();
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    } catch (e) { /* sin voz, no pasa nada */ }
  }

  /* ---------------- armado ---------------- */
  function tarjetaVocal(l) {
    return '<button type="button" class="letra vocal" data-decir="' + l + '" data-lento="1">' +
      '<span class="glifo">' + l.toUpperCase() + l + '</span>' +
      '</button>';
  }

  function tarjetaConsonante(c) {
    var sil = VOCALES.map(function (v) {
      return '<button type="button" class="silaba" data-decir="' + c.letra + v + '">' + c.letra + v + '</button>';
    }).join("");
    return '<div class="letra consonante">' +
      '<button type="button" class="glifo-boton" data-decir="' + c.letra + VOCALES.join(", " + c.letra) + '">' +
        '<span class="glifo">' + c.letra.toUpperCase() + c.letra + '</span>' +
      '</button>' +
      '<span class="pista">' + c.pista + '</span>' +
      '<span class="silabas">' + sil + '</span>' +
      '</div>';
  }

  document.getElementById("vocales").innerHTML = VOCALES.map(tarjetaVocal).join("");
  document.getElementById("consonantes").innerHTML = CONSONANTES.map(tarjetaConsonante).join("");

  /* ---------------- tocar para oír ---------------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-decir]");
    if (!b) return;
    decir(b.dataset.decir, b.dataset.lento === "1");
    b.classList.add("sonando");
    window.setTimeout(function () { b.classList.remove("sonando"); }, 700);
  });

  if (!puedeHablar) {
    var n = document.createElement("p");
    n.className = "sub";
    n.textContent = "Este navegador no puede leer en voz alta, así que las letras no suenan. Dilas tú.";
    document.querySelector(".hero-letras .envoltura").appendChild(n);
  }
})();
