/* ============================================================
   vocales.js - palabras que empiezan con cada vocal.

   Las pidió el padre: «aunque el niño no sabe leer, está bien que
   asocie algunas palabras a las letras». No son para leer: el adulto
   lee la palabra, el niño mira el dibujo y escribe solo la primera
   letra, que es la vocal que ya conoce. Por eso aquí NO aplica la
   regla de usar solo letras vistas: el resto de la palabra va en gris,
   como texto, y nadie le pide al niño que lo descifre.

   La hoja es plana.html?hoja=vocal-<v>-palabras. Las imágenes están
   en img/lecciones/vocales/<v>/, en cuadrado de 400 y a color (en el
   papel salen en gris por CSS, así sirven también para la pantalla).
   ============================================================ */
window.VOCALES_PALABRAS = [
  { vocal: "a", palabras: [
    { palabra: "anillo",   foto: "img/lecciones/vocales/a/anillo.jpg" },
    { palabra: "aro",      foto: "img/lecciones/vocales/a/aro.jpg" },
    { palabra: "araña",    foto: "img/lecciones/vocales/a/arania.jpg" },
    { palabra: "abeja",    foto: "img/lecciones/vocales/a/abeja.jpg" },
    { palabra: "arcoíris", foto: "img/lecciones/vocales/a/arcoiris.jpg" },
    { palabra: "avión",    foto: "img/lecciones/vocales/a/avion.jpg" },
    { palabra: "ala",      foto: "img/lecciones/vocales/a/ala.jpg" },
    { palabra: "agua",     foto: "img/lecciones/vocales/a/agua.jpg" },
    { palabra: "árbol",    foto: "img/lecciones/vocales/a/arbol.jpg" }
  ] },
  /* falta «espada»: no vino imagen. El enano es el de la lección de la n
     (un enano de cuento), no la foto de una persona real. */
  { vocal: "e", palabras: [
    { palabra: "elefante", foto: "img/lecciones/vocales/e/elefante.jpg" },
    { palabra: "enano",    foto: "img/lecciones/vocales/e/enano.jpg" },
    { palabra: "escoba",   foto: "img/lecciones/vocales/e/escoba.jpg" },
    { palabra: "escalera", foto: "img/lecciones/vocales/e/escalera.jpg" },
    { palabra: "espejo",   foto: "img/lecciones/vocales/e/espejo.jpg" },
    { palabra: "estrella", foto: "img/lecciones/vocales/e/estrella.jpg" }
  ] },
  { vocal: "i", palabras: [
    { palabra: "iglesia",  foto: "img/lecciones/vocales/i/iglesia.jpg" },
    { palabra: "isla",     foto: "img/lecciones/vocales/i/isla.jpg" },
    { palabra: "imán",     foto: "img/lecciones/vocales/i/iman.jpg" },
    { palabra: "indígena", foto: "img/lecciones/vocales/i/indigena.jpg" },
    { palabra: "iglú",     foto: "img/lecciones/vocales/i/iglu.jpg" },
    { palabra: "iguana",   foto: "img/lecciones/vocales/i/iguana.jpg" }
  ] },
  { vocal: "o", palabras: [
    { palabra: "ojo",      foto: "img/lecciones/vocales/o/ojo.jpg" },
    { palabra: "olla",     foto: "img/lecciones/vocales/o/olla.jpg" },
    { palabra: "oso",      foto: "img/lecciones/vocales/o/oso.jpg" },
    { palabra: "ola",      foto: "img/lecciones/vocales/o/ola.jpg" },
    { palabra: "oveja",    foto: "img/lecciones/vocales/o/oveja.jpg" },
    { palabra: "oreja",    foto: "img/lecciones/vocales/o/oreja.jpg" },
    { palabra: "ocho",     foto: "img/lecciones/vocales/o/ocho.jpg" }
  ] },
  /* el «uno» es un 1 en Quicksand hecho aquí: la imagen que vino era la
     carátula de un disco, con nombre y todo. */
  { vocal: "u", palabras: [
    { palabra: "uña",       foto: "img/lecciones/vocales/u/unia.jpg" },
    { palabra: "uva",       foto: "img/lecciones/vocales/u/uva.jpg" },
    { palabra: "uno",       foto: "img/lecciones/vocales/u/uno.jpg" },
    { palabra: "urraca",    foto: "img/lecciones/vocales/u/urraca.jpg" },
    { palabra: "uniforme",  foto: "img/lecciones/vocales/u/uniforme.jpg" },
    { palabra: "unicornio", foto: "img/lecciones/vocales/u/unicornio.jpg" },
    { palabra: "urna",      foto: "img/lecciones/vocales/u/urna.jpg" }
  ] }
];
