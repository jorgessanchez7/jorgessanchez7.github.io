/* ============================================================
   abecedario.js - una lección por letra

   El orden no es el del abecedario: primero las que se pueden
   estirar con la voz (m, l, s, n) y de últimas la p, que es un
   golpe seco. Eso es lo que hace fácil pegar la letra a la vocal.

   Las fotos son de la casa. Van sin estilizar: el punto es que
   el niño reconozca a su mamá y a su papá.

   Cada letra nueva reutiliza las anteriores. Por eso en la p ya
   aparece "mapa": es la primera palabra que necesita las dos.
   ============================================================ */
window.ABECEDARIO = [

  { id: "m", letra: "m", mayuscula: "M", orden: 1,
    banda: "#fde6ea", tinta: "#c1516a",
    comoSuena: "Con los labios juntos y sin abrir la boca: mmm…",
    aviso: ["No se dice «eme». Se dice mmm. El nombre de la letra no sirve para leer; el sonido sí."],
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
    hojas: ["letra-m", "silabas-m", "frases-m"] },

  { id: "p", letra: "p", mayuscula: "P", orden: 2,
    banda: "#dcecf8", tinta: "#2f6690",
    comoSuena: "Labios juntos y un golpecito de aire: p. No se puede estirar.",
    aviso: [
      "Esta no se puede sostener como la m. Si intenta alargarla le sale «pe», y ese «e» de sobra " +
      "es justo lo que después le estorba para juntar: dice «pe-a» en vez de «pa». Un golpecito y ya.",
      "Ojo con la tilde: «papá» es el papá y «papa» es la de comer. Es la misma letra y cambia todo; " +
      "vale la pena señalarlo con el dedo."
    ],
    palabra: "papá",
    foto: "img/lecciones/p/papa.jpg",
    /* la cartilla las pone en este orden, no en a-e-i-o-u:
       así toca leerlas y no recitarlas de memoria */
    notaSilabas: "Van en desorden a propósito: así toca leerlas y no recitar a-e-i-o-u de memoria.",
    silabas: ["pa", "pu", "pi", "po", "pe"],
    palabras: ["papá", "mapa", "pipa", "puma", "pomo", "papa"],
    tarjetas: [
      { palabra: "pipa", foto: "img/lecciones/p/pipa.jpg" },
      { palabra: "puma", foto: "img/lecciones/p/puma.jpg" },
      { palabra: "mapa", dibujo:
        /* Colombia, dibujada con sus coordenadas de verdad.
           El mapa de la cartilla es dibujo de Nacho y no se copia. */
        '<rect width="100" height="100" fill="none"/>' +
        '<path d="M57.1 5 L60.6 8.8 L53 13.1 L55.3 22.8 L61.2 34.6 L79.5 38.4 L82.5 39 ' +
        'L80.1 57.3 L83 61.6 L68.3 66.4 L70.7 76.1 L67.1 85.8 L66.5 95 L49.4 84.8 ' +
        'L35.8 70.2 L21.7 68.1 L15.2 64.8 L22.9 50.8 L23.4 40 L20.5 33.6 L24.6 26 ' +
        'L26.4 26 L34.1 21.7 L42.3 12.5 L52.4 9.9 Z" ' +
        'fill="#8fbf4a" stroke="#4f7a2a" stroke-width="2.5" stroke-linejoin="round"/>' +
        '<circle cx="43" cy="48" r="3.4" fill="#e2725b" stroke="#a83f2e" stroke-width="1.6"/>' }
    ],
    frases: [
      { texto: "mi papá me ama.", foto: "img/lecciones/p/todos.jpg", completa: true, rel: "5 / 2" },
      { texto: "mi papá me mima.", foto: "img/lecciones/p/me-mima.jpg" },
      { texto: "amo a mi papá.", foto: "img/lecciones/p/me-ama.jpg" },
      { texto: "mimo a mi papá.", foto: "img/lecciones/p/mimo.jpg" },
      { texto: "mimo a mamá.", foto: "img/lecciones/p/mimo-mama.jpg", ancha: true, rel: "3 / 2" },
      { texto: "amo a papá.", foto: "img/lecciones/p/amo-papa.jpg", ancha: true, rel: "3 / 2" }
    ],
    hojas: ["letra-p", "silabas-p", "frases-p"] }

  /* Siguen: l, s, n. Cada una con sus propias fotos de la casa. */
];
