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
    palabras: ["papá", "mapa", "pipa", "puma", "pomo", "papa", "papo", "pepe", "pipí", "popó"],
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
      { palabra: "pipí", foto: "img/lecciones/p/pipi.jpg" },
      { palabra: "popó", foto: "img/lecciones/p/popo.jpg" }
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
               "pena", "mina", "enano", "luna", "molino", "lana"],
    tarjetas: [
      { palabra: "mono", foto: "img/lecciones/n/mono.jpg" },
      { palabra: "luna", foto: "img/lecciones/n/luna.jpg" },
      { palabra: "pino", foto: "img/lecciones/n/pino.jpg" },
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
               "pomada", "soda", "dime", "lado", "moneda", "pide"],
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
      { texto: "mi papá suda si usa su pala toda la semana.", foto: "img/lecciones/d/papa-suda.jpg", ancha: true, rel: "16 / 9" }
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
      { palabra: "loro", foto: "img/lecciones/r/loro.jpg" }
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
    hojas: ["letra-rr", "silabas-rr", "frases-rr"] }

];
