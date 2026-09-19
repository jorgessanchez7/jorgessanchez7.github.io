/* ============================================================
   fichas.js - las hojas de escritura
   Cada ficha describe UNA hoja: qué se traza, cuántas veces y
   dónde empieza el lápiz. Nada aquí sabe dibujar; de eso se
   encarga trazos.js.

   celda: [ancho, alto] de una repetición, en unidades del SVG.
   trazos: cada uno con su camino (d), su punto de partida y el
           ángulo de la flecha (0 = derecha, 90 = abajo).
   ============================================================ */

/* El chorro de bucles se calcula, no se escribe a mano:
   es una cicloide alargada, que es justo la forma del ejercicio. */
function bucleChain(ancho, centroY) {
  var r = ancho / (2 * Math.PI);
  var d = r * 2.1;
  var partes = [];
  for (var k = 0; k <= 64; k++) {
    var t = (k / 64) * 2 * Math.PI;
    var x = r * t + d * Math.sin(t);
    var y = centroY + d * Math.cos(t);
    partes.push((k === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1));
  }
  return partes.join(" ");
}

var DIB = {
  avion:
    '<path d="M50 12c6 0 10 14 10 28l28 20v10l-28-8v16l12 10v6l-22-6-22 6v-6l12-10V62l-28 8V60l28-20c0-14 4-28 10-28z" fill="#8fc4e8" stroke="#3f7fa6" stroke-width="3" stroke-linejoin="round"/>',
  estrella:
    '<path d="M50 10 L61 38 L91 40 L68 59 L76 88 L50 72 L24 88 L32 59 L9 40 L39 38 Z" fill="#ffd98a" stroke="#d9a53f" stroke-width="3" stroke-linejoin="round"/>',
  iglesia:
    '<g stroke="#a06b45" stroke-width="3" stroke-linejoin="round">' +
    '<rect x="22" y="48" width="56" height="42" fill="#ffe9c9"/>' +
    '<path d="M16 48 L50 22 L84 48 Z" fill="#e2725b"/>' +
    '<rect x="42" y="66" width="16" height="24" rx="2" fill="#c98b53"/>' +
    '<path d="M50 22 L50 8 M43 13 L57 13" fill="none" stroke-linecap="round"/></g>',
  ojo:
    '<g><path d="M8 52 C28 24 72 24 92 52 C72 80 28 80 8 52 Z" fill="#fff" stroke="#3a3330" stroke-width="3"/>' +
    '<circle cx="50" cy="52" r="16" fill="#3f7fa6"/><circle cx="50" cy="52" r="7" fill="#20303a"/>' +
    '<circle cx="56" cy="46" r="3" fill="#fff"/></g>',
  uva:
    '<g stroke="#5c3a6e" stroke-width="2.5"><g fill="#9b6fb5">' +
    '<circle cx="50" cy="44" r="11"/><circle cx="34" cy="54" r="11"/><circle cx="66" cy="54" r="11"/>' +
    '<circle cx="42" cy="68" r="11"/><circle cx="58" cy="68" r="11"/><circle cx="50" cy="82" r="11"/></g>' +
    '<path d="M50 33 L52 18" fill="none" stroke="#6b8f3a" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M52 18 C62 8 78 12 74 24 C70 34 56 30 52 18 Z" fill="#8fbf4a" stroke="#6b8f3a"/></g>'
};

window.FICHAS = [

  /* ---------- los trazos, antes de las letras ---------- */

  { id: "vertical", grupo: "trazos", orden: 1,
    titulo: "De arriba abajo",
    pista: "Pon el dedo en el punto rojo y baja derechito.",
    banda: "#dcecf8", tinta: "#2f6690",
    celda: [72, 120], repeticiones: 10, renglones: 3,
    trazos: [ { d: "M36 15 L36 105", ini: [36, 15], ang: 90 } ] },

  { id: "horizontal", grupo: "trazos", orden: 2,
    titulo: "De un lado al otro",
    pista: "Del punto hacia la derecha, como un puente acostado.",
    banda: "#e3f3e2", tinta: "#3f7a4a",
    celda: [120, 120], repeticiones: 6, renglones: 3,
    trazos: [ { d: "M10 60 L110 60", ini: [10, 60], ang: 0 } ] },

  { id: "inclinada", grupo: "trazos", orden: 3,
    titulo: "Rayas paradas",
    pista: "Empieza arriba a la derecha y baja en diagonal.",
    banda: "#fde6ea", tinta: "#c1516a",
    celda: [76, 120], repeticiones: 9, renglones: 3,
    trazos: [ { d: "M66 15 L14 105", ini: [66, 15], ang: 120 } ] },

  { id: "zigzag", grupo: "trazos", continuo: true, orden: 4,
    titulo: "Montañas",
    pista: "Sube y baja sin levantar el dedo.",
    banda: "#e7e4f6", tinta: "#6a4fa0",
    celda: [120, 120], repeticiones: 6, renglones: 3,
    trazos: [ { d: "M0 95 L30 25 L60 95 L90 25 L120 95", ini: [0, 95], ang: -67 } ] },

  { id: "onda", grupo: "trazos", continuo: true, orden: 5,
    titulo: "Olas del mar",
    pista: "Una loma para arriba, una para abajo, suavecito.",
    banda: "#dff1f4", tinta: "#2f7f8c",
    celda: [120, 120], repeticiones: 6, renglones: 3,
    trazos: [ { d: "M0 60 Q30 15 60 60 T120 60", ini: [0, 60], ang: -56 } ] },

  { id: "arco", grupo: "trazos", orden: 6,
    titulo: "Puentes",
    pista: "Sube, pasa por encima y baja al otro lado.",
    banda: "#fdeedd", tinta: "#c06a33",
    celda: [90, 120], repeticiones: 8, renglones: 3,
    trazos: [ { d: "M10 100 A35 35 0 0 1 80 100", ini: [10, 100], ang: -90 } ] },

  { id: "bucle", grupo: "trazos", continuo: true, orden: 7,
    titulo: "Humito",
    pista: "Sube, da la vuelta y sigue. Sin levantar el dedo.",
    banda: "#f3e8f6", tinta: "#8a4f9e",
    celda: [88, 120], repeticiones: 8, renglones: 3,
    trazos: [ { d: bucleChain(88, 62), ini: [0, 91.4], ang: -15 } ] },

  { id: "circulo", grupo: "trazos", orden: 8,
    titulo: "Ruedas",
    pista: "Desde el punto de arriba, hacia la izquierda y dando toda la vuelta.",
    banda: "#fdf1d8", tinta: "#b5832a",
    celda: [90, 120], repeticiones: 8, renglones: 3,
    trazos: [ { d: "M45 25 A35 35 0 0 0 45 95 A35 35 0 0 0 45 25", ini: [45, 25], ang: 180 } ] },

  /* ---------- las vocales ----------
     Caja de 90 x 130. Altas en y=20, cuerpo desde y=55,
     renglón (el piso de la letra) en y=110. */

  { id: "vocal-a", grupo: "vocales", orden: 1, letra: "a",
    palabra: "avión", dibujo: DIB.avion,
    titulo: "La a",
    pista: "Primero la rueda: desde arriba, hacia la izquierda, hasta cerrarla. Después el palito.",
    banda: "#fdeedd", tinta: "#c06a33",
    celda: [90, 130], repeticiones: 8, renglones: 2, guia: true,
    trazos: [
      { d: "M44 55 A22 27 0 0 0 44 109 A22 27 0 0 0 44 55", ini: [44, 55], ang: 180 },
      { d: "M66 55 L66 110", ini: [66, 55], ang: 90 }
    ] },

  { id: "vocal-e", grupo: "vocales", orden: 2, letra: "e",
    palabra: "estrella", dibujo: DIB.estrella,
    titulo: "La e",
    pista: "Una rayita para la derecha y sigues dando la vuelta hacia arriba.",
    banda: "#fdf1d8", tinta: "#b5832a",
    celda: [90, 130], repeticiones: 8, renglones: 2, guia: true,
    trazos: [
      { d: "M24 84 L66 84 A22 26 0 1 0 58 104", ini: [24, 84], ang: 0 }
    ] },

  { id: "vocal-i", grupo: "vocales", orden: 3, letra: "i",
    palabra: "iglesia", dibujo: DIB.iglesia,
    titulo: "La i",
    pista: "El palito de arriba abajo, y al final el puntico.",
    banda: "#fde6ea", tinta: "#c1516a",
    celda: [90, 130], repeticiones: 8, renglones: 2, guia: true,
    trazos: [
      { d: "M45 55 L45 110", ini: [45, 55], ang: 90 },
      { punto: [45, 36] }
    ] },

  { id: "vocal-o", grupo: "vocales", orden: 4, letra: "o",
    palabra: "ojo", dibujo: DIB.ojo,
    titulo: "La o",
    pista: "Una sola rueda: desde arriba, hacia la izquierda, sin levantar el dedo.",
    banda: "#dcecf8", tinta: "#2f6690",
    celda: [90, 130], repeticiones: 8, renglones: 2, guia: true,
    trazos: [
      { d: "M44 55 A22 27 0 0 0 44 109 A22 27 0 0 0 44 55", ini: [44, 55], ang: 180 }
    ] },

  { id: "vocal-u", grupo: "vocales", orden: 5, letra: "u",
    palabra: "uva", dibujo: DIB.uva,
    titulo: "La u",
    pista: "Bajas, das la curvita abajo y subes. Después el palito de la derecha.",
    banda: "#f3e8f6", tinta: "#8a4f9e",
    celda: [90, 130], repeticiones: 8, renglones: 2, guia: true,
    trazos: [
      { d: "M24 55 L24 92 A20 18 0 0 0 64 92", ini: [24, 55], ang: 90 },
      { d: "M64 55 L64 110", ini: [64, 55], ang: 90 }
    ] },

  /* ---------- las consonantes ----------
     La m va de un solo trazo, retrazando el palito hacia arriba:
     asi es como se escribe de verdad y asi la traza el dedo. */

  { id: "letra-m", grupo: "letras", orden: 1, letra: "m", palabra: "mamá",
    titulo: "La m",
    pista: "El palito, subes por encima de lo mismo, y haces los dos puentes. Sin levantar el dedo.",
    banda: "#fde6ea", tinta: "#c1516a",
    celda: [108, 130], repeticiones: 6, renglones: 2, guia: true,
    trazos: [
      { d: "M22 55 L22 110 L22 75 A16 20 0 0 1 54 75 L54 110 L54 75 A16 20 0 0 1 86 75 L86 110",
        ini: [22, 55], ang: 90 }
    ] },

  /* ---------- sin modelo, sin nada que acertar ---------- */

  { id: "pizarra", grupo: "libre", orden: 1,
    titulo: "Pizarra libre",
    pista: "No hay nada que copiar. Se raya y ya.",
    banda: "#ffffff", tinta: "#3a3330",
    celda: [720, 320], repeticiones: 1, renglones: 1,
    trazos: [] }
];
