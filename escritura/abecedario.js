/* ============================================================
   abecedario.js - una lección por letra

   El orden no es el del abecedario: primero las que se pueden
   estirar con la voz (m, l, s, n) y de últimas la p, que es un
   golpe seco. Eso es lo que hace fácil pegar la letra a la vocal.

   Las fotos son de la casa. Están pasadas a lámina para que
   parezcan dibujo de cartilla, pero el punto es que el niño
   reconozca a su mamá, no que quede bonito.
   ============================================================ */
window.ABECEDARIO = [

  { id: "m", letra: "m", mayuscula: "M", orden: 1,
    banda: "#fde6ea", tinta: "#c1516a",
    comoSuena: "Con los labios juntos y sin abrir la boca: mmm…",
    aviso: "No se dice «eme». Se dice mmm. El nombre de la letra no sirve para leer; el sonido sí.",
    palabra: "mamá",
    foto: "img/lecciones/m/mama.jpg",
    silabas: ["ma", "me", "mi", "mo", "mu"],
    palabras: ["mamá", "amo", "ama", "mima", "mimo"],
    frases: [
      { texto: "mi mamá me ama.", foto: "img/lecciones/m/me-ama.jpg" },
      { texto: "amo a mi mamá.", foto: "img/lecciones/m/amo.jpg" },
      { texto: "mimo a mi mamá.", foto: "img/lecciones/m/mimo.jpg" },
      { texto: "mi mamá me mima.", foto: "img/lecciones/m/me-mima.jpg" }
    ],
    hojas: ["letra-m", "silabas-m", "frases-m"] }

  /* Siguen: l, s, n, p. Cada una con sus propias fotos de la casa. */
];
