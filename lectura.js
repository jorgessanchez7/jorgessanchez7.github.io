/* ============================================================
   lectura.js - menú de libros de la página principal
   ============================================================ */
(function () {
  "use strict";

  var rejilla = document.getElementById("rejilla");
  var libros = window.BIBLIOTECA || [];

  if (!libros.length) {
    rejilla.innerHTML = '<p>Todavía no hay libros. Agrégalos en <code>libros/biblioteca.js</code>.</p>';
    return;
  }

  libros.forEach(function (l) {
    var a = document.createElement("a");
    a.className = "libro";
    a.href = "libro.html?id=" + encodeURIComponent(l.id);
    a.style.setProperty("--c", l.color || "#f6a5bb");
    a.innerHTML =
      '<span class="mini">' +
        (l.portadaImagen ? '<img src="' + l.portadaImagen + '" alt="" loading="lazy">' : l.portada) +
      '</span>' +
      '<span class="datos">' +
        '<h3>' + l.titulo + '</h3>' +
        '<p class="resumen">' + (l.resumen || "") + '</p>' +
        '<span class="meta"><span>' + l.paginas.length + ' páginas</span><span>' + (l.edad || "") + '</span>' +
          (l.actividades && l.actividades.length ? '<span class="act">' + l.actividades.length + ' actividades</span>' : '') +
        '</span>' +
      '</span>';
    rejilla.appendChild(a);
  });
})();
