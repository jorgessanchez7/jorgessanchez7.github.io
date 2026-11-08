/* ============================================================
   figuras.js - las figuras geométricas, para Nelson.

   Ocho figuras, con su nombre en español y en inglés. Cada una es
   además un trazo de un solo camino, igual que las rayas, las olas
   y las ruedas de los trazos de antes de las letras: para Nelson,
   que vive en esa parte, repasar una figura es el mismo ejercicio
   con un nombre más.

   Van en dos grupos de cuatro: primero las que se ven en todas
   partes (círculo, cuadrado, triángulo, rectángulo) y después las
   otras cuatro.

   El nombre en inglés es el que se usa en el preescolar de allá:
   «diamond» para el rombo, no «rhombus», que llega años después.
   ============================================================ */
(function () {
  "use strict";

  function estrella() {
    var p = [], cx = 55, cy = 60, R = 50, r = 20;
    for (var k = 0; k < 10; k++) {
      var a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r : R;
      p.push((k ? "L" : "M") + (cx + rr * Math.cos(a)).toFixed(1) + " " + (cy + rr * Math.sin(a)).toFixed(1));
    }
    return p.join(" ") + " L55 10";
  }

  var FIGURAS = [
    { id: "circulo", es: "círculo", en: "circle", grupo: 1,
      banda: "#fde4e4", tinta: "#d1495b", celda: [110, 120],
      d: "M55 15 A40 42 0 0 0 55 99 A40 42 0 0 0 55 15", ini: [55, 15], ang: 180,
      pista: "Desde el punto de arriba, hacia la izquierda, y toda la vuelta hasta cerrar.",
      dondeEs: "un plato, una pelota, la luna llena", dondeEn: "a plate, a ball, the full moon" },
    { id: "cuadrado", es: "cuadrado", en: "square", grupo: 1,
      banda: "#e0eef6", tinta: "#1f6f99", celda: [110, 120],
      d: "M20 22 L90 22 L90 92 L20 92 L20 22", ini: [20, 22], ang: 0,
      pista: "Cuatro lados iguales: para la derecha, para abajo, para la izquierda y para arriba.",
      dondeEs: "una ventana, una galleta de soda", dondeEn: "a window, a cracker" },
    { id: "triangulo", es: "triángulo", en: "triangle", grupo: 1,
      banda: "#dcefe6", tinta: "#1b7a5a", celda: [110, 120],
      d: "M55 14 L94 98 L16 98 L55 14", ini: [55, 14], ang: 65,
      pista: "Desde la punta de arriba: baja a la derecha, cruza por abajo y sube otra vez a la punta.",
      dondeEs: "un pedazo de pizza, el techo de una casa", dondeEn: "a slice of pizza, a roof" },
    { id: "rectangulo", es: "rectángulo", en: "rectangle", grupo: 1,
      banda: "#fbf3c8", tinta: "#8a6d0b", celda: [160, 120],
      d: "M15 32 L145 32 L145 90 L15 90 L15 32", ini: [15, 32], ang: 0,
      pista: "Como el cuadrado, pero estirado: dos lados largos y dos cortos.",
      dondeEs: "una puerta, un libro, el televisor", dondeEn: "a door, a book, the TV" },
    { id: "ovalo", es: "óvalo", en: "oval", grupo: 2,
      banda: "#fce7f3", tinta: "#be185d", celda: [150, 120],
      d: "M75 24 A58 35 0 0 0 75 94 A58 35 0 0 0 75 24", ini: [75, 24], ang: 180,
      pista: "Una rueda estirada: desde arriba, hacia la izquierda, hasta cerrar.",
      dondeEs: "un huevo, una cara", dondeEn: "an egg, a face" },
    { id: "rombo", es: "rombo", en: "diamond", grupo: 2,
      banda: "#e0f2fe", tinta: "#0369a1", celda: [110, 120],
      d: "M55 10 L94 60 L55 110 L16 60 L55 10", ini: [55, 10], ang: 52,
      pista: "Desde la punta de arriba, cuatro rayas inclinadas hasta volver a la punta.",
      dondeEs: "una cometa", dondeEn: "a kite" },
    { id: "estrella", es: "estrella", en: "star", grupo: 2,
      banda: "#fdf1d8", tinta: "#b5832a", celda: [110, 120],
      d: estrella(), ini: [55, 10], ang: 72,
      pista: "Desde la punta de arriba, bajando y subiendo por las cinco puntas sin levantar el dedo.",
      dondeEs: "las estrellas del cielo", dondeEn: "the stars in the sky" },
    { id: "corazon", es: "corazón", en: "heart", grupo: 2,
      banda: "#f1e4f0", tinta: "#7d3f78", celda: [110, 120],
      d: "M55 34 C52 25 45 19 36 19 C24 19 12 29 12 44 C12 60 21 77 55 102 " +
         "C89 77 98 60 98 44 C98 29 86 19 74 19 C65 19 58 25 55 34",
      ini: [55, 34], ang: 235,
      pista: "Desde la mitad de arriba: la vuelta de la izquierda hasta la punta de abajo, y sube por la derecha.",
      dondeEs: "una tarjeta de cariño", dondeEn: "a valentine" }
  ];

  window.FIGURAS = FIGURAS;

  /* La figura rellena, para la tarjeta grande. */
  window.FIGURA_SVG = function (F, clase) {
    var w = F.celda[0];
    return '<svg class="' + (clase || "fig-dibujada") + '" viewBox="0 0 ' + w + ' 120" ' +
      'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="' + F.d + '" fill="' + F.banda + '" stroke="' + F.tinta + '" stroke-width="7" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>';
  };

  /* Una hoja de trazar por figura, como las de los trazos. Sin renglón
     (`guia` no): son dibujos, no letras. */
  if (window.FICHAS) {
    FIGURAS.forEach(function (F, i) {
      window.FICHAS.push({
        id: "figura-" + F.id, grupo: "figuras", orden: i + 1,
        figura: F.id,
        titulo: (F.id === "estrella" ? "La " : "El ") + F.es,
        pista: F.pista,
        banda: F.banda, tinta: F.tinta,
        celda: F.celda, repeticiones: F.celda[0] > 120 ? 5 : 7, renglones: 3,
        trazos: [ { d: F.d, ini: F.ini, ang: F.ang } ]
      });
    });
  }
})();
