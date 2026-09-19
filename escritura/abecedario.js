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
    palabras: ["papá", "mapa", "pipa", "puma", "papa"],
    tarjetas: [
      { palabra: "pipa", foto: "img/lecciones/p/pipa.jpg" },
      { palabra: "puma", foto: "img/lecciones/p/puma.jpg" },
      { palabra: "mapa", dibujo:
        '<g stroke-linejoin="round">' +
        '<path d="M8 24 L36 15 L64 25 L92 16 L92 78 L64 87 L36 77 L8 86 Z" fill="#fff6e3" stroke="#a08a6a" stroke-width="3"/>' +
        '<path d="M36 15 L36 77 M64 25 L64 87" fill="none" stroke="#dcc9a6" stroke-width="2.5"/>' +
        '<path d="M16 68 C30 60 26 46 42 42 C56 38 54 56 68 52" fill="none" stroke="#3f7fa6" ' +
        'stroke-width="3.5" stroke-linecap="round" stroke-dasharray="7 6"/>' +
        '<circle cx="72" cy="40" r="11" fill="#e2725b"/>' +
        '<path d="M72 58 L79 46 L65 46 Z" fill="#e2725b"/>' +
        '<circle cx="72" cy="40" r="4" fill="#fff"/>' +
        '<path d="M15 32 h13 M15 40 h19" fill="none" stroke="#dcc9a6" stroke-width="2.5" stroke-linecap="round"/>' +
        "</g>" }
    ],
    frases: [
      { texto: "mi papá me ama.", foto: "img/lecciones/p/me-ama.jpg" },
      { texto: "mimo a mi papá.", foto: "img/lecciones/p/mimo.jpg" },
      { texto: "mi papá me mima.", foto: "img/lecciones/p/me-mima.jpg" },
      { texto: "amo a mi papá.", foto: "img/lecciones/p/amo.jpg" }
    ],
    hojas: ["letra-p", "silabas-p", "frases-p"] }

  /* Siguen: l, s, n. Cada una con sus propias fotos de la casa. */
];
