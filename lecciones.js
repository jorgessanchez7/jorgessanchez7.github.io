/* ============================================================
   lecciones.js - arma las rejillas de hojas en la página de
   cada niño. Lee las mismas fichas que usa trazos.js, así que
   agregar una hoja en fichas.js la hace aparecer sola aquí.
   ============================================================ */
(function () {
  "use strict";

  var FICHAS = window.FICHAS || [];

  /* miniatura: dos repeticiones, la primera como modelo */
  function mini(f) {
    var n = Math.min(2, f.repeticiones);
    var W = f.celda[0] * n, H = f.celda[1];
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" ' +
      'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect width="' + W + '" height="' + H + '" fill="' + f.banda + '"/>';
    if (f.guia) {
      s += '<g fill="none" stroke="#e3d4bd" stroke-width="1.6">' +
        '<path d="M0 55 H' + W + '" stroke-dasharray="8 8"/><path d="M0 110 H' + W + '"/></g>';
    }
    for (var i = 0; i < n; i++) {
      s += '<g transform="translate(' + i * f.celda[0] + ',0)">';
      for (var k = 0; k < f.trazos.length; k++) {
        var t = f.trazos[k];
        if (t.punto) {
          s += '<circle cx="' + t.punto[0] + '" cy="' + t.punto[1] + '" r="5" fill="' +
            (i === 0 ? f.tinta : "#c9b79d") + '"/>';
          continue;
        }
        s += i === 0
          ? '<path d="' + t.d + '" fill="none" stroke="' + f.tinta +
            '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
          : '<path d="' + t.d + '" fill="none" stroke="#c9b79d" stroke-width="3" ' +
            'stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 9"/>';
      }
      s += "</g>";
    }
    return s + "</svg>";
  }

  function rejilla(id, grupo, de) {
    var caja = document.getElementById(id);
    if (!caja) return;
    var lista = FICHAS.filter(function (f) { return f.grupo === grupo; })
      .sort(function (a, b) { return (a.orden || 0) - (b.orden || 0); });
    lista.forEach(function (f) {
      var a = document.createElement("a");
      a.className = "ficha";
      a.href = "trazos.html?hoja=" + f.id + "&de=" + encodeURIComponent(de);
      a.innerHTML = '<span class="vista">' + mini(f) + "</span><h3>" + f.titulo + "</h3>";
      caja.appendChild(a);
    });
  }

  window.LECCIONES = { rejilla: rejilla };
})();
