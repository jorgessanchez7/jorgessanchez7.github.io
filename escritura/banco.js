/* El banco de palabras de Antonio — método global.
 *
 * No va por letras. Una palabra entera con su imagen, y nada que acertar.
 * Los campos son por para qué sirve la palabra, no por qué letra lleva.
 *
 * Las personas van con FOTO de la casa: en lectura global la cara de la
 * mamá vale más que cualquier dibujo. Lo que no se puede fotografiar
 * («más», «otra vez») va con pictograma de ARASAAC.
 *
 * Reglas de la tarjeta:
 *   palabra  — como se escribe aquí, en colombiano. Nunca la etiqueta de
 *              ARASAAC, que viene en español de España (dice «zumo», no «jugo»).
 *   img      — la imagen. Si el archivo no existe, la tarjeta no se muestra.
 *   pict     — true si la imagen es un pictograma de ARASAAC (cambia el fondo
 *              a blanco y obliga el crédito al pie de la página).
 *   nota     — una línea para el adulto. No la ve el niño.
 */

window.BANCO = [

  { id: "casa",
    titulo: "La casa",
    sub: "Las caras de siempre. Estas son las primeras del método.",
    cartas: [
      { palabra: "mamá", img: "img/lecciones/antonio/mama.jpg" },
      { palabra: "papá", img: "img/lecciones/antonio/papa.jpg" },
      { palabra: "Chepe", img: "img/lecciones/antonio/chepe.jpg" },
      { palabra: "Nelson", img: "img/lecciones/antonio/nelson.jpg" },
      { palabra: "el bebé", img: "img/lecciones/antonio/bebe.jpg" },
      { palabra: "Antonio", img: "img/lecciones/antonio/antonio.jpg",
        nota: "La suya va de última a propósito: primero los otros, para que la vea como una más." }
    ] },

  { id: "pido",
    titulo: "Lo que pido",
    sub: "Estas no son para leer bonito. Son para que un día sirvan.",
    cartas: [
      { palabra: "más", img: "img/lecciones/antonio/mas.png", pict: true,
        nota: "Si alguna vez la toca a propósito, eso no es un logro de lectura: es una petición. Es la palabra más importante de todo el banco." },
      { palabra: "agua", img: "img/lecciones/antonio/agua.png", pict: true },
      { palabra: "jugo", img: "img/lecciones/antonio/jugo.png", pict: true,
        nota: "El pictograma de ARASAAC se llama «zumo». Aquí se escribe jugo." },
      { palabra: "otra vez", img: "img/lecciones/antonio/otra-vez.png", pict: true },
      { palabra: "sí", img: "img/lecciones/antonio/si.png", pict: true },
      { palabra: "no", img: "img/lecciones/antonio/no.png", pict: true }
    ] }

];
