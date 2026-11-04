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
    palabras: ["mamá", "amo", "ama", "mima", "mimo", "mami"],
    /* Las tarjetas las sumó el padre de otra fuente. Ojo: el «mimo» de la
       tarjeta es el artista de cara blanca; el de la lista y la frase
       «mimo a mi mamá» es el verbo. Misma palabra, dos cosas. */
    tarjetas: [
      { palabra: "mimo", foto: "img/lecciones/m/mimo-tarjeta.jpg" },
      { palabra: "momia", foto: "img/lecciones/m/momia.jpg" }
    ],
    frases: [
      { texto: "mi mamá me ama.", foto: "img/lecciones/m/me-ama.jpg" },
      { texto: "amo a mi mamá.", foto: "img/lecciones/m/amo.jpg" },
      { texto: "mimo a mi mamá.", foto: "img/lecciones/m/mimo.jpg" },
      { texto: "mi mamá me mima.", foto: "img/lecciones/m/me-mima.jpg" },
      { texto: "mi mamá me ama a mí.", foto: "img/lecciones/m/me-ama-a-mi.jpg" }
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
    palabras: ["papá", "mapa", "pipa", "puma", "pomo", "papa", "papo", "pepe", "pipí", "popó",
               "papi", "pepa"],
    tarjetas: [
      { palabra: "pipa", foto: "img/lecciones/p/pipa.jpg" },
      { palabra: "puma", foto: "img/lecciones/p/puma.jpg" },
      /* El mapa lo mandó el padre: relieve de los Andes colombianos.
         Venía casi blanco; se le subió el contraste y se coloreó como
         mapa de papel. Antes había una silueta de Colombia dibujada,
         y la cambió por esta. */
      { palabra: "mapa", foto: "img/lecciones/p/mapa.jpg" },
      /* pipí y popó son dibujos de línea, no fotos: no hay manera decente
         de fotografiar esto y el dibujo se entiende de una. */
      /* la papa de comer, que el aviso ya pone al lado de «papá» */
      { palabra: "papa", foto: "img/lecciones/p/papa-comer.jpg" },
      { palabra: "pipí", foto: "img/lecciones/p/pipi.jpg" },
      { palabra: "popó", foto: "img/lecciones/p/popo.jpg" }
    ],
    frases: [
      { texto: "mi papá me ama.", foto: "img/lecciones/p/todos.jpg", completa: true, rel: "5 / 2" },
      { texto: "mi papá me mima.", foto: "img/lecciones/p/me-mima.jpg" },
      { texto: "amo a mi papá.", foto: "img/lecciones/p/me-ama.jpg" },
      { texto: "mimo a mi papá.", foto: "img/lecciones/p/mimo.jpg" },
      { texto: "mimo a mamá.", foto: "img/lecciones/p/mimo-mama.jpg", ancha: true, rel: "3 / 2" },
      { texto: "amo a papá.", foto: "img/lecciones/p/amo-papa.jpg", ancha: true, rel: "3 / 2" },
      /* agregadas de la otra fuente: las dos mitades del collage van lado a lado */
      { texto: "papá ama a mamá.", foto: "img/lecciones/p/papa-ama-mama.jpg", ancha: true, rel: "16 / 9" },
      { texto: "amo a mi papi.", foto: "img/lecciones/p/amo-papi.jpg", ancha: true, rel: "16 / 9" }
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
    palabras: ["sapo", "mesa", "oso", "sopa", "misa", "suma", "masa", "pesa", "piso",
               "paso", "peso", "seso"],
    tarjetas: [
      { palabra: "suma", foto: "img/lecciones/s/suma.jpg" },
      { palabra: "oso", foto: "img/lecciones/s/oso.jpg" },
      { palabra: "mesa", foto: "img/lecciones/s/mesa.jpg" },
      /* de la otra fuente: las dos de comer hacen pareja abajo (3+2) */
      { palabra: "sopa", foto: "img/lecciones/s/sopa.jpg" },
      { palabra: "masa", foto: "img/lecciones/s/masa.jpg" }
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
      { texto: "papá pasa mi mesa paso a paso.", foto: "img/lecciones/s/papa-mesa.jpg" },
      /* de la otra fuente. Sisi y Susi con mayúscula: son nombres. Falta
         «ese sapo se asoma»: va completa al final, la imagen entera
         (era 4:3 y recortada a 5:2 se perdía el sapo). */
      { texto: "Sisi me pasa ese mapa.", foto: "img/lecciones/s/sisi-mapa.jpg" },
      { texto: "mimo a ese oso mimoso.", foto: "img/lecciones/s/oso-mimoso.jpg" },
      { texto: "Susi usa mi mesa.", foto: "img/lecciones/s/susi-mesa.jpg" },
      { texto: "ese sapo se asoma.", foto: "img/lecciones/s/sapo-asoma.jpg", completa: true, rel: "5 / 2" }
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
               "palo", "pule", "lomo", "pala", "ala", "alelí",
               "lema", "ola", "pelo"],
    tarjetas: [
      { palabra: "lima", foto: "img/lecciones/l/lima.jpg" },
      { palabra: "lupa", foto: "img/lecciones/l/lupa.jpg" },
      { palabra: "mula", foto: "img/lecciones/l/mula.jpg" },
      { palabra: "paloma", foto: "img/lecciones/l/paloma.jpg" },
      { palabra: "sala", foto: "img/lecciones/l/sala.jpg" },
      { palabra: "pila", foto: "img/lecciones/l/pila.jpg" },
      { palabra: "pala", foto: "img/lecciones/l/pala.jpg" }
    ],
    frases: [
      { texto: "mi mula pasa la loma.", foto: "img/lecciones/l/mula-loma.jpg", completa: true, rel: "5 / 2" },
      { texto: "mi mamá sale a la pila.", foto: "img/lecciones/l/mama-pila.jpg" },
      { texto: "esa lima sí pule.", foto: "img/lecciones/l/lima-pule.jpg" },
      { texto: "papá pela ese palo.", foto: "img/lecciones/l/papa-palo.jpg" },
      { texto: "mi paloma sale sola a la loma.", foto: "img/lecciones/l/paloma-loma.jpg", completa: true, rel: "5 / 2" },
      /* de la otra fuente. Lalo, Loli y Lupe con mayúscula: son nombres */
      { texto: "Lalo usa la lupa.", foto: "img/lecciones/l/lalo-lupa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Loli usa la pala.", foto: "img/lecciones/l/loli-pala.jpg", ancha: true, rel: "16 / 9" },
      { texto: "papá sale a la loma.", foto: "img/lecciones/l/papa-loma.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Lupe se asoma a la loma.", foto: "img/lecciones/l/lupe-loma.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-l", "silabas-l", "frases-l"] },

  /* La n cierra la primera serie de la cartilla: m, p, s, l, n. Y trae un
     regalo: con ella el nombre de Nelson ya se puede leer entero. */
  { id: "n", letra: "n", mayuscula: "N", orden: 5,
    banda: "#fdeedd", tinta: "#c06a33",
    comoSuena: "El aire sale por la nariz con la lengua pegada arriba: nnn. Se estira como la m.",
    aviso: [
      "El nombre de la letra es «ene», pero al leer no se dice: «ene-a» no da «na». Se hace el " +
      "sonido largo y se cae en la vocal: nnnna. De las fáciles, como la m, la s y la l.",
      "Ojo con la m y la n, que se confunden por partida doble: suenan parecido (las dos salen " +
      "por la nariz) y se escriben parecido — la n es la m con un puente menos. Vale la pena " +
      "ponerlas juntas y decir «mano» y «mamo» para que oiga la diferencia.",
      "Entre las palabras nuevas está «Nelson». Es la primera vez que aparece una mayúscula en " +
      "todo el sitio, y es a propósito: los nombres de las personas se escriben así. Vale más " +
      "explicarlo con el nombre del hermano que con una regla."
    ],
    palabra: "nene",
    foto: "img/lecciones/n/nene.jpg",
    notaSilabas: "Van en el orden de la cartilla: ne, ni, na, nu, no. En desorden a propósito.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["ne", "ni", "na", "nu", "no"],
    palabras: ["nena", "pino", "maní", "nulo", "mano", "pepino",
               "pena", "mina", "enano", "luna", "molino", "lana",
               "uno", "melena"],
    tarjetas: [
      { palabra: "mono", foto: "img/lecciones/n/mono.jpg" },
      { palabra: "luna", foto: "img/lecciones/n/luna.jpg" },
      { palabra: "pino", foto: "img/lecciones/n/pino.jpg" },
      /* el 1 está hecho aquí en Quicksand: la imagen que vino era la
         carátula de un disco, como en las palabras de la u */
      { palabra: "uno", foto: "img/lecciones/n/uno.jpg" },
      { palabra: "Nelson", foto: "img/lecciones/n/nelson.jpg" }
    ],
    frases: [
      { texto: "esa nena me anima.", foto: "img/lecciones/n/nena-anima.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la mona lame mi mano.", foto: "img/lecciones/n/mona-mano.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi mamá mima a su nene.", foto: "img/lecciones/n/mama-nene.jpg" },
      { texto: "mi papá no se apena.", foto: "img/lecciones/n/papa-apena.jpg" },
      { texto: "ese enano malo no me anima, ni sana mi mano.", foto: "img/lecciones/n/enano.jpg" }
    ],
    hojas: ["letra-n", "silabas-n", "frases-n"] },

  /* La t abre la segunda serie de la cartilla. Faltan tres tarjetas
     (pelota, moto y lata): las fotos que llegaron traían texto adentro. */
  { id: "t", letra: "t", mayuscula: "T", orden: 6,
    banda: "#dff1f4", tinta: "#2f7f8c",
    comoSuena: "La lengua pega en los dientes de arriba y suelta un golpecito: t. No se puede estirar.",
    aviso: [
      "Esta es como la p: un golpe seco, no se sostiene. Si intenta alargarla le sale «te», y ese " +
      "«e» de sobra le estorba para juntar. Un golpecito y de una a la vocal.",
      "Ojo con la t y la p juntas: las dos son golpe seco y las dos se confunden al oído. " +
      "«tapa» y «papa» se diferencian en una sola letra, y las dos están en esta página.",
      "La t es la primera letra con dos trazos desde la i: primero el palito con su gancho, " +
      "después la rayita que lo cruza. El orden importa, y la hoja lo marca con el 1 y el 2.",
      "Y hay premio: con la t, «Antonio» ya se lee entero — a, n, t, o, n, i, o. Con la n se " +
      "pudo leer «Nelson». Al de Chepe todavía le falta la ch, pero «Pepe» ya está en la " +
      "lección de la p. Vale la pena señalarlo: leer el nombre de un hermano pesa más que " +
      "cualquier palabra de la lista."
    ],
    palabra: "tomate",
    foto: "img/lecciones/t/tomate.jpg",
    notaSilabas: "Van en el orden de la cartilla: to, ti, ta, te, tu. En desorden a propósito.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["to", "ti", "ta", "te", "tu"],
    palabras: ["tomate", "moto", "pelota", "tela", "mata", "pato",
               "tina", "pito", "maleta", "tapa", "nata", "tuna", "lata"],
    tarjetas: [
      { palabra: "mata", foto: "img/lecciones/t/mata.jpg" },
      /* La pelota y la lata salvadas a punta de recorte: la foto del balón
         dice «Tango / River Plate» abajo a la izquierda y la de la lata trae
         etiqueta, pero en las dos hay un lado sin una sola letra impresa. */
      { palabra: "pelota", foto: "img/lecciones/t/pelota.jpg" },
      { palabra: "pato", foto: "img/lecciones/t/pato.jpg" },
      { palabra: "maleta", foto: "img/lecciones/t/maleta.jpg" },
      { palabra: "tela", foto: "img/lecciones/t/tela.jpg" },
      { palabra: "lata", foto: "img/lecciones/t/lata.jpg" },
      /* La moto entra con sus letreros y todo. Es la única imagen del
         sitio con texto adentro: la foto es libre y la decisión es del
         padre. No se pudo recortar sin partir la moto. */
      { palabra: "moto", foto: "img/lecciones/t/moto.jpg" },
      /* Con la t, «Antonio» ya se lee entero: a, n, t, o, n, i, o.
         Lo cazó el padre. Va de última, como Nelson en la n. */
      { palabra: "Antonio", foto: "img/lecciones/t/antonio.jpg" }
    ],
    frases: [
      { texto: "mi nene toma su sopa.", foto: "img/lecciones/t/nene-sopa.jpg", completa: true, rel: "5 / 2" },
      { texto: "tu nena tapa la tina.", foto: "img/lecciones/t/nena-tina.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi pato no teme a ese mono.", foto: "img/lecciones/t/pato-mono.jpg", ancha: true, rel: "16 / 9" },
      { texto: "su moto sí pita.", foto: "img/lecciones/t/moto-pita.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mamita, mamita, ese pato me toma el tomate.", foto: "img/lecciones/t/mamita-tomate.jpg", ancha: true, rel: "16 / 9" },
      /* la de la cartilla. A la imagen se le borró un globo que decía
         «Mooom!»: máscara pegada a las letras e inpaint de OpenCV. */
      { texto: "mamita, mamita, ese pato me pisa la tela.", foto: "img/lecciones/t/mamita-tela.jpg", completa: true, rel: "5 / 2" }
    ],
    hojas: ["letra-t", "silabas-t", "frases-t"] },

  /* La d es la a con el palito largo: misma panza, mismo giro. Por eso
     su ficha reusa el trazo de la vocal a y solo le estira el palito. */
  { id: "d", letra: "d", mayuscula: "D", orden: 7,
    banda: "#fbe4dd", tinta: "#b5563a",
    comoSuena: "La lengua toca los dientes de arriba y suelta la voz: d. Es la t, pero con la voz puesta.",
    aviso: [
      "El nombre de la letra es «de», pero al leer no se dice: «de-a» no da «da». Es un golpecito " +
      "corto, como la p y la t, y de una se cae en la vocal.",
      "Diga «nada» y «nata» seguidas, despacio. La lengua va al mismo sitio en las dos; lo único " +
      "que cambia es que en la d suena la voz y en la t no. Las dos palabras están en estas " +
      "páginas: «nata» en la lección de la t y «nada» acá.",
      "Mire la forma: la d es la a con el palito largo. Misma rueda, mismo giro, " +
      "y el palito sube hasta donde sube el de la l. Vale la pena escribir «a» y «d» una al lado " +
      "de la otra para que lo vea."
    ],
    palabra: "dado",
    foto: "img/lecciones/d/dado.jpg",
    notaSilabas: "Van en el orden de la cartilla: da, di, do, du, de. En desorden a propósito.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["da", "di", "do", "du", "de"],
    palabras: ["dama", "seda", "todo", "nada", "duda", "mudo",
               "pomada", "soda", "dime", "lado", "moneda", "pide",
               "medida"],
    tarjetas: [
      { palabra: "dedo", foto: "img/lecciones/d/dedo.jpg" },
      { palabra: "nudo", foto: "img/lecciones/d/nudo.jpg" },
      { palabra: "nido", foto: "img/lecciones/d/nido.jpg" }
    ],
    frases: [
      { texto: "mi papá pide su soda.", foto: "img/lecciones/d/papa-soda.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi papá pone la pomada.", foto: "img/lecciones/d/papa-pomada.jpg", ancha: true, rel: "16 / 9" },
      { texto: "tu pato nada de lado.", foto: "img/lecciones/d/pato-lado.jpg", completa: true, rel: "5 / 2" },
      { texto: "la paloma tapa su nido.", foto: "img/lecciones/d/paloma-nido.jpg", ancha: true, rel: "16 / 9" },
      { texto: "esa dama me saluda.", foto: "img/lecciones/d/dama-saluda.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi papá toma las monedas de la mesa.", foto: "img/lecciones/d/papa-monedas.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi papá suda si usa su pala toda la semana.", foto: "img/lecciones/d/papa-suda.jpg", ancha: true, rel: "16 / 9" },
      /* de la otra fuente. Loli y Dalila con mayúscula. Al dibujo de Loli
         se le borraron tres «Cuentos» de los libros del estante. */
      { texto: "Loli se puso dudosa.", foto: "img/lecciones/d/loli-dudosa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Dalila mide la seda.", foto: "img/lecciones/d/dalila-seda.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mamá puso pomada a mi dedo.", foto: "img/lecciones/d/pomada-dedo.jpg", completa: true, rel: "5 / 2" }
    ],
    hojas: ["letra-d", "silabas-d", "frases-d"] },

  /* La r va en dos lecciones, como en la cartilla, porque son dos sonidos
     distintos con la misma letra. Esta es la suave, la de «toro». Llevan
     el mismo color, uno claro y el otro fuerte: son hermanas. */

  { id: "r", letra: "r", mayuscula: "R", orden: 8,
    banda: "#fdf1d8", tinta: "#b5832a",
    comoSuena: "La punta de la lengua da un solo golpecito arribita de los dientes: r. Un toque, no un temblor.",
    aviso: [
      "Esta letra tiene dos sonidos, y esta lección es el suave: el de «toro», «pera», «arena». " +
      "Suena así cuando la r queda en la mitad de la palabra, entre dos vocales. El fuerte —el de " +
      "«rosa» y «perro»— es la lección que sigue.",

      "Una advertencia práctica, y es la más importante de esta página: «ro» dicha sola siempre " +
      "suena fuerte. No hay manera de decirla suave por aparte. Por eso esta letra se aprende " +
      "dentro de la palabra: apóyese en la lista de palabras y en las frases, no en el silabario. " +
      "Si el niño toca una sílaba y suena fuerte, no está mal: es que suelta no puede sonar de otra forma.",

      "Para escribirla: es la n empezada y dejada a medias. Baja el palito, sube por encima de lo " +
      "mismo y en vez de bajar otra vez, se queda en la curvita. Vale la pena escribir «n» y «r» " +
      "una al lado de la otra para que lo vea."
    ],
    palabra: "toro", foto: "img/lecciones/r/toro.jpg",
    notaSilabas: "Van en el orden de la cartilla: ro, re, ra, ru, ri. Acuérdese de lo del aviso: sueltas suenan fuertes.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["ro", "re", "ra", "ru", "ri"],
    palabras: ["toro","salero","mora","muro","mariposa","torero","arena","madera","pera","loro","arete","marino"],
    tarjetas: [
      { palabra: "aro", foto: "img/lecciones/r/aro.jpg" },
      { palabra: "tetero", foto: "img/lecciones/r/tetero.jpg" },
      { palabra: "loro", foto: "img/lecciones/r/loro.jpg" },
      { palabra: "arepa", foto: "img/lecciones/r/arepa.jpg" }
    ],
    frases: [
      { texto: "ese toro me mira.", foto: "img/lecciones/r/toro-mira.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi nena toma tetero.", foto: "img/lecciones/r/nena-tetero.jpg", ancha: true, rel: "16 / 9" },
      { texto: "dame una pera madura.", foto: "img/lecciones/r/pera-madura.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la mesa era de madera dura.", foto: "img/lecciones/r/mesa-madera.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese loro tiene una pera madura.", foto: "img/lecciones/r/loro-pera.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi torito sale a la arena, no teme a ese torero.", foto: "img/lecciones/r/torito-arena.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-r", "silabas-r", "frases-r"] },

  /* La r fuerte. `marca` le dice a la lección que la letra de la semana se
     escribe de dos formas: «rr» en la mitad y «r» al principio. Así «perro»
     colorea «rro» entero y no «r» + «ro». */

  { id: "rr", letra: "rr", mayuscula: "RR", orden: 9,
    marca: ["rr", "r"],
    banda: "#f6e2bc", tinta: "#8a5a12",
    comoSuena: "La punta de la lengua tiembla contra el paladar: rrr. Mismo sitio que la r suave, pero en vez de un golpecito son varios seguidos.",
    aviso: [
      "Es la misma letra de la semana pasada con el otro sonido. Lo que decide cuál suena es " +
      "dónde está parada: al principio de la palabra, una sola r ya suena fuerte («rosa», «rana», " +
      "«ropa»). En la mitad, entre dos vocales, hay que escribir dos («perro», «torre»), porque con " +
      "una sola sonaría suave.",

      "Diga «pero» y «perro» seguidas, despacio. Es la misma boca, en el mismo sitio; lo único que " +
      "cambia es que en una la lengua da un golpe y en la otra tiembla. Y cambia la palabra entera: " +
      "es de las pocas veces en que una letra de más o de menos dice otra cosa.",

      "Para la mano no hay nada nuevo: son dos r iguales, pegaditas. Lo único que hay que cuidar es " +
      "que no se monten la una sobre la otra."
    ],
    palabra: "rosa", foto: "img/lecciones/rr/rosa.jpg",
    notaSilabas: "Son las mismas cinco de la semana pasada, y es a propósito: se escriben igual y suenan distinto. Acá van en el orden de la cartilla: ro, ri, re, ru, ra.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["ro", "ri", "re", "ru", "ra"],
    palabras: ["rosa","rata","perro","rana","roto","torre","remo","ruleta","risa","ropa","rama","perrera"],
    tarjetas: [
      { palabra: "rana", foto: "img/lecciones/rr/rana.jpg" },
      { palabra: "perro", foto: "img/lecciones/rr/perro.jpg" },
      { palabra: "rata", foto: "img/lecciones/rr/rata.jpg" },
      { palabra: "torre", foto: "img/lecciones/rr/torre.jpg" },
      { palabra: "remo", foto: "img/lecciones/rr/remo.jpg" },
      { palabra: "ropa", foto: "img/lecciones/rr/ropa.jpg" }
    ],
    frases: [
      { texto: "ese perro sale de su perrera.", foto: "img/lecciones/rr/perro-perrera.jpg", ancha: true, rel: "16 / 9" },
      { texto: "me da risa esa rana.", foto: "img/lecciones/rr/rana-risa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "dale ese remo a mamá.", foto: "img/lecciones/rr/remo-mama.jpg" },
      { texto: "mi papá rema rápido.", foto: "img/lecciones/rr/papa-rema.jpg" },
      { texto: "ese perrito saluda a su amo.", foto: "img/lecciones/rr/perro-amo.jpg" }
    ],
    hojas: ["letra-rr", "silabas-rr", "frases-rr"] },

  /* La c solo con a, o, u. El ce y el ci son otra lección, bastante más
     adelante, y por eso en esta página no puede aparecer ni una palabra con
     «ce» ni con «ci» — ni cena, ni cine, ni cocina. Verificado con script. */

  { id: "c", letra: "c", mayuscula: "C", orden: 10,
    banda: "#f5e3e7", tinta: "#8c3b55",
    comoSuena: "La parte de atrás de la lengua toca el techo de la boca, bien atrás, y suelta el aire de golpe: c. No se estira, como la p y la t.",
    aviso: [
      "Acá hay una trampa que conviene ver de una: el nombre de la letra es «ce», y ese nombre " +
      "trae justamente el sonido que esta lección NO enseña. Si uno dice «ce-a» no sale «ca». " +
      "Con la a, la o y la u la c es un golpe seco en la garganta: ca, co, cu.",

      "Y es solo eso: ca, co, cu. Con la e y la i la misma letra suena distinto, y esa es otra " +
      "lección, bastante más adelante. Por eso en esta página no va a encontrar ni una palabra con " +
      "«ce» ni con «ci»: ni cena, ni cine, ni cocina. Si el niño pregunta, la respuesta honesta es " +
      "«esa todavía no la hemos visto».",

      "Para escribirla: es la o sin cerrar. Misma rueda, mismo giro hacia la izquierda, pero se " +
      "para antes de volver al punto de salida. Vale la pena escribir «c» y «o» una al lado de la " +
      "otra para que lo vea."
    ],
    palabra: "casa", foto: "img/lecciones/c/casa.jpg",
    notaSilabas: "Solo son tres, no cinco. Con la e y la i la c suena distinto, y eso viene después.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["ca", "co", "cu"],
    palabras: ["casa","copa","pico","cono","camisa","saco","cuna","corona","loco","cara","capa","rico","cola"],
    tarjetas: [
      { palabra: "carro", foto: "img/lecciones/c/carro.jpg" },
      { palabra: "copa", foto: "img/lecciones/c/copa.jpg" },
      { palabra: "cuna", foto: "img/lecciones/c/cuna.jpg" },
      { palabra: "cono", foto: "img/lecciones/c/cono.jpg" },
      { palabra: "camisa", foto: "img/lecciones/c/camisa.jpg" },
      { palabra: "carreta", foto: "img/lecciones/c/carreta.jpg" }
    ],
    frases: [
      { texto: "la mula tira de la carreta.", foto: "img/lecciones/c/mula-carreta.jpg", completa: true, rel: "5 / 2" },
      { texto: "mi mamá cose mi camisa rota.", foto: "img/lecciones/c/mama-camisa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "tu perro corre a mi lado.", foto: "img/lecciones/c/perro-corre.jpg", ancha: true, rel: "16 / 9" },
      { texto: "dame ese caramelo de coco.", foto: "img/lecciones/c/caramelo-coco.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese médico cura mi cara.", foto: "img/lecciones/c/medico-cara.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi lorito me remeda, me pide rico cacao, me da su patica cada ratico.", foto: "img/lecciones/c/lorito-cacao.jpg", completa: true, rel: "5 / 2" }
    ],
    hojas: ["letra-c", "silabas-c", "frases-c"] },

  /* La ñ. El id va sin ñ («enie») porque se vuelve nombre de archivo y
     dirección: `pdf/plana-enie-1.pdf`, `letra.html?letra=enie`. La letra que
     se ve en pantalla sí es ñ. */

  { id: "enie", letra: "ñ", mayuscula: "Ñ", orden: 11,
    banda: "#e9eedc", tinta: "#5f7334",
    comoSuena: "La lengua se aplasta contra el techo de la boca y el aire sale por la nariz: ññññ. Es la n, pero con la lengua más ancha y más atrás.",
    aviso: [
      "Esta es fácil y conviene decir por qué: es la única letra que no tiene trampa. No cambia de " +
      "sonido según la vocal que venga detrás, como la c o la g; no suena de dos maneras, como la r; " +
      "y se escribe de una sola forma. Suena siempre igual: ña, ñi, ñu, ñe, ño.",

      "Lo que sí vale la pena señalar es el gorrito. «Mono» y «moño» son dos palabras distintas, y " +
      "lo único que las separa es esa onda de encima. Dígalas seguidas y señale la ñ con el dedo: " +
      "es la primera vez que un detalle tan chiquito cambia la palabra entera. Lo mismo con «una» y " +
      "«uña», que están las dos en estas páginas.",

      "Para escribirla: es la n de siempre y encima el gorrito, que va de izquierda a derecha como " +
      "una ola chiquita. Son dos trazos, y el gorrito es el segundo — primero se termina la letra y " +
      "después se le pone el sombrero, nunca al revés.",

      "Y hay premio: con la ñ ya se lee «Toño», como le dicen a Antonio — t, o, ñ, o. Va con " +
      "mayúscula porque es el nombre de una persona, igual que Nelson y Antonio."
    ],
    palabra: "niña", foto: "img/lecciones/enie/nina.jpg",
    notaSilabas: "Van en el orden de la cartilla. Todas llevan gorrito: no hay ninguna ñ sin él.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["ña", "ñi", "ñu", "ñe", "ño"],
    palabras: ["niña","niño","uña","año","moño","paño","leña","caña",
               "señora","mañana","piña","muñeca"],
    tarjetas: [
      { palabra: "muñeca", foto: "img/lecciones/enie/muneca.jpg" },
      { palabra: "araña", foto: "img/lecciones/enie/arana.jpg" },
      { palabra: "puño", foto: "img/lecciones/enie/puno.jpg" },
      /* «Toño» es como le dicen a Antonio: t, o, ñ, o, todo ya visto. Va de
         última, como Nelson en la n y Antonio en la t, y con la misma foto. */
      { palabra: "Toño", foto: "img/lecciones/t/antonio.jpg" }
    ],
    frases: [
      { texto: "mira mi saco de paño.", foto: "img/lecciones/enie/saco-pano.jpg", completa: true, rel: "5 / 2" },
      { texto: "la araña corre a la rama.", foto: "img/lecciones/enie/arana-rama.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la niña adora a su muñeca.", foto: "img/lecciones/enie/nina-muneca.jpg", ancha: true, rel: "16 / 9" },
      { texto: "no dañe mi moño de seda.", foto: "img/lecciones/enie/mono-seda.jpg", ancha: true, rel: "16 / 9" },
      { texto: "esa señora pone un moño a mi muñeca cada mañana.", foto: "img/lecciones/enie/senora-mono.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-enie", "silabas-enie", "frases-enie"] },

  /* La v. Las frases son las cinco de la cartilla, la rima de la uva y tres
     que pidió el padre: «corre, pavito, dame tu cola», «ese niño toma avena»
     y la rima con «jugo». Nueve frases: 3+3 / 3+3 / 2+2+2 / 3+3.
     Esa última lleva j, que llega mucho después: es la única frase del sitio
     fuera de las letras vistas, y está a propósito (decisión del padre, como
     la moto de la t). El script de verificación la deja pasar por nombre. */

  { id: "v", letra: "v", mayuscula: "V", orden: 12,
    banda: "#ece8f7", tinta: "#5b4a96",
    comoSuena: "Los labios se tocan apenas y la voz pasa entre ellos, suavecita: vvvv. En español suena igual que la b.",
    aviso: [
      "La trampa de la v no está en el sonido sino en la ortografía: en español la v y la b " +
      "suenan exactamente igual. No hay que enseñarle a morderse el labio de abajo — eso es del " +
      "inglés, y aquí nadie lo dice así. Cuando llegue la b, que es la siguiente, el niño va a " +
      "preguntar cómo se sabe cuál va. La respuesta honesta es «hay que acordarse de cómo se " +
      "escribe la palabra», y para eso sirve leer mucho.",

      "Para escribirla: un solo trazo, sin levantar el dedo. Baja inclinada hacia la derecha, " +
      "hace la punta abajo y sube igual del otro lado. Vale la pena escribir «u» y «v» una al " +
      "lado de la otra: la u es redonda abajo y lleva palito; la v termina en punta y no lo lleva.",

      "Una frase trae «jugo», y la j todavía no se ha visto. Está a propósito: cuando llegue a esa " +
      "palabra, léasela usted sin detenerse. Es la única palabra de la página con una letra nueva."
    ],
    palabra: "vaca", foto: "img/lecciones/v/vaca.jpg",
    notaSilabas: "Van en el orden de la cartilla. Suenan igual que las de la b, que viene después.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["va", "vu", "ve", "vo", "vi"],
    palabras: ["vaca","vino","vaso","vela","pavo","nave","uva","avena",
               "vara","venado","vida","verano"],
    tarjetas: [
      { palabra: "vela", foto: "img/lecciones/v/vela.jpg" },
      { palabra: "uva", foto: "img/lecciones/v/uva.jpg" },
      { palabra: "vino", foto: "img/lecciones/v/vino.jpg" },
      { palabra: "vaso", foto: "img/lecciones/v/vaso.jpg" },
      { palabra: "venado", foto: "img/lecciones/v/venado.jpg" }
    ],
    frases: [
      { texto: "la señorita visita mi casa.", foto: "img/lecciones/v/senorita-casa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi mamá lava la ropa.", foto: "img/lecciones/v/mama-ropa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "corre, pavito, come tu avena.", foto: "img/lecciones/v/pavito-avena.jpg", ancha: true, rel: "16 / 9" },
      { texto: "corre, pavito, dame tu cola.", foto: "img/lecciones/v/pavito-cola.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese niño toma avena.", foto: "img/lecciones/v/nino-avena.jpg" },
      { texto: "ese niño no toma vino.", foto: "img/lecciones/v/nino-vino.jpg" },
      { texto: "la vela ilumina la sala.", foto: "img/lecciones/v/vela-sala.jpg" },
      { texto: "uva moradita, uvita de verano, dame tu vino, anima mi vida.", foto: "img/lecciones/v/uva-vino.jpg", ancha: true, rel: "16 / 9" },
      { texto: "uva moradita, uvita de verano, dame tu jugo, anima mi vida.", foto: "img/lecciones/v/uva-jugo.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-v", "silabas-v", "frases-v"] },

  /* La b. Mismo color que la v pero más fuerte, como la r y la rr: no son
     la misma letra, pero suenan igual y conviene que se vean parientes.
     La foto del tabaco trae «ROMEO Y JULIETA» y entra así por decisión del
     padre (como la moto de la t). */

  { id: "b", letra: "b", mayuscula: "B", orden: 13,
    banda: "#e1dbf2", tinta: "#46357d",
    comoSuena: "Los labios se juntan y se sueltan: b. Suena exactamente igual que la v.",
    aviso: [
      "La b y la v suenan igual. Dígalo así, sin rodeos: «esta suena igual que la de la vaca». Si " +
      "el niño escribe «vurro» o «bela», no está oyendo mal — está oyendo bien, y la diferencia es " +
      "solo de cómo se escribe cada palabra. Eso se aprende leyendo, no corrigiendo.",

      "La trampa de verdad de la b es otra: es la d al revés, y la p de cabeza. Las tres son un " +
      "palito y una barriga, y lo único que cambia es de qué lado va cada cosa. Para la b: primero " +
      "el palito, bien alto, y la barriga va adelante, hacia la derecha. En la d es al revés: " +
      "primero la barriga y el palito después.",

      "Para escribirla: un solo trazo. Baja el palito desde arriba, sube por el mismo camino hasta " +
      "la mitad y desde ahí da la vuelta a la barriga hacia la derecha, hasta volver al palito."
    ],
    palabra: "burro", foto: "img/lecciones/b/burro.jpg",
    notaSilabas: "Van en el orden de la cartilla. Suenan igual que las de la v.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["bu", "bo", "be", "bi", "ba"],
    palabras: ["beso","boca","bata","barro","nube","cubo","burro","lobo",
               "bota","bate","baño","bola","tabaco"],
    tarjetas: [
      { palabra: "bota", foto: "img/lecciones/b/bota.jpg" },
      { palabra: "lobo", foto: "img/lecciones/b/lobo.jpg" },
      { palabra: "bola", foto: "img/lecciones/b/bola.jpg" },
      { palabra: "bata", foto: "img/lecciones/b/bata.jpg" },
      { palabra: "boca", foto: "img/lecciones/b/boca.jpg" },
      { palabra: "tabaco", foto: "img/lecciones/b/tabaco.jpg" }
    ],
    frases: [
      { texto: "mi burro no sabe nada.", foto: "img/lecciones/b/burro-nada.jpg" },
      { texto: "una niña barre la basura.", foto: "img/lecciones/b/nina-basura.jpg" },
      { texto: "ese bobito no come banano.", foto: "img/lecciones/b/bobito-banano.jpg" },
      { texto: "ese lobo dañó mi bata.", foto: "img/lecciones/b/lobo-bata.jpg", ancha: true, rel: "16 / 9" },
      { texto: "sube, sube a esa nube. sacude tu cola de tela bonita.", foto: "img/lecciones/b/sube-nube.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-b", "silabas-b", "frases-b"] },

  /* La g solo con a, o, u — como la c. El ge y el gi suenan como la j y son
     otra lección; gue y gui, otra más. Por eso en esta página no puede
     aparecer ni una palabra con «ge» ni con «gi». Verificado con script. */

  { id: "g", letra: "g", mayuscula: "G", orden: 14,
    banda: "#f3e9dc", tinta: "#7a5230",
    comoSuena: "La parte de atrás de la lengua toca el techo de la boca, bien atrás, como en la c, pero con voz: g. Es la c suavecita.",
    aviso: [
      "Es la misma trampa de la c, y conviene verla de una: el nombre de la letra es «ge», y ese " +
      "nombre trae justamente el sonido que esta lección NO enseña. Con la a, la o y la u la g " +
      "suena suave, en la garganta: ga, go, gu. Dígala al lado de la c — «ca, ga», «co, go» — y " +
      "el niño va a oír que es el mismo lugar de la boca, solo que con voz.",

      "Y es solo eso: ga, go, gu. Con la e y la i la misma letra suena como la j (gente, girasol), " +
      "y esa es otra lección. Por eso en esta página no va a encontrar ni una palabra con «ge» ni " +
      "con «gi». Si el niño pregunta, la respuesta honesta es «esa todavía no la hemos visto».",

      "Para escribirla: es la a con el palito largo. La rueda es igual, y el palito, en vez de " +
      "quedarse en el renglón, baja por debajo y se dobla hacia atrás como un anzuelo. Vale la " +
      "pena escribir «a» y «g» una al lado de la otra para que lo vea."
    ],
    palabra: "gato", foto: "img/lecciones/g/gato.jpg",
    notaSilabas: "Solo son tres, no cinco. Con la e y la i la g suena distinto, y eso viene después.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["ga", "go", "gu"],
    palabras: ["gato","goma","gusano","garra","soga","lago","mago","pega",
               "amigo","gotera","laguna","regalo"],
    tarjetas: [
      { palabra: "gusano", foto: "img/lecciones/g/gusano.jpg" },
      { palabra: "soga", foto: "img/lecciones/g/soga.jpg" },
      { palabra: "lago", foto: "img/lecciones/g/lago.jpg" }
    ],
    frases: [
      { texto: "esa goma sí pega.", foto: "img/lecciones/g/goma-pega.jpg" },
      { texto: "tu amigo me regala su gato.", foto: "img/lecciones/g/amigo-gato.jpg" },
      { texto: "papá mata ese gusano malo.", foto: "img/lecciones/g/papa-gusano.jpg" },
      { texto: "mi burrito bebe gota a gota.", foto: "img/lecciones/g/burrito-gota.jpg", ancha: true, rel: "16 / 9" },
      { texto: "sube, agarra esa soga.", foto: "img/lecciones/g/sube-soga.jpg", ancha: true, rel: "16 / 9" },
      { texto: "papá es un mago.", foto: "img/lecciones/g/papa-mago.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la gata golosa se sube a la soga, derrama mi goma.", foto: "img/lecciones/g/gata-golosa.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-g", "silabas-g", "frases-g"] },

  /* La y, solo como consonante: ya, yo, yu, ye, yi. La «y» sola (la de
     «papá y mamá»), que suena i, no aparece en esta página. La forma es la
     de Quicksand —la u con colita—, no la de palitos rectos de la cartilla. */

  { id: "y", letra: "y", mayuscula: "Y", orden: 15,
    banda: "#fbf3c8", tinta: "#8a6d0b",
    comoSuena: "La lengua se pega al techo de la boca, sin cerrar del todo, y la voz pasa por los lados: yyyy. Como al empezar a decir «yo».",
    aviso: [
      "En Colombia «ya», «yo» y «yema» se dicen igual que si llevaran ll, y está bien: así " +
      "habla la casa. Cuando llegue la ll, el niño va a oír que suenan igual, como la b y la v, " +
      "y la respuesta va a ser la misma: hay que acordarse de cómo se escribe cada palabra.",

      "La y sola, la de «papá y mamá», suena i. Esa no está en esta página a propósito: aquí la " +
      "y siempre va pegada a una vocal. Si el niño la ve suelta en un libro, basta decirle " +
      "«cuando va solita, suena i».",

      "Para escribirla: es la u con colita. La primera parte es la u de siempre; el segundo " +
      "palito, en vez de pararse en el renglón, baja por debajo y se dobla hacia atrás, como el de " +
      "la g. Ojo: en la cartilla la y está hecha de dos palitos rectos. Acá va como la de la " +
      "letra de la pantalla, para que la que lee y la que escribe sean la misma."
    ],
    palabra: "yate", foto: "img/lecciones/y/yate.jpg",
    notaSilabas: "Van en el orden de la cartilla.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["ya", "yi", "yo", "yu", "ye"],
    palabras: ["yate","yuca","yeso","yodo","rayo","mayo","raya","ayuno",
               "payaso","yola","arroyo","soya"],
    tarjetas: [
      { palabra: "yema", foto: "img/lecciones/y/yema.jpg" },
      { palabra: "rayo", foto: "img/lecciones/y/rayo.jpg" },
      { palabra: "payaso", foto: "img/lecciones/y/payaso.jpg" }
    ],
    frases: [
      { texto: "ya cayó ese rayo.", foto: "img/lecciones/y/cayo-rayo.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi yoyo ya sube.", foto: "img/lecciones/y/yoyo-sube.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese yate va a la laguna.", foto: "img/lecciones/y/yate-laguna.jpg", ancha: true, rel: "16 / 9" },
      { texto: "yo me como la yema.", foto: "img/lecciones/y/como-yema.jpg", ancha: true, rel: "16 / 9" },
      { texto: "tu niño no raya la mesa.", foto: "img/lecciones/y/nino-raya.jpg", ancha: true, rel: "16 / 9" },
      { texto: "una semana de mayo yo vi ese payaso con su cara de yeso.", foto: "img/lecciones/y/payaso-mayo.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-y", "silabas-y", "frases-y"] },

  /* La f. Palabras y frases de la edición del padre (la del PDF trae otras):
     ahí están «rifa» y «se rifa una foca», que es la frase de la plana.
     Él sumó «foto» y «fama» a la lista y «mira la foca del faro». */

  { id: "f", letra: "f", mayuscula: "F", orden: 16,
    banda: "#e2f0ea", tinta: "#2e6b55",
    comoSuena: "Los dientes de arriba se apoyan en el labio de abajo y el aire sale soplando, sin voz: ffff. Como cuando se enfría la sopa.",
    aviso: [
      "Esta es fácil de oír y fácil de estirar, como la m y la s: ffff. Lo que conviene mostrar es " +
      "dónde va la boca — los dientes de arriba tocan el labio de abajo —, porque el niño lo puede " +
      "ver en su cara frente a un espejo. Y no tiene trampa: suena igual con todas las vocales.",

      "En la última frase aparece la «y» suelta: «una foto de ese faro y de la foca». Es la de la " +
      "lección anterior, la que cuando va solita suena i. Si el niño se detiene ahí, basta con " +
      "recordárselo.",

      "Para escribirla: dos trazos, como la t. Primero el bastón con el gancho arriba, que empieza " +
      "a la derecha, se curva y baja derecho hasta el renglón. Después la rayita, de izquierda a " +
      "derecha. Vale la pena escribir «t» y «f» juntas: la t tiene el gancho abajo; la f, arriba."
    ],
    palabra: "faro", foto: "img/lecciones/f/faro.jpg",
    notaSilabas: "Van en el orden de la cartilla.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["fa", "fi", "fe", "fu", "fo"],
    palabras: ["faro","foca","fuga","foco","café","sofá","fila","rifa",
               "teléfono","foto","fama"],
    tarjetas: [
      { palabra: "foco", foto: "img/lecciones/f/foco.jpg" },
      { palabra: "sofá", foto: "img/lecciones/f/sofa.jpg" },
      { palabra: "foca", foto: "img/lecciones/f/foca.jpg" }
    ],
    frases: [
      { texto: "oye, repica tu teléfono.", foto: "img/lecciones/f/telefono.jpg", ancha: true, rel: "16 / 9" },
      { texto: "apaga ya ese foco.", foto: "img/lecciones/f/apaga-foco.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese sofá se ve bonito.", foto: "img/lecciones/f/sofa-bonito.jpg", ancha: true, rel: "16 / 9" },
      { texto: "se rifa una foca.", foto: "img/lecciones/f/rifa-foca.jpg", ancha: true, rel: "16 / 9" },
      { texto: "papá afila su pala.", foto: "img/lecciones/f/papa-pala.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mira la foca del faro.", foto: "img/lecciones/f/foca-faro.jpg", ancha: true, rel: "16 / 9" },
      { texto: "saca tu cámara fina y toma una foto de ese faro y de la foca.", foto: "img/lecciones/f/camara-foto.jpg", completa: true, rel: "5 / 2" }
    ],
    hojas: ["letra-f", "silabas-f", "frases-f"] },

  /* La h no suena. Palabras y frases de la edición del padre, más «hipo»,
     «hipopótamo» y «Felipe cuida su hamaca», que pidió él. Felipe y Hugo
     van con mayúscula: son nombres. */

  { id: "h", letra: "h", mayuscula: "H", orden: 17,
    banda: "#f1e4f0", tinta: "#7d3f78",
    comoSuena: "No suena. La boca no hace nada: «hilo» se dice igual que si dijera «ilo». La h se escribe y se calla.",
    aviso: [
      "Esta es la primera letra que no suena, y conviene decirlo así, sin rodeos: «esta se queda " +
      "callada». En «hilo», «humo» o «helado» se oye solo la vocal que viene después. Por eso, si el " +
      "niño toca «ha» en la pantalla y oye «a», está bien: así es.",

      "Lo difícil no es leerla, es escribirla: como no se oye, no hay forma de saber de oído que va. " +
      "Pasa lo mismo que con la b y la v: hay que acordarse de cómo se escribe cada palabra. Fíjese " +
      "en «ahorra» y «ahora»: la h va en medio, también callada.",

      "En las frases aparecen «Felipe» y «Hugo», con mayúscula porque son nombres, como Nelson y " +
      "Antonio. La de Hugo es una H mayúscula: la misma letra, más grande.",

      "Para escribirla: es la n con el palito largo. Empieza arriba, como la l, baja hasta el " +
      "renglón, sube por el mismo camino hasta la mitad y hace el puente de la n. Un solo trazo."
    ],
    palabra: "hilo", foto: "img/lecciones/h/hilo.jpg",
    notaSilabas: "Van en el orden de la cartilla. Suenan como las vocales solas: la h no se oye.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["hi", "ha", "hu", "ho", "he"],
    palabras: ["hilo","humo","hora","haba","helado","herida","hada","hamaca",
               "hábito","higo","herradura","hipo","hipopótamo"],
    tarjetas: [
      { palabra: "herido", foto: "img/lecciones/h/herido.jpg" },
      { palabra: "herradura", foto: "img/lecciones/h/herradura.jpg" },
      { palabra: "hamaca", foto: "img/lecciones/h/hamaca.jpg" }
    ],
    frases: [
      { texto: "ya sanó mi herida.", foto: "img/lecciones/h/sano-herida.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Felipe rifa una hamaca de pita.", foto: "img/lecciones/h/felipe-rifa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Hugo ayuda a ese herido.", foto: "img/lecciones/h/hugo-herido.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese helado sabe rico.", foto: "img/lecciones/h/helado.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ahorra dinero ahora.", foto: "img/lecciones/h/ahorra.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Felipe cuida su hamaca.", foto: "img/lecciones/h/felipe-cuida.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ahora, mulita, te coloco la herradura y sanará tu herida.", foto: "img/lecciones/h/mulita.jpg", completa: true, rel: "5 / 2" }
    ],
    hojas: ["letra-h", "silabas-h", "frases-h"] },

  /* La j. Página híbrida del padre (la otra cartilla no traía la j). Sumó
     las tarjetas Jesús y teja y las palabras Jesús y hoja. Dos cambios
     míos, dichos: «casita» pasó a «casa» (la c con i viene después) y la
     tarjeta «jefe» quedó fuera (la foto era de un jefe de Estado real). */

  { id: "j", letra: "j", mayuscula: "J", orden: 18,
    banda: "#e2e8f3", tinta: "#3d5a8a",
    comoSuena: "El aire sale fuerte desde el fondo de la garganta, como cuando uno se ríe «jajaja»: jjjj.",
    aviso: [
      "La j suena igual con todas las vocales: ja, jo, ju, je, ji. No tiene trampa en la lectura. " +
      "La trampa viene después: la g con la e y con la i (gente, girasol) suena igual que la j, y " +
      "eso es otra lección. Por ahora, la que suena así es la j.",

      "Hay premio: con la j ya se puede leer entera la rima de la uva de la v, la que decía «dame " +
      "tu jugo». Vale la pena volver a esa página y leerla de nuevo, ahora sin ayuda.",

      "En las tarjetas está «Jesús», con mayúscula porque es un nombre. Y en la última frase " +
      "aparece la «y» sola, la que suena i.",

      "Para escribirla: es la i con colita. El palito baja más allá del renglón y se dobla hacia " +
      "atrás, como el de la g; el puntico va al final, igual que en la i."
    ],
    palabra: "hoja", foto: "img/lecciones/j/hoja.jpg",
    notaSilabas: "Van en el orden de la cartilla.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["ja", "ju", "ji", "jo", "je"],
    palabras: ["jarro","jugo","jirafa","jefe","joya","reja","paja","lujo",
               "teja","hijo","navaja","pájaro","oveja","oreja","aguja",
               "hoja","Jesús"],
    tarjetas: [
      { palabra: "jarro", foto: "img/lecciones/j/jarro.jpg" },
      { palabra: "jirafa", foto: "img/lecciones/j/jirafa.jpg" },
      { palabra: "ojo", foto: "img/lecciones/j/ojo.jpg" },
      { palabra: "navaja", foto: "img/lecciones/j/navaja.jpg" },
      { palabra: "pájaro", foto: "img/lecciones/j/pajaro.jpg" },
      { palabra: "joya", foto: "img/lecciones/j/joya.jpg" },
      { palabra: "teja", foto: "img/lecciones/j/teja.jpg" },
      { palabra: "conejo", foto: "img/lecciones/j/conejo.jpg" },
      { palabra: "abeja", foto: "img/lecciones/j/abeja.jpg" },
      { palabra: "Jesús", foto: "img/lecciones/j/jesus.jpg" },
      { palabra: "José", foto: "img/lecciones/ch/chepe.jpg" }
    ],
    frases: [
      { texto: "esa niña dibuja una jirafa.", foto: "img/lecciones/j/nina-jirafa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "bebe jugo de piña.", foto: "img/lecciones/j/jugo-pina.jpg", ancha: true, rel: "16 / 9" },
      { texto: "deja ese jarro de barro.", foto: "img/lecciones/j/jarro-barro.jpg", ancha: true, rel: "16 / 9" },
      { texto: "oveja, dame tu lana, yo la tejeré.", foto: "img/lecciones/j/oveja-lana.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mira una casa de teja roja y reja de madera.", foto: "img/lecciones/j/casa-teja.jpg", completa: true, rel: "5 / 2" }
    ],
    hojas: ["letra-j", "silabas-j", "frases-j"] },

  /* La z, solo con a, o, u: ze y zi casi no existen y ce/ci es otra
     lección. Página del padre, más pizarra, zapote, tenaza, naturaleza y
     dos frases suyas. José y Hugo con mayúscula: son nombres. */

  { id: "z", letra: "z", mayuscula: "Z", orden: 19,
    banda: "#e6f2df", tinta: "#4f7a2f",
    comoSuena: "En Colombia suena igual que la s: zzzz, como una s larga. En España la dicen con la lengua entre los dientes; aquí no.",
    aviso: [
      "La z suena igual que la s, y conviene decirlo así: «esta suena como la de sapo». Es la " +
      "misma trampa de la v y la b: no hay forma de saber de oído cuál va, hay que acordarse de " +
      "cómo se escribe cada palabra. No le enseñe a meter la lengua entre los dientes: así se " +
      "dice en España, no en la casa.",

      "Va solo con la a, la o y la u: za, zo, zu. Con la e y la i casi nunca se escribe z; se " +
      "escribe c (cena, cine), y esa es otra lección.",

      "Para escribirla: un solo trazo, como un rayo acostado. Raya para la derecha, baja en " +
      "diagonal hacia la izquierda, y otra raya para la derecha."
    ],
    palabra: "zorra", foto: "img/lecciones/z/zorra.jpg",
    notaSilabas: "Solo son tres, como en la c y la g. Van en el orden de la cartilla.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["zo", "zu", "za"],
    palabras: ["zorra","zapato","zumo","tiza","pozo","loza","buzo","cabeza",
               "calabaza","zapote","tenaza","naturaleza"],
    tarjetas: [
      { palabra: "zapato", foto: "img/lecciones/z/zapato.jpg" },
      { palabra: "pozo", foto: "img/lecciones/z/pozo.jpg" },
      { palabra: "tiza", foto: "img/lecciones/z/tiza.jpg" },
      { palabra: "pizarra", foto: "img/lecciones/z/pizarra.jpg" }
    ],
    frases: [
      { texto: "mi pozo se ha secado.", foto: "img/lecciones/z/pozo-secado.jpg", ancha: true, rel: "16 / 9" },
      { texto: "José me regaló una taza de loza.", foto: "img/lecciones/z/taza-loza.jpg", ancha: true, rel: "16 / 9" },
      { texto: "esa zona la ocupa Hugo.", foto: "img/lecciones/z/zona-hugo.jpg", ancha: true, rel: "16 / 9" },
      { texto: "saca una tiza de la caja.", foto: "img/lecciones/z/tiza-caja.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese zapatero usa hilo y aguja.", foto: "img/lecciones/z/zapatero.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Hugo, la taza tiene zumo.", foto: "img/lecciones/z/taza-zumo.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la zorra le teme al cazador.", foto: "img/lecciones/z/zorra-cazador.jpg", completa: true, rel: "5 / 2" },
      { texto: "si la zorra pasa, ese zapatero la caza.", foto: "img/lecciones/z/zorra-caza.jpg", completa: true, rel: "5 / 2" }
    ],
    hojas: ["letra-z", "silabas-z", "frases-z"] },

  /* La ll: dos l que se leen como una sola letra. `marca` colorea «lla»
     entera y no la l suelta de «luna». Página del padre, más gallina,
     caballo, pollito, amarillo, semilla, llavero y tres frases suyas. En
     la rima va «de acá para allá», como la cartilla: el archivo decía
     «aquí», que lleva qu y esa todavía no se ha visto. */

  { id: "ll", letra: "ll", mayuscula: "LL", orden: 20,
    marca: ["ll"],
    banda: "#f3e3ef", tinta: "#8b3f7a",
    comoSuena: "En Colombia suena igual que la y de «yo»: la lengua se pega al techo de la boca y la voz pasa por los lados. llla, lllo.",
    aviso: [
      "Son dos l juntas, pero se leen como una sola letra, con un sonido que no es el de la l. " +
      "Conviene decirlo así: «cuando hay dos l pegadas, ya no suena l». Y suena igual que la y de " +
      "«yo» y «yate»: es otra pareja como la b y la v, que hay que recordar de memoria.",

      "Fíjese en que la l suelta sigue apareciendo en estas mismas palabras: «la», «sala», " +
      "«luna». Por eso en esta página solo se colorea la ll; la l sola es la de siempre.",

      "Para escribirla: son dos palitos de la l, uno al lado del otro, de arriba abajo. Nada " +
      "nuevo que aprender con la mano."
    ],
    palabra: "llave", foto: "img/lecciones/ll/llave.jpg",
    notaSilabas: "Van en el orden de la cartilla. Las dos l van siempre juntas.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["lla", "llu", "lli", "lle", "llo"],
    palabras: ["llave","llama","llano","pollito","silla","calle","olla","botella",
               "gallina","capilla","ballena","anillo","galleta",
               "amarillo","semilla","llavero"],
    tarjetas: [
      { palabra: "olla", foto: "img/lecciones/ll/olla.jpg" },
      { palabra: "gallo", foto: "img/lecciones/ll/gallo.jpg" },
      /* la calle trae letreros (es de Japón); el padre decidió que entra:
         «importa que es una calle» */
      { palabra: "calle", foto: "img/lecciones/ll/calle.jpg" },
      { palabra: "anillo", foto: "img/lecciones/ll/anillo.jpg" },
      { palabra: "ballena", foto: "img/lecciones/ll/ballena.jpg" },
      { palabra: "silla", foto: "img/lecciones/ll/silla.jpg" },
      { palabra: "gallina", foto: "img/lecciones/ll/gallina.jpg" },
      { palabra: "caballo", foto: "img/lecciones/ll/caballo.jpg" },
      { palabra: "pollito", foto: "img/lecciones/ll/pollito.jpg" }
    ],
    frases: [
      { texto: "oye la bulla de la calle.", foto: "img/lecciones/ll/bulla-calle.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese pájaro lleva paja a su nido.", foto: "img/lecciones/ll/pajaro-paja.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mamita, llena mi jarro de zumo.", foto: "img/lecciones/ll/mamita-zumo.jpg", ancha: true, rel: "16 / 9" },
      { texto: "niño, dale tu silla a la señora.", foto: "img/lecciones/ll/silla-senora.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la gallina llama a sus pollitos.", foto: "img/lecciones/ll/gallina-pollitos.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la luna llena ilumina el camino.", foto: "img/lecciones/ll/luna-llena.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi caballo recorre el valle.", foto: "img/lecciones/ll/caballo-valle.jpg", completa: true, rel: "5 / 2" },
      { texto: "la zorra mató a mi gallo, la gallina lo llora de acá para allá.", foto: "img/lecciones/ll/zorra-gallo.jpg", completa: true, rel: "5 / 2" }
    ],
    hojas: ["letra-ll", "silabas-ll", "frases-ll"] },

  /* gue y gui: no hay letra nueva, hay una regla. La u está ahí para que
     la g suene suave delante de la e y la i, y NO se pronuncia. `marca`
     colorea «gue» y «gui» enteras; el «gu» de «gusta» (g + u que sí
     suena) no se colorea. La frase de la plana la propuse yo, de la misma
     página: el padre no tenía. */

  { id: "gue", letra: "gu", mayuscula: "GU", orden: 21,
    marca: ["gue", "gui"],
    banda: "#fbe7dc", tinta: "#c2410c",
    comoSuena: "Como la g de gato, suave en la garganta: gue, gui. La u no suena: está ahí de muda.",
    aviso: [
      "Esta no es una letra nueva: es una regla. Con la e y la i, la g sola sonaría como la j " +
      "(gente, girasol). Para que siga sonando suave, como en «gato», se le pone una u en medio: " +
      "gue, gui. Y esa u no se dice. «Guitarra» se lee «gi-ta-rra», no «gu-i-ta-rra».",

      "Por eso en esta página solo se colorea «gue» y «gui». En «gusta» la u sí suena (gu-s-ta): " +
      "es la gu de siempre, la de «gusano», y queda sin color.",

      "No hay trazo nuevo que aprender: la g, la u y la vocal, las tres ya vistas."
    ],
    palabra: "guitarra", foto: "img/lecciones/gue/guitarra.jpg",
    notaSilabas: "Solo dos. La u va escrita pero no se dice.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["gui", "gue"],
    palabras: ["guerra","águila","guerrero","guiso","sigue","juguete","guitarra","laguito",
               "guiño","guisado","seguido"],
    tarjetas: [
      { palabra: "águila", foto: "img/lecciones/gue/aguila.jpg" },
      { palabra: "juguete", foto: "img/lecciones/gue/juguete.jpg" },
      /* el guiso sale del dibujo de «me gusta tu guisado»: no vino foto */
      { palabra: "guiso", foto: "img/lecciones/gue/guiso.jpg" }
    ],
    frases: [
      { texto: "esa águila cazó a mi conejo.", foto: "img/lecciones/gue/aguila-conejo.jpg", ancha: true, rel: "16 / 9" },
      { texto: "lleva tu guitarra a mi casa.", foto: "img/lecciones/gue/guitarra-casa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "guerrero, sigue a tu jefe.", foto: "img/lecciones/gue/guerrero.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ya acabó la guerra.", foto: "img/lecciones/gue/guerra.jpg", ancha: true, rel: "16 / 9" },
      { texto: "me gusta tu guisado.", foto: "img/lecciones/gue/guisado.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mamá guisa la comida.", foto: "img/lecciones/gue/mama-guisa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "el águila está en su nido.", foto: "img/lecciones/gue/aguila-nido.jpg", completa: true, rel: "5 / 2" }
    ],
    hojas: ["letra-gue", "silabas-gue", "frases-gue"] },

  /* ce y ci: la misma c de casa, que con la e y la i suena como la s.
     Desde aquí el script deja de prohibir ce/ci. Palabra clave «cigarra»,
     la escogió el padre (los animales primero); la frase de la plana la
     propuse yo de la misma página. Celina con mayúscula: es un nombre. */

  { id: "ce", letra: "c", mayuscula: "C", orden: 22,
    marca: ["ce", "ci"],
    banda: "#f6d9e1", tinta: "#b02a55",
    comoSuena: "Con la e y la i, la c suena igual que la s: ssse, sssi. En Colombia no se pone la lengua entre los dientes.",
    aviso: [
      "Es la misma c de «casa», pero con la e y la i cambia de sonido: suena como la s. «Cine» se " +
      "lee igual que si dijera «sine». Esa es la trampa que la lección de la c dejó pendiente.",

      "Conviene mostrarlo con dos palabras de la misma familia: «cocina» tiene las dos c — la " +
      "primera (co) suena fuerte y la segunda (ci) suena suave. Señale cada una con el dedo.",

      "Y vuelve la pareja de siempre: «ce» suena como «se» y «ci» como «si». No hay forma de " +
      "saber de oído cuál va; hay que acordarse de cómo se escribe cada palabra, como con la b y " +
      "la v. La mano no aprende nada nuevo: es la c de siempre."
    ],
    palabra: "cigarra", foto: "img/lecciones/ce/cigarra.jpg",
    notaSilabas: "Solo dos. La c suena como la s.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["ci", "ce"],
    palabras: ["cine","cena","cigarro","cebolla","tocino","cocina","doce","cepillo",
               "cereza","cera","racimo","ceniza","cigarra","cacerola"],
    tarjetas: [
      { palabra: "cepillo", foto: "img/lecciones/ce/cepillo.jpg" },
      { palabra: "cebolla", foto: "img/lecciones/ce/cebolla.jpg" },
      { palabra: "cocina", foto: "img/lecciones/ce/cocina.jpg" },
      { palabra: "cocinero", foto: "img/lecciones/ce/cocinero.jpg" },
      { palabra: "maceta", foto: "img/lecciones/ce/maceta.jpg" }
    ],
    frases: [
      { texto: "cocinero, dame la cena.", foto: "img/lecciones/ce/cocinero-cena.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese guerrero fuma cigarro.", foto: "img/lecciones/ce/guerrero-cigarro.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la cebolla no hace daño.", foto: "img/lecciones/ce/cebolla-dano.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la abeja da cera.", foto: "img/lecciones/ce/abeja-cera.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Celina tuvo su cita médica.", foto: "img/lecciones/ce/celina-cita.jpg", ancha: true, rel: "16 / 9" },
      { texto: "doce niños van al cine.", foto: "img/lecciones/ce/doce-cine.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-ce", "silabas-ce", "frases-ce"] },

  /* La ch: dos letras que se leen como una sola. `marca` colorea «cha»,
     «che»… enteras; la c y la h sueltas no. Con la ch ya se lee «Chepe»:
     los tres nombres de la casa. Chepe y Nacho con mayúscula. */

  { id: "ch", letra: "ch", mayuscula: "CH", orden: 23,
    marca: ["ch"],
    banda: "#e0eef6", tinta: "#1f6f99",
    comoSuena: "La lengua se pega arriba y suelta el aire de golpe: ch, como cuando uno pide silencio pero con fuerza. cha, cho.",
    aviso: [
      "Son dos letras, la c y la h, que juntas hacen un sonido nuevo que ninguna de las dos " +
      "tiene sola. Y aquí la h, que siempre se quedaba callada, sí cuenta: sin ella no hay ch. " +
      "Por eso en esta página se colorea la ch entera, nunca la c sola.",

      "Y hay premio grande: con la ch ya se lee «Chepe». Ya están los tres: Nelson, Antonio " +
      "(y Toño) y Chepe. Vale la pena que él mismo encuentre su nombre en las tarjetas y en las " +
      "frases, con mayúscula, como todos los nombres.",

      "Para escribirla: primero la c, que es la o sin cerrar, y pegada la h, que es la n con el " +
      "palito largo. Dos trazos, en ese orden."
    ],
    palabra: "choza", foto: "img/lecciones/ch/choza.jpg",
    notaSilabas: "Van en el orden de la cartilla. La c y la h siempre juntas.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["cho", "chu", "chi", "che", "cha"],
    palabras: ["choza","chivo","chorizo","chaleco","noche","techo","hacha","lechuga",
               "ocho","coche","chocolate","leche","cachorro","chica","pechuga"],
    tarjetas: [
      { palabra: "chivo", foto: "img/lecciones/ch/chivo.jpg" },
      { palabra: "serrucho", foto: "img/lecciones/ch/serrucho.jpg" },
      { palabra: "hacha", foto: "img/lecciones/ch/hacha.jpg" },
      { palabra: "cuchara", foto: "img/lecciones/ch/cuchara.jpg" },
      { palabra: "chorizo", foto: "img/lecciones/ch/chorizo.jpg" },
      { palabra: "lechuza", foto: "img/lecciones/ch/lechuza.jpg" },
      { palabra: "ocho", foto: "img/lecciones/ch/ocho.jpg" },
      { palabra: "chocolate", foto: "img/lecciones/ch/chocolate.jpg" },
      { palabra: "leche", foto: "img/lecciones/ch/leche.jpg" },
      { palabra: "cachorro", foto: "img/lecciones/ch/cachorro.jpg" },
      { palabra: "Chepe", foto: "img/lecciones/ch/chepe.jpg" }
    ],
    frases: [
      { texto: "la chiva da leche.", foto: "img/lecciones/ch/chiva-leche.jpg", ancha: true, rel: "16 / 9" },
      { texto: "dame a la cena chorizo y chocolate.", foto: "img/lecciones/ch/cena-chocolate.jpg", ancha: true, rel: "16 / 9" },
      { texto: "muchacho, lleva esa paja a la choza.", foto: "img/lecciones/ch/muchacho-paja.jpg", ancha: true, rel: "16 / 9" },
      { texto: "una lechuza chilla de noche.", foto: "img/lecciones/ch/lechuza-noche.jpg", ancha: true, rel: "16 / 9" },
      { texto: "chinito, sigue camino a tu chocita.", foto: "img/lecciones/ch/chinito.jpg", ancha: true, rel: "16 / 9" },
      { texto: "dame en la cena chorizo y lechuga.", foto: "img/lecciones/ch/cena-lechuga.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Chepe ama el chocolate.", foto: "img/lecciones/ch/chepe-chocolate.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Nacho come su lechuga.", foto: "img/lecciones/ch/nacho-lechuga.jpg", ancha: true, rel: "16 / 9" },
      { texto: "el mapache come su comida.", foto: "img/lecciones/ch/mapache.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Chepe tiene un cachorro.", foto: "img/lecciones/ch/chepe-cachorro.jpg", ancha: true, rel: "16 / 9" },
      { texto: "lunita juguetona, asoma tu carita, ilumina la noche, mi choza, mi cosecha.", foto: "img/lecciones/ch/lunita.jpg", completa: true, rel: "5 / 2" }
    ],
    hojas: ["letra-ch", "silabas-ch", "frases-ch"] },

  /* que y qui: la q es letra nueva (su hoja de trazo la agrega al
     alfabeto), pero nunca va sola: siempre «qu», y esa u no suena, como
     en gue/gui. Es el sonido de ca, co, cu delante de la e y la i.
     Clave queso (la escogió el padre); la frase de la plana la propuse
     yo: el padre no tenía. Periquito va en minúscula: es el pájaro. */

  { id: "que", letra: "qu", mayuscula: "QU", orden: 24,
    marca: ["que", "qui", "qué", "quí"],
    banda: "#dbf0ec", tinta: "#0f766e",
    comoSuena: "Como la c de casa, de golpe y bien atrás: que, qui. La u no suena: está ahí de muda, como en guitarra.",
    aviso: [
      "Es una letra nueva, la q, pero nunca anda sola: siempre lleva la u pegada, y esa u no se " +
      "dice. «Queso» se lee «keso». Es la misma trampa de «guitarra», así que ya la conoce.",

      "Sirve para una sola cosa: el sonido de casa, coco y cuna delante de la e y la i. Con la a, " +
      "la o y la u se escribe con c (casa); con la e y la i, con qu (queso, quijada). Vale la pena " +
      "ponerlas lado a lado: «ca, co, cu, que, qui» suenan todas de la misma familia.",

      "Para escribirla: es la rueda de la a con el palito que baja derecho por debajo del renglón, " +
      "sin gancho. Si el palito se dobla, es una g."
    ],
    palabra: "queso", foto: "img/lecciones/que/queso.jpg",
    notaSilabas: "Solo dos. Siempre con la u, que no suena.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["que", "qui"],
    palabras: ["queso","chaqueta","líquido","quijada","máquina","paquete","queja","buque",
               "pequeño","poquito","maqueta","maquila","equipo"],
    tarjetas: [
      { palabra: "raqueta", foto: "img/lecciones/que/raqueta.jpg" },
      { palabra: "quijada", foto: "img/lecciones/que/quijada.jpg" },
      { palabra: "paquete", foto: "img/lecciones/que/paquete.jpg" },
      { palabra: "químico", foto: "img/lecciones/que/quimico.jpg" }
    ],
    frases: [
      { texto: "si me da queso no me quejo.", foto: "img/lecciones/que/queso-quejo.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese buque navega a toda máquina.", foto: "img/lecciones/que/buque.jpg", ancha: true, rel: "16 / 9" },
      { texto: "toma mi chaqueta de lana.", foto: "img/lecciones/que/chaqueta.jpg", ancha: true, rel: "16 / 9" },
      { texto: "corre, se quema la choza.", foto: "img/lecciones/que/choza-quema.jpg", ancha: true, rel: "16 / 9" },
      { texto: "periquito come cacao.", foto: "img/lecciones/que/periquito.jpg", ancha: true, rel: "16 / 9" },
      { texto: "el equipo de papá gana la liga.", foto: "img/lecciones/que/equipo.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Paquita usa la raqueta.", foto: "img/lecciones/que/paquita.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mamá tomó un paquete de queso.", foto: "img/lecciones/que/paquete-queso.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-que", "silabas-que", "frases-que"] },

  /* ge y gi: sin letra nueva. La g de siempre, que delante de la e y la
     i suena como la j. Cierra el orden de la cartilla Nacho. Clave gemelo
     (la escogió el padre); la frase de la plana la propuse yo. Colores de
     la familia de la g, más fuertes, como la ce con la c. */

  { id: "ge", letra: "g", mayuscula: "G", orden: 25,
    marca: ["ge", "gi", "gé", "gí"],
    banda: "#fdecd4", tinta: "#b45309",
    comoSuena: "Con la e y la i, la g suena igual que la j: con aire, desde la garganta. ge, gi, como je, ji.",
    aviso: [
      "Es la misma g de «gato», pero con la e y la i cambia de sonido: suena como la j. «Gema» " +
      "se lee igual que si dijera «jema». Es la última trampa pendiente de la lección de la g.",

      "Conviene ponerla al lado de las otras dos: «ga, go, gu» suenan suave; «gue, gui» también " +
      "suenan suave, gracias a la u muda; y «ge, gi», sin u, suenan como la j. Ponga «gato» y " +
      "«gema» una al lado de la otra: la misma letra, dos sonidos.",

      "Y vuelve la pareja de siempre: «ge» suena como «je» y «gi» como «ji». De oído no se sabe " +
      "cuál va; hay que acordarse de cómo se escribe cada palabra, como con la b y la v o la c y " +
      "la s. La mano no aprende nada nuevo: es la g de siempre."
    ],
    palabra: "gemelo", foto: "img/lecciones/ge/gemelo.jpg",
    notaSilabas: "Solo dos. La g suena como la j.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["ge", "gi"],
    palabras: ["gemelo","página","gema","generoso","gira","gitano","giro"],
    tarjetas: [
      { palabra: "gema", foto: "img/lecciones/ge/gema.jpg" },
      { palabra: "gitano", foto: "img/lecciones/ge/gitano.jpg" },
      { palabra: "género", foto: "img/lecciones/ge/genero.jpg" },
      { palabra: "gelatina", foto: "img/lecciones/ge/gelatina.jpg" }
    ],
    frases: [
      { texto: "joyero, coloca la gema a mi anillo.", foto: "img/lecciones/ge/joyero-gema.jpg", ancha: true, rel: "16 / 9" },
      { texto: "no pase la página ligero.", foto: "img/lecciones/ge/pagina-ligero.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese gitano dirige su carreta.", foto: "img/lecciones/ge/gitano-carreta.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la hélice gira rápido.", foto: "img/lecciones/ge/helice.jpg", ancha: true, rel: "16 / 9" },
      { texto: "oye, chico, vigila mi pequeño coche.", foto: "img/lecciones/ge/chico-coche.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-ge", "silabas-ge", "frases-ge"] },

  /* Sílabas inversas con s: as, es, is, os, us. Ya no hay letra nueva;
     lo nuevo es que la consonante va DETRÁS de la vocal. `inversa: "s"`
     cambia cómo se colorea (letra.js): vocal + s cuando después no viene
     vocal. `nombre` y `glifo` reemplazan «La s», que se confundiría con la
     lección de la s. Clave papas (la escogió el padre); la frase de la
     plana la propuse yo. */

  { id: "es", letra: "s", mayuscula: "S", orden: 26,
    nombre: "as, es, is, os, us", glifo: "es", inversa: "s",
    banda: "#d3ecd6", tinta: "#1f6b37",
    comoSuena: "Primero la vocal y después la s, estirada al final: aaass, eeesss. La s cierra la sílaba.",
    aviso: [
      "Hasta ahora la consonante siempre iba primero: sa, se, si. Aquí es al revés: la vocal va " +
      "primero y la s detrás. «es», «as», «os». Es la primera vez, y es un cambio grande: vale la " +
      "pena decirlo despacio, alargando la s del final.",

      "Para leer «escoba» no sirve juntar de a dos letras como antes (e-sc-o…): hay que ver que la " +
      "s se queda con la e: es-co-ba. Una ayuda: tapar con el dedo el resto de la palabra y leer " +
      "solo el pedacito coloreado, después el siguiente.",

      "Y una trampa: no toda s detrás de una vocal es de esta lección. En «pesas» la primera s va " +
      "con la a que sigue (pe-sas); por eso solo se colorea el «as» del final. La regla: si después " +
      "de la s viene otra vocal, la s se va con ella."
    ],
    palabra: "papas", foto: "img/lecciones/es/papas.jpg",
    notaSilabas: "En el orden de la cartilla. La vocal primero, la s detrás.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["es", "os", "is", "as", "us"],
    palabras: ["escudo","bosque","máscara","manos","asma","pasto","pescado","lunes",
               "escala","mosca","pasta","isla","estuche","susto","poste","pista",
               "más","espeso","pues","mes","esposa","somos"],
    tarjetas: [
      { palabra: "isla", foto: "img/lecciones/es/isla.jpg" },
      { palabra: "escoba", foto: "img/lecciones/es/escoba.jpg" },
      { palabra: "castillo", foto: "img/lecciones/es/castillo.jpg" },
      { palabra: "espejo", foto: "img/lecciones/es/espejo.jpg" },
      { palabra: "mosquito", foto: "img/lecciones/es/mosquito.jpg" },
      { palabra: "pesas", foto: "img/lecciones/es/pesas.jpg" },
      { palabra: "espuma", foto: "img/lecciones/es/espuma.jpg" },
      { palabra: "espumoso", foto: "img/lecciones/es/espumoso.jpg" }
    ],
    frases: [
      { texto: "me asusta esa máscara.", foto: "img/lecciones/es/mascara.jpg", ancha: true, rel: "16 / 9" },
      { texto: "este pescado está rico.", foto: "img/lecciones/es/pescado.jpg", ancha: true, rel: "16 / 9" },
      { texto: "coge la pasta que te guste.", foto: "img/lecciones/es/pasta.jpg", ancha: true, rel: "16 / 9" },
      { texto: "sigue la pista y busca la costa.", foto: "img/lecciones/es/pista-costa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese es mi baño espumoso.", foto: "img/lecciones/es/bano-espumoso.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mamá es la esposa de papá.", foto: "img/lecciones/es/esposa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi sopa está espesa.", foto: "img/lecciones/es/sopa-espesa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "¿me pasas esas papas?", foto: "img/lecciones/es/pasas-papas.jpg", ancha: true, rel: "16 / 9" },
      { texto: "me gusta navegar a esta isla.", foto: "img/lecciones/es/navegar-isla.jpg", ancha: true, rel: "16 / 9" },
      { texto: "esta mosca pisa mis papas.", foto: "img/lecciones/es/mosca-papas.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-es", "silabas-es", "frases-es"] },

  /* Sílabas inversas con n: an, en, in, on, un. Igual que la de la s
     (`inversa`), ahora con la n. Clave manzana (la escogió el padre); la
     frase de la plana la propuse yo (sin mayúsculas: las hojas de
     escribir no tienen letras mayúsculas). Antonio
     y Nelson reusan sus tarjetas de la t y la n. */

  { id: "an", letra: "n", mayuscula: "N", orden: 27,
    nombre: "an, en, in, on, un", glifo: "an", inversa: "n",
    banda: "#fbe0c8", tinta: "#a34d12",
    comoSuena: "Primero la vocal y después la n, que sale por la nariz y cierra la sílaba: aaannn, eeennn.",
    aviso: [
      "Es lo mismo que con la s: la vocal primero y la consonante detrás. «an», «en», «on». La " +
      "n del final se alarga por la nariz, con la boca casi cerrada.",

      "Aquí aparecen los nombres de la casa: «Antonio» empieza con «an» y «Nelson» termina en " +
      "«on». Vale la pena que él los busque en las tarjetas y las frases.",

      "La misma trampa de antes: si después de la n viene una vocal, la n se va con ella. En " +
      "«ventana» solo se colorea el «en» (ven-ta-na): el «na» del final es una sílaba de las de " +
      "siempre."
    ],
    palabra: "manzana", foto: "img/lecciones/an/manzana.jpg",
    notaSilabas: "En el orden de la cartilla. La vocal primero, la n detrás.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["an", "in", "on", "un", "en"],
    palabras: ["banco","cinco","ventana","cinta","tinta","lanza","patín","ratón",
               "santo","menta","manzana","capitán","bandera","mundo","botón","naranja",
               "ensalada","andén","linda","panda","limón"],
    tarjetas: [
      { palabra: "candado", foto: "img/lecciones/an/candado.jpg" },
      { palabra: "mundo", foto: "img/lecciones/an/mundo.jpg" },
      { palabra: "limón", foto: "img/lecciones/an/limon.jpg" },
      { palabra: "ensalada", foto: "img/lecciones/an/ensalada.jpg" },
      { palabra: "pan", foto: "img/lecciones/an/pan.jpg" },
      { palabra: "panda", foto: "img/lecciones/an/panda.jpg" },
      { palabra: "ratón", foto: "img/lecciones/an/raton.jpg" },
      { palabra: "llanta", foto: "img/lecciones/an/llanta.jpg" },
      { palabra: "Antonio", foto: "img/lecciones/t/antonio.jpg" },
      { palabra: "Nelson", foto: "img/lecciones/n/nelson.jpg" }
    ],
    frases: [
      { texto: "tengo una manzana roja y jugosa.", foto: "img/lecciones/an/manzana-roja.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese capitán manda su batallón.", foto: "img/lecciones/an/capitan.jpg", ancha: true, rel: "16 / 9" },
      { texto: "cinco gemas valen mucho.", foto: "img/lecciones/an/cinco-gemas.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Genaro canta la ronda.", foto: "img/lecciones/an/genaro-ronda.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Colombia ganará la copa del mundo.", foto: "img/lecciones/an/colombia-copa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "papá pide una ensalada.", foto: "img/lecciones/an/papa-ensalada.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Nelson me mandó a la sala.", foto: "img/lecciones/an/nelson-sala.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Antonio anda en el andén.", foto: "img/lecciones/an/antonio-anden.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Linda usa el mapamundi.", foto: "img/lecciones/an/linda-mapamundi.jpg", ancha: true, rel: "16 / 9" },
      { texto: "un panda lindo anda en el monte.", foto: "img/lecciones/an/panda-monte.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-an", "silabas-an", "frases-an"] },

  /* Sílabas inversas con r: ar, er, ir, or, ur. La r del final suena
     suave, como en «toro», nunca como la rr. Clave tortuga (la escogió el
     padre). La frase de la plana la corrigió él: «duerme» trae un
     diptongo, que todavía no se ha visto; en las frases de lectura se
     tolera, en la plana no. Jorge y Martha son los papás. */

  { id: "ar", letra: "r", mayuscula: "R", orden: 28,
    nombre: "ar, er, ir, or, ur", glifo: "ar", inversa: "r",
    banda: "#f7dcdc", tinta: "#9b2c2c",
    comoSuena: "Primero la vocal y después la r, suave y cortita, con un solo toque de la lengua: ar, or.",
    aviso: [
      "Otra vez la vocal primero y la consonante detrás: «ar», «er», «or». La r del final es la " +
      "suave de «toro», un solo golpecito de la lengua. No se arrastra como la rr de «perro».",

      "Ojo con «terrón»: ahí hay rr, y la rr no se queda con la e (te-rrón). Lo mismo «carro» o " +
      "«perro»: esas no son de esta lección, y por eso no se colorean.",

      "Y llegan los papás: «Jorge» tiene «or» y «Martha» tiene «ar». Vale la pena buscarlos en " +
      "las tarjetas."
    ],
    palabra: "tortuga", foto: "img/lecciones/ar/tortuga.jpg",
    notaSilabas: "En el orden de la cartilla. La vocal primero, la r detrás.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["ar", "ur", "ir", "er", "or"],
    palabras: ["arpa","parque","collar","barco","gordo","circo","hermano","jardín",
               "cerdo","curva","azúcar","hormiga","olor","perla","urna","ordenar","mármol"],
    tarjetas: [
      { palabra: "ardilla", foto: "img/lecciones/ar/ardilla.jpg" },
      { palabra: "circo", foto: "img/lecciones/ar/circo.jpg" },
      { palabra: "arpa", foto: "img/lecciones/ar/arpa.jpg" },
      { palabra: "dormilón", foto: "img/lecciones/ar/dormilon.jpg" },
      { palabra: "hermanos", foto: "img/lecciones/ar/hermanos.jpg" },
      { palabra: "perlas", foto: "img/lecciones/ar/perlas.jpg" },
      { palabra: "torta", foto: "img/lecciones/ar/torta.jpg" },
      { palabra: "urna", foto: "img/lecciones/ar/urna.jpg" },
      { palabra: "hormiga", foto: "img/lecciones/ar/hormiga.jpg" },
      { palabra: "Jorge", foto: "img/lecciones/ar/jorge.jpg" },
      { palabra: "Martha", foto: "img/lecciones/ar/martha.jpg" }
    ],
    frases: [
      { texto: "esa hormiga carga su terrón de azúcar.", foto: "img/lecciones/ar/hormiga-azucar.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese parque está verde y hermoso.", foto: "img/lecciones/ar/parque.jpg", ancha: true, rel: "16 / 9" },
      { texto: "perdí mi collar en tu jardín.", foto: "img/lecciones/ar/collar-jardin.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese barco lleva una carga de café.", foto: "img/lecciones/ar/barco-cafe.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi cerdo no está gordo porque no come.", foto: "img/lecciones/ar/cerdo.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Úrsula ordena su ropa.", foto: "img/lecciones/ar/ursula-ropa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la perla es de Armando.", foto: "img/lecciones/ar/perla-armando.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Martín pide perdón a Martha.", foto: "img/lecciones/ar/martin-martha.jpg", ancha: true, rel: "16 / 9" },
      { texto: "tenemos partido el martes.", foto: "img/lecciones/ar/partido-martes.jpg", ancha: true, rel: "16 / 9" },
      { texto: "el artista ama su arpa.", foto: "img/lecciones/ar/artista-arpa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la tortuga del circo es dormilona.", foto: "img/lecciones/ar/tortuga-dormilona.jpg", ancha: true, rel: "16 / 9" },
      { texto: "el Solitario Jorge era una tortuga de las islas Galápagos.", foto: "img/lecciones/ar/solitario-jorge.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-ar", "silabas-ar", "frases-ar"] },

  /* Sílabas inversas con l: al, el, il, ol, ul. Cierra las cuatro de la
     cartilla antes de los diptongos (orden acordado el 4 nov: al, después
     los diptongos, después az, am, ay…). Clave sol: el padre dudaba entre
     pulpo y sol; sol es la sílaba casi sola. La doble l (calle, collar)
     no cierra sílaba: letra.js ya la salta. */

  { id: "al", letra: "l", mayuscula: "L", orden: 29,
    nombre: "al, el, il, ol, ul", glifo: "al", inversa: "l",
    banda: "#dcefe6", tinta: "#1b7a5a",
    comoSuena: "Primero la vocal y después la l, con la lengua pegada arriba, sin soltarla: aaal, sooool.",
    aviso: [
      "La última de este grupo: la vocal primero y la l detrás. «al», «el», «ol». La l del final " +
      "se sostiene con la lengua pegada arriba, como si uno no quisiera soltarla.",

      "Hay una que él ya lee desde hace meses sin saberlo: «el». Vale la pena mostrárselo: «el» de " +
      "«el perro» es esta misma sílaba. Lo mismo «al».",

      "Y la trampa de siempre: si después de la l viene vocal, la l se va con ella. En «Elisa» la " +
      "l va con la i (E-li-sa), por eso no se colorea. Y la ll de «calle» o «pollito» es otra letra."
    ],
    palabra: "sol", foto: "img/lecciones/al/sol.jpg",
    notaSilabas: "En el orden de la cartilla. La vocal primero, la l detrás.",
    notaFrases: "Acá las imágenes son dibujos, no fotos de la casa. Léalas señalando con el dedo, palabra por palabra.",
    silabas: ["al", "ul", "el", "il", "ol"],
    palabras: ["caldo","polvo","barril","salsa","selva","soldado","pastel","mantel",
               "culpa","pulpo","dedal","panal","sal","mal","mil","Elsa","Sulma","Elisa"],
    tarjetas: [
      { palabra: "soldado", foto: "img/lecciones/al/soldado.jpg" },
      { palabra: "pulpo", foto: "img/lecciones/al/pulpo.jpg" },
      { palabra: "dedal", foto: "img/lecciones/al/dedal.jpg" },
      { palabra: "pastel", foto: "img/lecciones/al/pastel.jpg" },
      { palabra: "sal", foto: "img/lecciones/al/sal.jpg" },
      { palabra: "mil", foto: "img/lecciones/al/mil.jpg" }
    ],
    frases: [
      { texto: "a ese soldado le falta su fusil.", foto: "img/lecciones/al/soldado-fusil.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la abeja recoge almíbar y lo lleva a su panal.", foto: "img/lecciones/al/abeja-panal.jpg", ancha: true, rel: "16 / 9" },
      { texto: "sin culpa derramé la salsa.", foto: "img/lecciones/al/culpa-salsa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "mi hermano salta fácil la cerca.", foto: "img/lecciones/al/hermano-cerca.jpg", ancha: true, rel: "16 / 9" },
      { texto: "este pastel está dulce.", foto: "img/lecciones/al/pastel-dulce.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Alma se puso mal.", foto: "img/lecciones/al/alma-mal.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Elsa sale al sol.", foto: "img/lecciones/al/elsa-sol.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Sulma suma mil más mil.", foto: "img/lecciones/al/sulma-mil.jpg", ancha: true, rel: "16 / 9" },
      { texto: "Elisa le puso sal a la sopa.", foto: "img/lecciones/al/elisa-sal.jpg", ancha: true, rel: "16 / 9" },
      { texto: "la salsa de tomate es espesa.", foto: "img/lecciones/al/salsa-espesa.jpg", ancha: true, rel: "16 / 9" },
      { texto: "ese soldado se fue cansado.", foto: "img/lecciones/al/soldado-cansado.jpg", ancha: true, rel: "16 / 9" },
      { texto: "el pulpo salta al mar.", foto: "img/lecciones/al/pulpo-mar.jpg", ancha: true, rel: "16 / 9" }
    ],
    hojas: ["letra-al", "silabas-al", "frases-al"] }

];
