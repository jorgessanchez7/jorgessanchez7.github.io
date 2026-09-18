/* ============================================================
   biblioteca.js  -  Catalogo de libros del plan de lectura
   ------------------------------------------------------------
   Cada libro:
     id       : identificador para la URL  (libro.html?id=...)
     titulo   : nombre que se ve en el menu y en la portada
     autor    : credito
     edad     : rango sugerido
     resumen  : una linea para la tarjeta del menu
     color    : color de acento de la tarjeta
     portada  : SVG que se usa de miniatura y de portada
     paginas  : [{ texto, svg }]
   Para agregar un libro nuevo: copia un bloque y cambialo.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- utilidades de dibujo ---------- */
  function svg(inner) {
    return '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">' + inner + '</svg>';
  }
  function fondo(cielo, suelo) {
    return '<rect width="400" height="300" fill="' + cielo + '"/>' +
           '<path d="M0 218 Q 100 198 200 212 T 400 204 L400 300 L0 300 Z" fill="' + suelo + '"/>';
  }
  function sol(x, y) {
    x = x || 342; y = y || 48;
    return '<circle cx="' + x + '" cy="' + y + '" r="26" fill="#ffd34d"/>' +
           '<circle cx="' + x + '" cy="' + y + '" r="34" fill="#ffd34d" opacity=".28"/>';
  }
  function luna(x, y) {
    return '<path d="M' + x + ',' + (y - 24) + ' a24,24 0 1 0 18,42 a19,19 0 1 1 -18,-42z" fill="#fff0bd"/>';
  }
  function nube(x, y, s) {
    s = s || 1;
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" fill="#ffffff" opacity=".92">' +
      '<circle cx="0" cy="0" r="18"/><circle cx="22" cy="-8" r="24"/><circle cx="48" cy="2" r="17"/>' +
      '<rect x="-2" y="-2" width="52" height="20" rx="10"/></g>';
  }
  function nubeGris(x, y, s) {
    s = s || 1;
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" fill="#8f9bb3">' +
      '<circle cx="0" cy="0" r="20"/><circle cx="26" cy="-10" r="28"/><circle cx="56" cy="2" r="19"/>' +
      '<rect x="-2" y="-2" width="60" height="22" rx="11"/></g>';
  }
  function arbol(x, y, s) {
    s = s || 1;
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<rect x="-7" y="-34" width="14" height="40" rx="5" fill="#8a5a3b"/>' +
      '<circle cx="0" cy="-52" r="30" fill="#4f9d5d"/>' +
      '<circle cx="-22" cy="-40" r="20" fill="#5fb06c"/>' +
      '<circle cx="22" cy="-42" r="21" fill="#448c52"/></g>';
  }
  function arbusto(x, y, s) {
    s = s || 1;
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" fill="#5aa863">' +
      '<circle cx="0" cy="0" r="14"/><circle cx="16" cy="-4" r="17"/><circle cx="32" cy="2" r="12"/></g>';
  }
  function flor(x, y, c) {
    return '<g transform="translate(' + x + ',' + y + ')">' +
      '<rect x="-1.5" y="0" width="3" height="14" fill="#4f9d5d"/>' +
      '<circle cx="0" cy="-5" r="4" fill="' + c + '"/><circle cx="-6" cy="-1" r="4" fill="' + c + '"/>' +
      '<circle cx="6" cy="-1" r="4" fill="' + c + '"/><circle cx="0" cy="3" r="4" fill="' + c + '"/>' +
      '<circle cx="0" cy="-1" r="2.6" fill="#ffd34d"/></g>';
  }
  function piedra(x, y, s) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (16 * s) + '" ry="' + (9 * s) + '" fill="#b8b2a8"/>';
  }

  /* ---------- personajes ---------- */
  function cerdito(x, y, s, tono) {
    var a = tono || '#f6a5bb', b = '#e88aa4';
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<rect x="-20" y="14" width="10" height="20" rx="5" fill="' + b + '"/>' +
      '<rect x="6" y="14" width="10" height="20" rx="5" fill="' + b + '"/>' +
      '<path d="M-34,-6 q-13,3 -10,13" stroke="' + b + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="0" cy="0" rx="36" ry="26" fill="' + a + '"/>' +
      '<path d="M16,-26 l3,-15 l14,9 z" fill="' + b + '"/>' +
      '<path d="M45,-27 l11,-11 l3,15 z" fill="' + b + '"/>' +
      '<circle cx="31" cy="-10" r="21" fill="' + a + '"/>' +
      '<ellipse cx="47" cy="-6" rx="10" ry="8" fill="' + b + '"/>' +
      '<circle cx="44" cy="-6" r="1.9" fill="#7a4657"/><circle cx="50" cy="-6" r="1.9" fill="#7a4657"/>' +
      '<circle cx="26" cy="-16" r="2.6" fill="#4a2f3a"/><circle cx="38" cy="-17" r="2.6" fill="#4a2f3a"/>' +
      '</g>';
  }
  function lobo(x, y, s, flip) {
    var t = flip ? ' scale(-' + s + ',' + s + ')' : ' scale(' + s + ')';
    return '<g transform="translate(' + x + ',' + y + ')' + t + '">' +
      '<rect x="-24" y="14" width="10" height="22" rx="5" fill="#767c90"/>' +
      '<rect x="10" y="14" width="10" height="22" rx="5" fill="#767c90"/>' +
      '<path d="M-38,-8 q-18,-8 -20,8" stroke="#767c90" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="0" cy="0" rx="40" ry="25" fill="#8d93a6"/>' +
      '<path d="M20,-30 l-1,-17 l15,10 z" fill="#767c90"/>' +
      '<path d="M46,-31 l11,-13 l3,16 z" fill="#767c90"/>' +
      '<circle cx="35" cy="-14" r="20" fill="#8d93a6"/>' +
      '<path d="M47,-10 q17,-3 20,6 q-11,7 -20,2 z" fill="#767c90"/>' +
      '<circle cx="65" cy="-5" r="3.2" fill="#3c4151"/>' +
      '<circle cx="30" cy="-19" r="2.8" fill="#3c4151"/><circle cx="43" cy="-20" r="2.8" fill="#3c4151"/>' +
      '</g>';
  }
  function tortuga(x, y, s) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<rect x="-32" y="10" width="12" height="12" rx="5" fill="#9ad36f"/>' +
      '<rect x="16" y="10" width="12" height="12" rx="5" fill="#9ad36f"/>' +
      '<circle cx="46" cy="-6" r="12" fill="#9ad36f"/>' +
      '<circle cx="52" cy="-8" r="2.3" fill="#2c4a2a"/>' +
      '<ellipse cx="0" cy="2" rx="40" ry="14" fill="#7fbf5a"/>' +
      '<path d="M-36,2 a36,30 0 0 1 72,0 z" fill="#3f8f4f"/>' +
      '<path d="M-18,-11 l0,13 M0,-19 l0,21 M18,-11 l0,13" stroke="#2f6f3c" stroke-width="3"/>' +
      '</g>';
  }
  function liebre(x, y, s, flip) {
    var t = flip ? ' scale(-' + s + ',' + s + ')' : ' scale(' + s + ')';
    return '<g transform="translate(' + x + ',' + y + ')' + t + '">' +
      '<rect x="-16" y="12" width="10" height="18" rx="5" fill="#c3925a"/>' +
      '<rect x="8" y="12" width="10" height="18" rx="5" fill="#c3925a"/>' +
      '<circle cx="-36" cy="-2" r="8" fill="#f3e3cb"/>' +
      '<ellipse cx="0" cy="0" rx="33" ry="21" fill="#d9a86c"/>' +
      '<path d="M20,-30 q-5,-27 5,-29 q9,4 5,29 z" fill="#d9a86c"/>' +
      '<path d="M36,-31 q1,-26 11,-25 q6,7 -3,27 z" fill="#d9a86c"/>' +
      '<circle cx="30" cy="-15" r="17" fill="#d9a86c"/>' +
      '<circle cx="36" cy="-18" r="2.6" fill="#3c2a1a"/>' +
      '<ellipse cx="46" cy="-11" rx="4" ry="3" fill="#b46a72"/>' +
      '</g>';
  }
  function leon(x, y, s) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<rect x="-34" y="22" width="12" height="18" rx="6" fill="#d79f45"/>' +
      '<rect x="0" y="22" width="12" height="18" rx="6" fill="#d79f45"/>' +
      '<path d="M-52,4 q-16,6 -12,18" stroke="#d79f45" stroke-width="6" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="-10" cy="6" rx="44" ry="25" fill="#e8b45a"/>' +
      '<circle cx="42" cy="-8" r="31" fill="#c8832f"/>' +
      '<circle cx="42" cy="-8" r="21" fill="#f0c574"/>' +
      '<circle cx="35" cy="-12" r="2.8" fill="#4a2f10"/><circle cx="49" cy="-12" r="2.8" fill="#4a2f10"/>' +
      '<ellipse cx="42" cy="-3" rx="4.5" ry="3.2" fill="#8c5a20"/>' +
      '<path d="M36,2 q6,6 12,0" stroke="#8c5a20" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '</g>';
  }
  function raton(x, y, s) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<path d="M-19,2 q-15,3 -11,11" stroke="#8f93a6" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="0" cy="0" rx="20" ry="13" fill="#a9aec2"/>' +
      '<circle cx="9" cy="-15" r="7" fill="#c9cede"/><circle cx="23" cy="-14" r="6" fill="#c9cede"/>' +
      '<circle cx="17" cy="-5" r="11" fill="#a9aec2"/>' +
      '<circle cx="22" cy="-6" r="1.8" fill="#3c4151"/>' +
      '<circle cx="28" cy="-2" r="2.2" fill="#e08fa0"/>' +
      '</g>';
  }
  function gota(x, y, s, cara) {
    var boca = cara === 'asombro'
      ? '<ellipse cx="0" cy="16" rx="5" ry="6" fill="#123a4d"/>'
      : '<path d="M-8,14 q8,8 16,0" stroke="#123a4d" stroke-width="2.8" fill="none" stroke-linecap="round"/>';
    var ojos = cara === 'dormida'
      ? '<path d="M-13,6 q4,4 8,0 M5,6 q4,4 8,0" stroke="#123a4d" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
      : '<circle cx="-9" cy="5" r="3.2" fill="#123a4d"/><circle cx="9" cy="5" r="3.2" fill="#123a4d"/>';
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<path d="M0,-44 C 23,-15 31,-2 31,10 A31,31 0 0 1 -31,10 C -31,-2 -23,-15 0,-44 Z" fill="#5bbce4"/>' +
      '<path d="M-14,-6 a10,12 0 0 1 11,-9" stroke="#bfe8f7" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<circle cx="-18" cy="13" r="4.5" fill="#f09ba8" opacity=".55"/>' +
      '<circle cx="18" cy="13" r="4.5" fill="#f09ba8" opacity=".55"/>' +
      ojos + boca + '</g>';
  }
  function casa(x, y, s, tipo) {
    var m = { paja:     { muro: '#f0d195', techo: '#e4bb63', det: '#d8ab52' },
              madera:   { muro: '#c98b53', techo: '#a3663a', det: '#8f5730' },
              ladrillo: { muro: '#cf6b58', techo: '#8f4436', det: '#b35a49' } }[tipo];
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<rect x="-46" y="-40" width="92" height="70" rx="4" fill="' + m.muro + '"/>' +
      '<path d="M-58,-38 L0,-84 L58,-38 Z" fill="' + m.techo + '"/>' +
      '<rect x="-15" y="-6" width="30" height="36" rx="3" fill="#7b5a44"/>' +
      '<circle cx="9" cy="14" r="2.6" fill="#f6e3c8"/>' +
      '<rect x="19" y="-28" width="21" height="18" rx="3" fill="#bfe3f2" stroke="' + m.det + '" stroke-width="2"/>' +
      '<path d="M-40,-20 h24 M-40,-8 h18 M-40,4 h18" stroke="' + m.det + '" stroke-width="2.4" opacity=".8"/>' +
      '</g>';
  }
  function casaRota(x, y, s, tipo) {
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">';
    if (tipo === 'paja') {
      g += '<path d="M-54,30 q6,-26 26,-24 q6,-22 26,-15 q17,-15 29,7 q15,1 17,32 z" fill="#e4bb63"/>' +
           '<path d="M-36,22 l22,-11 M-4,26 l24,-9 M22,28 l20,-7 M-46,28 l14,-7" stroke="#d8ab52" stroke-width="3" stroke-linecap="round"/>' +
           '<path d="M-44,2 l-16,-16 M-10,-12 l-7,-23 M26,-10 l16,-19 M50,8 l20,-10" stroke="#e4bb63" stroke-width="5" stroke-linecap="round"/>';
    } else {
      g += '<g stroke="#a3663a" stroke-width="10" stroke-linecap="round" fill="none">' +
           '<path d="M-46,26 l42,-15"/><path d="M-12,29 l46,-23"/><path d="M4,13 l40,17"/><path d="M-36,7 l32,20"/></g>' +
           '<path d="M52,-6 l18,-16 M-58,2 l-16,-14 M10,-18 l4,-20" stroke="#a3663a" stroke-width="6" stroke-linecap="round"/>';
    }
    return g + '</g>';
  }
  function viento(x, y, s) {
    s = s || 1;
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85">' +
      '<path d="M0,0 q40,-10 76,0"/><path d="M6,18 q40,-10 70,0"/><path d="M2,-18 q34,-8 60,0"/></g>';
  }
  function lluvia(op) {
    var s = '', i;
    for (i = 0; i < 26; i++) {
      var x = 12 + (i * 37) % 380, y = 60 + (i * 53) % 150;
      s += '<path d="M' + x + ',' + y + ' l-3,12" stroke="#7fc9ea" stroke-width="3" stroke-linecap="round" opacity="' + (op || 0.9) + '"/>';
    }
    return s;
  }

  var VERDE = '#8fd07a', CIELO = '#bfe6f5', CIELO2 = '#a9d9ee', PASTO = '#79c169';

  /* ============================================================
     LIBRO 1 - Los tres cerditos
     Texto propio. Ilustraciones: laminas de Orientacion Andujar,
     publicadas bajo Creative Commons BY-NC-SA 3.0.
     ============================================================ */
  var LAM = "img/tres-cerditos/";
  var PZ  = "img/tres-cerditos/piezas/";


  var tresCerditos = {
    id: "tres-cerditos",
    titulo: "Los tres cerditos",
    autor: "Cuento tradicional",
    edad: "3 a 8 años",
    resumen: "Tres hermanos, tres casas y un lobo con mucho aire.",
    color: "#f6a5bb",
    portadaImagen: LAM + "01.jpg",
    credito: {
      texto: "Ilustraciones: Orientación Andújar · CC BY-NC-SA 3.0",
      url: "https://www.orientacionandujar.es/2022/01/10/laminas-para-trabajar-el-cuento-de-los-tres-cerditos/"
    },
    actividades: [
      {
        tipo: "unir",
        consigna: "Une cada cerdito con su casa.",
        izq: [
          { id: "mayor",   etiqueta: "El cerdito mayor",   img: PZ + "cerdo-mayor.jpg" },
          { id: "pequeno", etiqueta: "El cerdito pequeño", img: PZ + "cerdo-menor.jpg" },
          { id: "mediano", etiqueta: "El cerdito mediano", img: PZ + "cerdo-medio.jpg" }
        ],
        der: [
          { id: "pequeno", etiqueta: "Casa de paja",      img: PZ + "casa-paja.jpg" },
          { id: "mediano", etiqueta: "Casa de madera",    img: PZ + "casa-madera.jpg" },
          { id: "mayor",   etiqueta: "Casa de ladrillos", img: PZ + "casa-ladrillos.jpg" }
        ]
      },
      {
        tipo: "marcar",
        consigna: "¿Con qué hicieron sus casas? Toca los tres materiales del cuento.",
        opciones: [
          { texto: "Paja", ok: true },
          { texto: "Vidrio", ok: false },
          { texto: "Madera", ok: true },
          { texto: "Lana", ok: false },
          { texto: "Ladrillos", ok: true },
          { texto: "Papel", ok: false }
        ]
      },
      {
        tipo: "palabras",
        consigna: "La cajita de palabras. Toca una tarjeta para oírla.",
        tarjetas: [
          { palabra: "CERDITOS",  img: PZ + "voc-cerditos.jpg" },
          { palabra: "LOBO",      img: PZ + "voc-lobo.jpg" },
          { palabra: "PAJA",      img: PZ + "voc-paja.jpg" },
          { palabra: "MADERA",    img: PZ + "voc-madera.jpg" },
          { palabra: "LADRILLOS", img: PZ + "voc-ladrillos.jpg" },
          { palabra: "CHIMENEA",  img: PZ + "voc-chimenea.jpg" },
          { palabra: "OLLA",      img: PZ + "voc-olla.jpg" },
          { palabra: "BOSQUE",    img: PZ + "voc-bosque.jpg" }
        ]
      }
    ],
    paginas: [
      { imagen: LAM + "02.jpg",
        texto: "En el bosque vivían tres cerditos que eran hermanos. En ese mismo bosque vivía un lobo, y el lobo siempre andaba detrás de ellos." },

      { imagen: LAM + "03.jpg",
        texto: "—Ya sé qué vamos a hacer —dijo uno—. Cada quien se construye una casa. Así el lobo no nos alcanza." },

      { imagen: LAM + "04.jpg",
        texto: "El más pequeño juntó paja, para acabar rápido y salir a jugar. El mediano juntó palos de madera. El mayor cargó sus ladrillos uno por uno, todo el día." },

      { imagen: LAM + "05.jpg",
        texto: "Las tres casas quedaron listas. —Ya van a ver lo que hace el lobo con esas casas —dijo el mayor. Los otros dos se rieron y se fueron a jugar." },

      { imagen: LAM + "06.jpg",
        texto: "Una mañana el lobo salió detrás del cerdito pequeño. El cerdito corrió y se metió en su casa de paja. El lobo tomó aire…" },

      { imagen: LAM + "07.jpg",
        estribillo: ["Y el lobo sopló,", "y sopló,", "y la casita de paja derrumbó."] },

      { imagen: LAM + "08.jpg",
        texto: "El cerdito pequeño corrió a la casa de madera de su hermano. El lobo llegó detrás. Y otra vez tomó aire…" },

      { imagen: LAM + "09.jpg",
        estribillo: ["Y el lobo sopló,", "y sopló,", "y la casita de madera derrumbó."] },

      { imagen: LAM + "10.jpg",
        texto: "Los dos cerditos corrieron sin aliento hasta la casa del hermano mayor. Entraron y cerraron bien todas las puertas y todas las ventanas." },

      { imagen: LAM + "11.jpg",
        estribillo: ["Y el lobo sopló,", "y sopló,", "y sopló…", "y la casa de ladrillos no se movió."] },

      { imagen: LAM + "12.jpg",
        texto: "Entonces el lobo trepó por la pared hasta el tejado. Iba a meterse por la chimenea." },

      { imagen: LAM + "13.jpg",
        texto: "Pero adentro, el cerdito mayor puso al fuego una olla grande llena de agua." },

      { imagen: LAM + "14.jpg",
        texto: "El lobo bajó por la chimenea y cayó justo en el agua caliente. Salió corriendo, dando unos aullidos que se oyeron en todo el bosque." },

      { imagen: LAM + "15.jpg",
        texto: "Nunca más volvió a perseguir cerditos. Y los tres hermanos se quedaron a vivir juntos en la casa de ladrillos." }
    ]
  };

  /* --- utilidades extra para los siguientes cuentos --- */
  function bandera(x, y, s) {
    s = s || 1;
    var c = '', i, j;
    for (i = 0; i < 4; i++) for (j = 0; j < 3; j++)
      c += '<rect x="' + (i * 13) + '" y="' + (j * 13) + '" width="13" height="13" fill="' + ((i + j) % 2 ? '#ffffff' : '#3c4151') + '"/>';
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<rect x="-4" y="-56" width="7" height="86" rx="3" fill="#8a5a3b"/>' +
      '<g transform="translate(3,-56)">' + c + '</g></g>';
  }
  function montania(x, y, s, c1, c2) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<path d="M-120,0 L-30,-110 L60,0 Z" fill="' + c1 + '"/>' +
      '<path d="M-30,-110 L-58,-76 L-30,-64 L-4,-78 Z" fill="#ffffff"/>' +
      '<path d="M-10,0 L70,-84 L140,0 Z" fill="' + c2 + '"/></g>';
  }
  function vaporcitos(x, y) {
    var s = '', i;
    for (i = 0; i < 6; i++)
      s += '<circle cx="' + (x + (i % 2 ? 14 : -10)) + '" cy="' + (y - i * 22) + '" r="' + (4 + i * 1.4) + '" fill="#cfeaf7" opacity="' + (0.85 - i * 0.1) + '"/>';
    return s;
  }
  function rio(y) {
    return '<path d="M0,' + y + ' Q 90,' + (y - 14) + ' 190,' + y + ' T 400,' + (y - 6) + ' L400,300 L0,300 Z" fill="#5bbce4"/>' +
      '<path d="M40,' + (y + 22) + ' q22,-8 44,0 M180,' + (y + 34) + ' q22,-8 44,0 M280,' + (y + 18) + ' q22,-8 44,0" stroke="#9adcf3" stroke-width="4" fill="none" stroke-linecap="round"/>';
  }

  /* ============================================================
     LIBRO 2 - La liebre y la tortuga
     Texto propio. Ilustraciones de la carpeta del padre.
     ============================================================ */
  var LT  = "img/liebre-tortuga/";
  var LTP = "img/liebre-tortuga/piezas/";

  var liebreTortuga = {
    id: "liebre-y-tortuga",
    titulo: "La liebre y la tortuga",
    autor: "Fábula de Esopo",
    edad: "3 a 8 años",
    resumen: "Una carrera que no gana el más rápido.",
    color: "#7fbf5a",
    portadaImagen: LT + "00.jpg",
    actividades: [
      {
        tipo: "preguntas",
        consigna: "Una pregunta de lo que acabamos de leer.",
        despuesDePagina: 2,
        preguntas: [
          { texto: "¿Por qué la tortuga retó a la liebre?",
            opciones: [
              { texto: "Porque se cansó de que se burlara de ella.", ok: true },
              { texto: "Porque quería ganarse un premio." },
              { texto: "Porque la liebre estaba dormida." }
            ] }
        ]
      },
      {
        tipo: "preguntas",
        consigna: "Toca la respuesta.",
        preguntas: [
          { texto: "¿Quién ganó la carrera?",
            opciones: [
              { texto: "La liebre", img: LTP + "liebre.jpg" },
              { texto: "La tortuga", img: LTP + "tortuga.jpg", ok: true }
            ] },
          { texto: "¿Quién se durmió en el camino?",
            opciones: [
              { texto: "La liebre", img: LTP + "liebre.jpg", ok: true },
              { texto: "La tortuga", img: LTP + "tortuga.jpg" }
            ] }
        ]
      },
      {
        tipo: "preguntas",
        consigna: "Ahora dos preguntas del final.",
        preguntas: [
          { texto: "¿Por qué la liebre se puso a dormir?",
            opciones: [
              { texto: "Porque iba tan adelante que se confió.", ok: true },
              { texto: "Porque estaba enferma." },
              { texto: "Porque la tortuga se lo pidió." }
            ] },
          { texto: "¿Por qué ganó la tortuga?",
            opciones: [
              { texto: "Porque corrió más rápido que la liebre." },
              { texto: "Porque siguió caminando sin parar.", ok: true },
              { texto: "Porque la liebre se perdió en el bosque." }
            ] }
        ]
      },
      {
        tipo: "ordenar",
        consigna: "Toca las escenas en el orden del cuento.",
        escenas: [
          { n: 1, img: LT + "01.jpg" }, { n: 2, img: LT + "02.jpg" },
          { n: 3, img: LT + "03.jpg" }, { n: 4, img: LT + "04.jpg" },
          { n: 5, img: LT + "05.jpg" }, { n: 6, img: LT + "06.jpg" }
        ]
      }
    ],
    paginas: [
      { imagen: LT + "01.jpg",
        texto: "Había una vez una liebre muy orgullosa. Se paraba delante de todos los animales del bosque a presumir: —¡Soy la más rápida de todas!" },

      { imagen: LT + "02.jpg",
        texto: "La tortuga se cansó de tantas burlas y se le plantó enfrente. —Te reto a una carrera —le dijo. La liebre se rió tanto que aceptó." },

      { imagen: LT + "03.jpg",
        texto: "Empezó la carrera. La liebre salió disparada por el camino. La tortuga dio su primer pasito, despacio, sin afanarse." },

      { imagen: LT + "04.jpg",
        texto: "La liebre iba tan adelante que pensó: —Me sobra tiempo para una siesta. Se acostó bajo un árbol y se quedó dormida." },

      { imagen: LT + "05.jpg",
        texto: "La tortuga siguió caminando. Paso a paso, sin parar. Pasó al lado de la liebre dormida y no se detuvo." },

      { imagen: LT + "06.jpg",
        texto: "La liebre despertó con el ruido de la fiesta. Corrió con todas sus fuerzas, pero ya era tarde: la tortuga había cruzado la meta." }
    ]
  };

  /* ============================================================
     LIBRO 3 - El león y el ratón
     Texto propio. Ilustraciones de la carpeta del padre.
     ============================================================ */
  var LR  = "img/leon-raton/";
  var LRP = "img/leon-raton/piezas/";

  var leonRaton = {
    id: "leon-y-raton",
    titulo: "El león y el ratón",
    autor: "Fábula de Esopo",
    edad: "3 a 8 años",
    resumen: "Los amigos pequeños también hacen cosas grandes.",
    color: "#e8b45a",
    portadaImagen: LR + "00.jpg",
    actividades: [
      {
        tipo: "preguntas",
        consigna: "Completa la frase.",
        despuesDePagina: 2,
        preguntas: [
          { texto: "Al principio del cuento, el león estaba…", cortas: true,
            opciones: [ { texto: "cazando" }, { texto: "durmiendo", ok: true }, { texto: "comiendo" } ] },
          { texto: "Cuando despertó, el león se puso…", cortas: true,
            opciones: [ { texto: "contento" }, { texto: "asustado" }, { texto: "furioso", ok: true } ] }
        ]
      },
      {
        tipo: "preguntas",
        consigna: "Toca la respuesta.",
        preguntas: [
          { texto: "¿Quién estaba durmiendo al principio?",
            opciones: [
              { texto: "El león", img: LRP + "leon.jpg", ok: true },
              { texto: "El ratón", img: LRP + "raton.jpg" }
            ] },
          { texto: "¿Quién rompió la red?",
            opciones: [
              { texto: "El león", img: LRP + "leon.jpg" },
              { texto: "El ratón", img: LRP + "raton.jpg", ok: true }
            ] }
        ]
      },
      {
        tipo: "preguntas",
        consigna: "Completa la frase.",
        preguntas: [
          { texto: "El ratón le prometió al león que algún día lo…", cortas: true,
            opciones: [ { texto: "visitaría" }, { texto: "ayudaría", ok: true }, { texto: "invitaría" } ] },
          { texto: "El león quedó atrapado en…", cortas: true,
            opciones: [ { texto: "un hueco" }, { texto: "una jaula" }, { texto: "una red", ok: true } ] },
          { texto: "El ratón rompió las cuerdas con sus…", cortas: true,
            opciones: [ { texto: "patas" }, { texto: "uñas" }, { texto: "dientes", ok: true } ] }
        ]
      },
      {
        tipo: "ordenar",
        consigna: "Toca las escenas en el orden del cuento.",
        escenas: [
          { n: 1, img: LR + "01.jpg" }, { n: 2, img: LR + "02.jpg" },
          { n: 3, img: LR + "03.jpg" }, { n: 4, img: LR + "04.jpg" },
          { n: 5, img: LR + "05.jpg" }, { n: 6, img: LR + "06.jpg" }
        ]
      }
    ],
    paginas: [
      { imagen: LR + "01.jpg",
        texto: "Después de un largo día de caza, un león se echó a dormir bajo un árbol. Un ratoncito jugaba encima de él, subiendo y bajando por su lomo." },

      { imagen: LR + "02.jpg",
        texto: "El león despertó de un salto y lo atrapó con la zarpa. —¡Perdóneme! —chilló el ratón—. Si algún día usted necesita ayuda, yo le ayudaré. El león se rió tanto de la idea que lo dejó ir." },

      { imagen: LR + "03.jpg",
        texto: "Pasaron los días. Unos cazadores tendieron una red en el bosque, y el león cayó adentro. Por más que empujaba, no lograba salir." },

      { imagen: LR + "04.jpg",
        texto: "El león rugió tan fuerte que se oyó en todo el bosque. El ratoncito reconoció ese rugido y corrió a buscarlo." },

      { imagen: LR + "05.jpg",
        texto: "Con sus dientes pequeñitos, el ratón mordió las cuerdas una y otra vez. Mordió y mordió hasta que la red se rompió." },

      { imagen: LR + "06.jpg",
        texto: "El león quedó libre. —Ya ves —dijo el ratón—. Los amigos pequeños también hacen cosas grandes. Y desde ese día fueron muy buenos amigos." }
    ]
  };

  /* --- utilidades del cuento del agua --- */
  function ciudad(x, y, s) {
    s = s || 1;
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" fill="#7d8ba6">' +
      '<rect x="0" y="-60" width="34" height="60"/><rect x="40" y="-92" width="30" height="92"/>' +
      '<rect x="76" y="-46" width="38" height="46"/><rect x="120" y="-74" width="28" height="74"/>' +
      '<g fill="#ffe9a8"><rect x="8" y="-50" width="8" height="8"/><rect x="20" y="-34" width="8" height="8"/>' +
      '<rect x="48" y="-80" width="8" height="8"/><rect x="58" y="-58" width="8" height="8"/>' +
      '<rect x="86" y="-36" width="8" height="8"/><rect x="128" y="-62" width="8" height="8"/></g></g>';
  }
  function vaso(x, y, s) {
    s = s || 1;
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' +
      '<path d="M-20,-46 L20,-46 L15,0 L-15,0 Z" fill="#e8f6fc" stroke="#b9dcea" stroke-width="3"/>' +
      '<path d="M-17,-22 L17,-22 L15,0 L-15,0 Z" fill="#5bbce4"/></g>';
  }

  /* ============================================================
     LIBRO 4 - Gotita da la vuelta al mundo  (cuento original)
     ============================================================ */
  var gotita = {
    id: "gotita",
    titulo: "Gotita da la vuelta al mundo",
    autor: "Cuento original de papá",
    edad: "4 a 8 años",
    resumen: "El viaje de una gota de agua: río, nube, lluvia y otra vez río.",
    color: "#5bbce4",
    portada: svg('<rect width="400" height="300" fill="#bfe6f5"/>' + sol(62, 48) + nube(250, 54, .9) +
                 rio(200) + piedra(90, 216, 1) + piedra(310, 224, .9) + gota(200, 150, 1.5)),
    paginas: [
      { texto: "Gotita vivía en el río, saltando entre las piedras con sus amigas.",
        svg: svg('<rect width="400" height="300" fill="#bfe6f5"/>' + sol() + nube(60, 52, .9) + montania(60, 200, .5, "#9fb4c9", "#8aa1b8") +
                 rio(198) + piedra(80, 214, 1) + piedra(300, 226, .9) + gota(190, 186, 1.1) + gota(280, 200, .55) + gota(110, 204, .5)) },

      { texto: "Una mañana el sol la calentó tanto, tanto, que Gotita empezó a subir, subir y subir.",
        svg: svg('<rect width="400" height="300" fill="#cfeaf7"/>' + sol(320, 50) +
                 '<g stroke="#ffd34d" stroke-width="5" stroke-linecap="round" opacity=".8"><path d="M300,80 L250,130"/><path d="M320,90 L280,150"/><path d="M336,100 L300,160"/></g>' +
                 rio(214) + vaporcitos(150, 200) + gota(150, 150, 1.1, "asombro")) },

      { texto: "—¡Estoy volando! —gritó Gotita mientras se convertía en vapor y se hacía invisible.",
        svg: svg('<rect width="400" height="300" fill="#d8f0fa"/>' + sol(60, 50) + nube(280, 70, .8) +
                 rio(252) + vaporcitos(200, 250) + vaporcitos(120, 260) + gota(210, 120, 1.25)) },

      { texto: "Allá arriba hacía frío. Gotita se juntó con miles de gotitas más y juntas formaron una nube.",
        svg: svg('<rect width="400" height="300" fill="#a9d9ee"/>' + sol(50, 46) +
                 nube(140, 140, 2.1) + gota(200, 130, .9) + gota(150, 150, .5) + gota(250, 152, .45) +
                 '<g fill="#ffffff" opacity=".6"><circle cx="330" cy="230" r="14"/><circle cx="60" cy="236" r="10"/></g>') },

      { texto: "La nube viajó sobre montañas y ciudades, cada vez más gordita y más gris.",
        svg: svg('<rect width="400" height="300" fill="#9fc3da"/>' + montania(150, 240, .8, "#7f96ad", "#6d869e") +
                 ciudad(236, 240, .8) + nubeGris(90, 90, 1.6) + gota(150, 90, .8)) },

      { texto: "Hasta que... ¡plaf! Gotita se cayó del cielo convertida en lluvia.",
        svg: svg('<rect width="400" height="300" fill="#8fb6cf"/>' + nubeGris(120, 56, 1.5) + lluvia(.85) +
                 '<path d="M0 250 Q 100 236 200 248 T 400 240 L400 300 L0 300 Z" fill="#5f8f5a"/>' +
                 gota(220, 180, 1.1, "asombro")) },

      { texto: "Cayó en la montaña y bajó dando tumbos por una quebrada, entre las piedras y la espuma.",
        svg: svg('<rect width="400" height="300" fill="#b9d5ea"/>' + montania(120, 210, .95, "#8aa1b8", "#7a92aa") +
                 '<path d="M150,120 q20,50 -10,80 q-30,40 10,100 L120,300 L60,300 Z" fill="#5bbce4" opacity=".95"/>' +
                 piedra(180, 262, 1) + piedra(260, 276, .8) + gota(130, 210, .95)) },

      { texto: "Regó un jardín, llenó un vaso de agua fresca y ayudó a que creciera un árbol muy grande.",
        svg: svg(fondo(CIELO, PASTO) + sol() + nube(50, 50, .8) + arbol(300, 224, 1.05) +
                 vaso(90, 224, 1.1) + flor(170, 250, "#ff8fab") + flor(200, 258, "#ffd34d") + flor(230, 248, "#c99bf0") +
                 gota(140, 190, .8)) },

      { texto: "Después bajó y bajó hasta volver al río, justo donde había empezado todo.",
        svg: svg('<rect width="400" height="300" fill="#bfe6f5"/>' + sol(330, 50) + nube(70, 52, .9) + montania(70, 190, .45, "#9fb4c9", "#8aa1b8") +
                 rio(196) + piedra(90, 212, 1) + gota(200, 184, 1.15) + gota(290, 200, .55)) },

      { texto: "—Mañana lo hago otra vez —dijo Gotita—. Porque el agua siempre vuelve a empezar.",
        svg: svg('<rect width="400" height="300" fill="#bfe6f5"/>' + sol(330, 48) + nube(110, 56, 1) +
                 '<g stroke="#7fc9ea" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9">' +
                 '<path d="M120,96 q120,-40 190,30" stroke-dasharray="10 12"/>' +
                 '<path d="M304,118 l6,14 l-16,-2 z" fill="#7fc9ea" stroke="none"/></g>' +
                 rio(206) + gota(200, 190, 1.3) + flor(40, 270, "#ff8fab")) }
    ]
  };

  /* ============================================================
     Catálogo final (el orden es el que se ve en el menú)
     ============================================================ */
  /* ============================================================
     LIBRO 5 - El renacuajo paseador (Rin Rin Renacuajo)
     Texto de Rafael Pombo (1833-1912), dominio publico.
     Tomado del PDF de la carpeta; solo se normalizo la puntuacion.
     Ilustraciones: vinetas de trazo de la carpeta del padre.
     ============================================================ */
  var RR  = "img/rinrin/";
  var RRP = "img/rinrin/piezas/";

  var rinRin = {
    id: "rin-rin-renacuajo",
    titulo: "El renacuajo paseador",
    autor: "Rafael Pombo",
    edad: "Para leer en voz alta",
    resumen: "Rin Rin sale de fiesta sin permiso de su mamá.",
    color: "#6aa84f",
    portadaImagen: RR + "00.jpg",
    actividades: [
      {
        tipo: "preguntas",
        consigna: "El poema rima. ¿Cuál suena parecido?",
        despuesDePagina: 2,
        preguntas: [
          { texto: "¿Cuál rima con renacuajo?", cortas: true,
            opciones: [ { texto: "rana" }, { texto: "majo", ok: true }, { texto: "sombrero" } ] },
          { texto: "¿Cuál rima con moda?", cortas: true,
            opciones: [ { texto: "boda", ok: true }, { texto: "mano" }, { texto: "corbata" } ] }
        ]
      },
      {
        tipo: "preguntas",
        consigna: "Toca la respuesta.",
        preguntas: [
          { texto: "¿Quién salió a pasear muy elegante?",
            opciones: [
              { texto: "El renacuajo", img: RRP + "renacuajo.jpg", ok: true },
              { texto: "El ratón", img: RRP + "raton.jpg" },
              { texto: "El gato", img: RRP + "gato.jpg" }
            ] },
          { texto: "¿Quién llegó a dañar la fiesta?",
            opciones: [
              { texto: "El renacuajo", img: RRP + "renacuajo.jpg" },
              { texto: "El ratón", img: RRP + "raton.jpg" },
              { texto: "El gato", img: RRP + "gato.jpg", ok: true }
            ] }
        ]
      },
      {
        tipo: "preguntas",
        consigna: "Palabras de antes. ¿Qué querrán decir?",
        preguntas: [
          { texto: "Una chupa es…", cortas: true,
            opciones: [ { texto: "una chaqueta", ok: true }, { texto: "un sombrero" }, { texto: "un zapato" } ] },
          { texto: "Estar orondo es estar…", cortas: true,
            opciones: [ { texto: "muy triste" }, { texto: "muy orgulloso", ok: true }, { texto: "muy cansado" } ] },
          { texto: "El aldabón sirve para…", cortas: true,
            opciones: [ { texto: "tocar la puerta", ok: true }, { texto: "abrir la ventana" }, { texto: "colgar la ropa" } ] },
          { texto: "El gaznate es…", cortas: true,
            opciones: [ { texto: "la mano" }, { texto: "el sombrero" }, { texto: "la garganta", ok: true } ] }
        ]
      },
      {
        tipo: "ordenar",
        consigna: "Toca las escenas en el orden del poema.",
        escenas: [
          { n: 1, img: RR + "01.jpg" }, { n: 2, img: RR + "02.jpg" },
          { n: 3, img: RR + "03.jpg" }, { n: 4, img: RR + "07.jpg" },
          { n: 5, img: RR + "08.jpg" }, { n: 6, img: RR + "09.jpg" }
        ]
      }
    ],
    paginas: [
      { imagen: RR + "01.jpg", verso: [
        "El hijo de rana, Rinrín renacuajo",
        "salió esta mañana muy tieso y muy majo",
        "con pantalón corto, corbata a la moda,",
        "sombrero encintado y chupa de boda.",
        "",
        "—¡Muchacho, no salgas! —le grita mamá,",
        "pero él hace un gesto y orondo se va." ] },

      { imagen: RR + "02.jpg", verso: [
        "Halló en el camino a un ratón vecino,",
        "y le dijo: —¡Amigo! Venga usted conmigo,",
        "visitemos juntos a doña Ratona,",
        "y habrá francachela y habrá comilona." ] },

      { imagen: RR + "03.jpg", verso: [
        "A poco llegaron, y avanza Ratón,",
        "estírase el cuello, coge el aldabón,",
        "da dos o tres golpes, preguntan: —¿Quién es?",
        "—Yo, doña Ratona, beso a usted los pies." ] },

      { imagen: RR + "04.jpg", verso: [
        "—¿Está usted en casa? —Sí, señor, sí estoy,",
        "y celebro mucho ver a ustedes hoy;",
        "estaba en mi oficio, hilando algodón,",
        "pero eso no importa; bienvenidos son." ] },

      { imagen: RR + "05.jpg", verso: [
        "Se hicieron la venia, se dieron la mano,",
        "y dice Ratico, que es más veterano:",
        "—Mi amigo el de verde rabia de calor,",
        "démele cerveza, hágame el favor." ] },

      { imagen: RR + "06.jpg", verso: [
        "Y en tanto que el pillo consume la jarra,",
        "mandó la señora traer la guitarra",
        "y a Renacuajo le pide que cante",
        "versitos alegres, tonada elegante." ] },

      { imagen: RR + "07.jpg", verso: [
        "—¡Ay! De mil amores lo hiciera, señora,",
        "pero es imposible darle gusto ahora,",
        "que tengo el gaznate más seco que estopa",
        "y me aprieta mucho esta nueva ropa.",
        "",
        "—Lo siento infinito —responde tía Rata—,",
        "aflójese un poco chaleco y corbata,",
        "y yo, mientras tanto, les voy a cantar",
        "una cancioncita muy particular." ] },

      { imagen: RR + "08.jpg", verso: [
        "Mas estando en esta brillante función",
        "de baile y cerveza, guitarra y canción,",
        "la Gata y sus Gatos salvan el umbral,",
        "y vuélvese aquello el juicio final.",
        "",
        "Doña Gata vieja trinchó por la oreja",
        "al niño Ratico, maullándole: —¡Hola!",
        "Y los niños Gatos a la vieja Rata,",
        "uno por la pata y otro por la cola." ] },

      { imagen: RR + "09.jpg", verso: [
        "Don Renacuajito, mirando este asalto,",
        "tomó su sombrero, dio un tremendo salto,",
        "y abriendo la puerta con mano y narices,",
        "se fue dando a todos «noches muy felices».",
        "",
        "Y siguió saltando tan alto y aprisa,",
        "que perdió el sombrero, rasgó la camisa,",
        "se coló en la boca de un pato tragón",
        "y éste se lo embucha de un solo estirón." ] },

      { imagen: RR + "10.jpg", verso: [
        "Y así concluyeron, uno, dos y tres,",
        "Ratón y Ratona, y el Rana después;",
        "los Gatos comieron y el Pato cenó,",
        "¡y mamá Ranita solita quedó!" ] }
    ]
  };

  window.BIBLIOTECA = [tresCerditos, liebreTortuga, leonRaton, rinRin, gotita];

  // Los ayudantes de dibujo quedan disponibles para las actividades
  window.DIBUJO = {
    svg: svg, fondo: fondo, sol: sol, luna: luna, nube: nube, nubeGris: nubeGris,
    lluvia: lluvia, viento: viento, arbol: arbol, arbusto: arbusto, flor: flor,
    piedra: piedra, montania: montania, rio: rio, ciudad: ciudad, vaso: vaso,
    bandera: bandera, vaporcitos: vaporcitos, cerdito: cerdito, lobo: lobo,
    tortuga: tortuga, liebre: liebre, leon: leon, raton: raton, gota: gota,
    casa: casa, casaRota: casaRota
  };
})();
