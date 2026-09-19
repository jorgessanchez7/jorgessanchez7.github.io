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
    palabras: ["papá", "mapa", "pipa", "puma", "pomo", "papa", "papo", "pepe"],
    tarjetas: [
      { palabra: "pipa", foto: "img/lecciones/p/pipa.jpg" },
      { palabra: "puma", foto: "img/lecciones/p/puma.jpg" },
      /* El mapa lo mandó el padre: relieve de los Andes colombianos.
         Venía casi blanco; se le subió el contraste y se coloreó como
         mapa de papel. Antes había una silueta de Colombia dibujada,
         y la cambió por esta. */
      { palabra: "mapa", foto: "img/lecciones/p/mapa.jpg" }
    ],
    frases: [
      { texto: "mi papá me ama.", foto: "img/lecciones/p/todos.jpg", completa: true, rel: "5 / 2" },
      { texto: "mi papá me mima.", foto: "img/lecciones/p/me-mima.jpg" },
      { texto: "amo a mi papá.", foto: "img/lecciones/p/me-ama.jpg" },
      { texto: "mimo a mi papá.", foto: "img/lecciones/p/mimo.jpg" },
      { texto: "mimo a mamá.", foto: "img/lecciones/p/mimo-mama.jpg", ancha: true, rel: "3 / 2" },
      { texto: "amo a papá.", foto: "img/lecciones/p/amo-papa.jpg", ancha: true, rel: "3 / 2" }
    ],
    hojas: ["letra-p", "silabas-p", "frases-p"] },

  /* La s va de tercera porque asi la pone la cartilla. Con ella ya se
     puede leer casi todo lo de la casa: mesa, sopa, oso, masa, piso. */
  { id: "s", letra: "s", mayuscula: "S", orden: 3,
    banda: "#e3f3e2", tinta: "#3f7a4a",
    comoSuena: "Es el silbido de la culebra: sssss. Se estira todo lo que uno quiera.",
    aviso: [
      "El nombre de la letra es «ese», pero eso no se dice al leer. Si uno dice «ese-a» le sale " +
      "«esea». Se hace el silbido y se estira hasta la vocal, sin soltarlo: ssssa. Esta es de las " +
      "fáciles, al revés de la p.",
      "Ojo con «si» y «sí». Con tilde es el de responder que sí; sin tilde es el de «si quieres». " +
      "En la frase de la mesa va con tilde, y vale la pena señalarla con el dedo."
    ],
    palabra: "sapo",
    foto: "img/lecciones/s/sapo.jpg",
    notaSilabas: "Van en el orden de la cartilla: sa, si, su, se, so. En desorden a propósito.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa: la s no tiene palabra de la familia. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["sa", "si", "su", "se", "so"],
    palabras: ["sapo", "mesa", "oso", "sopa", "misa", "suma", "masa", "pesa", "piso"],
    tarjetas: [
      { palabra: "suma", foto: "img/lecciones/s/suma.jpg" },
      { palabra: "oso", foto: "img/lecciones/s/oso.jpg" },
      { palabra: "mesa", foto: "img/lecciones/s/mesa.jpg" }
    ],
    /* Las seis frases son las de la cartilla. Las imágenes las generó el
       padre con ChatGPT y Gemini; el sapo y el oso son fotos reales. A la
       del amasado se le recortó el lado izquierdo, que traía un tablero
       escrito y un bulto de harina con letras. */
    frases: [
      { texto: "mi oso se asoma.", foto: "img/lecciones/s/oso-asoma.jpg", completa: true, rel: "5 / 2" },
      { texto: "esa mesa sí pesa.", foto: "img/lecciones/s/mesa-pesa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese oso pisa mi masa.", foto: "img/lecciones/s/oso-masa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi mamá asa esa masa.", foto: "img/lecciones/s/mama-masa.jpg" },
      { texto: "mamá puso mi sopa.", foto: "img/lecciones/s/mama-sopa.jpg" },
      { texto: "papá pasa mi mesa paso a paso.", foto: "img/lecciones/s/papa-mesa.jpg" }
    ],
    hojas: ["letra-s", "silabas-s", "frases-s"] },

  /* Con la l por fin entran «la» y «el», así que desde aquí las frases
     ya suenan como se habla de verdad y no como telegrama. */
  { id: "l", letra: "l", mayuscula: "L", orden: 4,
    banda: "#f3e8f6", tinta: "#8a4f9e",
    comoSuena: "La lengua toca el techo de la boca y el aire sale por los lados: lll. Se estira como la m.",
    aviso: [
      "El nombre de la letra es «ele», pero eso no se dice al leer: «ele-a» no da «la». " +
      "Se hace el sonido largo y se cae en la vocal: lllla. De las fáciles, como la m y la s.",
      "Fíjese en lo que acaba de pasar: con la l aparecen «la» y «el». Hasta ahora las frases " +
      "eran de telegrama («mamá puso mi sopa»); de aquí en adelante suenan como se habla. " +
      "Vale la pena decírselo, porque es la primera vez que lee algo que suena normal."
    ],
    palabra: "loma",
    foto: "img/lecciones/l/loma.jpg",
    notaSilabas: "Van en el orden de la cartilla: lo, le, li, lu, la. En desorden a propósito.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["lo", "le", "li", "lu", "la"],
    palabras: ["loma", "sala", "paloma", "lima", "lupa", "mula",
               "palo", "pule", "lomo", "pala", "ala", "alelí"],
    tarjetas: [
      { palabra: "lima", foto: "img/lecciones/l/lima.jpg" },
      { palabra: "lupa", foto: "img/lecciones/l/lupa.jpg" },
      { palabra: "mula", foto: "img/lecciones/l/mula.jpg" },
      { palabra: "paloma", foto: "img/lecciones/l/paloma.jpg" },
      { palabra: "sala", foto: "img/lecciones/l/sala.jpg" },
      { palabra: "pila", foto: "img/lecciones/l/pila.jpg" }
    ],
    frases: [
      { texto: "mi mula pasa la loma.", foto: "img/lecciones/l/mula-loma.jpg", completa: true, rel: "5 / 2" },
      { texto: "mi mamá sale a la pila.", foto: "img/lecciones/l/mama-pila.jpg" },
      { texto: "esa lima sí pule.", foto: "img/lecciones/l/lima-pule.jpg" },
      { texto: "papá pela ese palo.", foto: "img/lecciones/l/papa-palo.jpg" },
      { texto: "mi paloma sale sola a la loma.", foto: "img/lecciones/l/paloma-loma.jpg", completa: true, rel: "5 / 2" }
    ],
    hojas: ["letra-l", "silabas-l", "frases-l"] }

  /* Sigue: la n. */
];
