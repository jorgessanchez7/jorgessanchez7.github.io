/* ============================================================
   actividades.js - actividades que se juegan dentro del libro
   Tipos: "unir", "marcar", "palabras"
   Se tocan, no se arrastran: arrastrar exige sostener presion y
   hacer un recorrido, y eso es una barrera de acceso, no una
   prueba de si el nino sabe.
   ============================================================ */
(function () {
  "use strict";

  function esc(t) { return String(t).replace(/</g, "&lt;"); }

  function decir(texto) {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(texto);
      u.lang = "es-MX"; u.rate = .82; u.pitch = 1.05;
      var vs = window.speechSynthesis.getVoices() || [], i;
      for (i = 0; i < vs.length; i++) if (/^es/i.test(vs[i].lang)) { u.voice = vs[i]; break; }
      window.speechSynthesis.speak(u);
    } catch (e) { /* sin voz, no pasa nada */ }
  }

  function foto(item) {
    return item.svg
      ? '<span class="foto">' + item.svg + '</span>'
      : '<span class="foto"><img src="' + item.img + '" alt="" loading="lazy"></span>';
  }

  /* ---------------- armado del HTML ---------------- */
  function html(act, idx) {
    var s = '<div class="pagina actividad" data-act="' + idx + '" data-tipo="' + act.tipo + '">' +
            '<p class="consigna">' + esc(act.consigna) + '</p>';

    if (act.tipo === "unir") {
      s += '<div class="tablero">' +
           '<svg class="lineas" aria-hidden="true"></svg>' +
           '<div class="col">' +
             act.izq.map(function (it, i) {
               return '<button type="button" class="tarjeta" data-lado="i" data-fila="' + i + '" data-id="' + it.id + '">' +
                 foto(it) + '<span class="rotulo">' + esc(it.etiqueta) + '</span></button>';
             }).join("") +
           '</div><div class="col">' +
             act.der.map(function (it, i) {
               return '<button type="button" class="tarjeta" data-lado="d" data-fila="' + i + '" data-id="' + it.id + '">' +
                 foto(it) + '<span class="rotulo">' + esc(it.etiqueta) + '</span></button>';
             }).join("") +
           '</div></div>';

    } else if (act.tipo === "marcar") {
      s += '<div class="opciones">' +
           act.opciones.map(function (o, i) {
             return '<button type="button" class="opcion" data-i="' + i + '" data-ok="' + (o.ok ? 1 : 0) + '">' +
               '<span class="caja"></span>' + esc(o.texto) + '</button>';
           }).join("") + '</div>';

    } else if (act.tipo === "palabras") {
      s += '<div class="cajita">' +
           act.tarjetas.map(function (t) {
             return '<button type="button" class="palabra" data-palabra="' + esc(t.palabra) + '">' +
               foto(t) + '<span class="rotulo">' + esc(t.palabra) + '</span></button>';
           }).join("") + '</div>';
    }

    if (act.tipo !== "palabras") {
      s += '<div class="pie-act"><span class="aviso"></span>' +
           '<button type="button" class="btn-otra">Otra vez</button></div>';
    }
    return s + '</div>';
  }

  /* ---------------- puesta en marcha ---------------- */
  function activar(raiz, lista) {
    var nodos = raiz.querySelectorAll(".pagina.actividad");
    Array.prototype.forEach.call(nodos, function (nodo) {
      if (nodo.dataset.listo) return;
      nodo.dataset.listo = "1";
      var act = lista[+nodo.dataset.act];
      if (!act) return;
      if (act.tipo === "unir") unir(nodo, act);
      if (act.tipo === "marcar") marcar(nodo, act);
      if (act.tipo === "palabras") palabras(nodo, act);
    });
  }

  function aviso(nodo, txt, clase) {
    var a = nodo.querySelector(".aviso");
    if (!a) return;
    a.textContent = txt;
    a.className = "aviso " + (clase || "");
  }

  /* ---------------- unir ---------------- */
  function unir(nodo, act) {
    var tablero = nodo.querySelector(".tablero");
    var svg = nodo.querySelector(".lineas");
    var sel = null, hechos = {};

    function medir() {
      svg.setAttribute("width", tablero.offsetWidth);
      svg.setAttribute("height", tablero.offsetHeight);
      svg.setAttribute("viewBox", "0 0 " + tablero.offsetWidth + " " + tablero.offsetHeight);
    }

    function ancla(lado, fila) {
      // offsetLeft/offsetTop ya vienen medidos contra .tablero, que es position:relative
      var t = nodo.querySelector('.tarjeta[data-lado="' + lado + '"][data-fila="' + fila + '"]');
      return {
        x: (lado === "i") ? t.offsetLeft + t.offsetWidth : t.offsetLeft,
        y: t.offsetTop + t.offsetHeight / 2
      };
    }

    function traza(fi, fd, color, punteada) {
      medir();
      var a = ancla("i", fi), b = ancla("d", fd), m = (a.x + b.x) / 2;
      var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", "M" + a.x + "," + a.y + " C" + m + "," + a.y + " " + m + "," + b.y + " " + b.x + "," + b.y);
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", color);
      p.setAttribute("stroke-width", "5");
      p.setAttribute("stroke-linecap", "round");
      if (punteada) p.setAttribute("stroke-dasharray", "8 8");
      svg.appendChild(p);
      return p;
    }

    function limpia() {
      svg.innerHTML = "";
      sel = null; hechos = {};
      Array.prototype.forEach.call(nodo.querySelectorAll(".tarjeta"), function (t) {
        t.classList.remove("elegida", "resuelta");
      });
      aviso(nodo, "", "");
    }

    nodo.addEventListener("click", function (e) {
      var t = e.target.closest(".tarjeta");
      if (e.target.closest(".btn-otra")) { limpia(); return; }
      if (!t || t.classList.contains("resuelta")) return;
      var lado = t.dataset.lado, fila = +t.dataset.fila, id = t.dataset.id;

      if (lado === "i") {
        if (sel) sel.el.classList.remove("elegida");
        sel = { fila: fila, id: id, el: t };
        t.classList.add("elegida");
        aviso(nodo, "Ahora toca su casa.", "neutro");
        return;
      }
      if (!sel) { aviso(nodo, "Primero toca un cerdito.", "neutro"); return; }

      if (id === sel.id) {
        traza(sel.fila, fila, "#4f9d5d", false);
        hechos[id] = true;
        sel.el.classList.remove("elegida");
        sel.el.classList.add("resuelta");
        t.classList.add("resuelta");
        sel = null;
        var faltan = act.izq.length - Object.keys(hechos).length;
        aviso(nodo, faltan ? "¡Esa es! Faltan " + faltan + "." : "¡Las tres! Muy bien.", faltan ? "" : "bien");
      } else {
        var p = traza(sel.fila, fila, "#c9553c", true);
        aviso(nodo, "Esa no. Mira otra vez.", "mal");
        window.setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, 900);
      }
    });

    window.addEventListener("resize", medir);
    medir();
  }

  /* ---------------- marcar ---------------- */
  function marcar(nodo, act) {
    var total = act.opciones.filter(function (o) { return o.ok; }).length;

    function cuenta() {
      var b = nodo.querySelectorAll(".opcion.bien").length;
      aviso(nodo, b === total ? "¡Esos tres son! Muy bien." : "Llevas " + b + " de " + total + ".", b === total ? "bien" : "neutro");
    }

    nodo.addEventListener("click", function (e) {
      if (e.target.closest(".btn-otra")) {
        Array.prototype.forEach.call(nodo.querySelectorAll(".opcion"), function (o) {
          o.classList.remove("bien", "mal");
        });
        aviso(nodo, "", "");
        return;
      }
      var op = e.target.closest(".opcion");
      if (!op || op.classList.contains("bien")) return;
      if (op.dataset.ok === "1") {
        op.classList.remove("mal");
        op.classList.add("bien");
        cuenta();
      } else {
        op.classList.add("mal");
        aviso(nodo, "Ese no estaba en el cuento.", "mal");
        window.setTimeout(function () { op.classList.remove("mal"); }, 900);
      }
    });
  }

  /* ---------------- cajita de palabras ---------------- */
  function palabras(nodo) {
    nodo.addEventListener("click", function (e) {
      var p = e.target.closest(".palabra");
      if (!p) return;
      Array.prototype.forEach.call(nodo.querySelectorAll(".palabra"), function (o) { o.classList.remove("sonando"); });
      p.classList.add("sonando");
      decir(p.dataset.palabra);
      window.setTimeout(function () { p.classList.remove("sonando"); }, 1400);
    });
  }

  window.ACTIVIDADES = { html: html, activar: activar };
})();
