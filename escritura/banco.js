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
 *   palabra  — como se escribe aquí, en colombiano. NUNCA la etiqueta de
 *              ARASAAC, que viene en español de España: el pictograma de
 *              jugo se llama «zumo» y el de carro se llama «coche».
 *   img      — la imagen. Si el archivo no existe, la tarjeta no se muestra,
 *              así el banco se llena solo a medida que llegan las imágenes.
 *   pict     — true si es un pictograma de ARASAAC. Cambia el fondo a blanco,
 *              no lo recorta, y obliga el crédito al pie de la página.
 *   arasaac  — el número del pictograma en arasaac.org, para poder volver a
 *              bajarlo igual si se pierde.
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
      { palabra: "Antonio", img: "img/lecciones/antonio/antonio.jpg",
        nota: "La suya va de última a propósito: primero los otros, para que la vea como una más." }
    ] },

  { id: "pido",
    titulo: "Lo que pido",
    sub: "Estas no son para leer bonito. Son para que un día sirvan.",
    cartas: [
      { palabra: "más", img: "img/lecciones/antonio/mas.png", pict: true, arasaac: 5508,
        nota: "Si alguna vez la toca a propósito, eso no es un logro de lectura: es una petición. Es la palabra más importante de todo el banco." },
      { palabra: "agua", img: "img/lecciones/antonio/agua.png", pict: true, arasaac: 2248 },
      { palabra: "jugo", img: "img/lecciones/antonio/jugo.png", pict: true, arasaac: 11461,
        nota: "En ARASAAC este pictograma se llama «zumo». Aquí se escribe jugo." },
      { palabra: "otra vez", img: "img/lecciones/antonio/otra-vez.png", pict: true, arasaac: 37162 },
      { palabra: "sí", img: "img/lecciones/antonio/si.png", pict: true, arasaac: 5584 },
      { palabra: "no", img: "img/lecciones/antonio/no.png", pict: true, arasaac: 5526 }
    ] },

  { id: "dia",
    titulo: "El día",
    sub: "Lo que pasa todos los días, siempre en el mismo orden.",
    cartas: [
      { palabra: "comer", img: "img/lecciones/antonio/comer.png", pict: true, arasaac: 6456 },
      { palabra: "dormir", img: "img/lecciones/antonio/dormir.png", pict: true, arasaac: 6479 },
      { palabra: "el baño", img: "img/lecciones/antonio/bano.png", pict: true, arasaac: 6929 },
      { palabra: "el carro", img: "img/lecciones/antonio/carro.png", pict: true, arasaac: 2339,
        nota: "En ARASAAC se llama «coche». Aquí se escribe carro." }
    ] }

];
