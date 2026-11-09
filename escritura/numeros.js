/* ============================================================
   numeros.js - las lecciones de los números.

   Tres cosas en cada lección, las que el padre recuerda de su
   propia escuela: contar la cantidad, el nombre del número en
   letras y el número escrito. Y una cuarta que es la que más le
   cuesta a Chepe: escribirlo.

   El orden es 1, 2, … 9, después el 0, el 10 y del 11 al 20: cada
   número es el anterior más uno, y el 10 necesita el 0 ya visto,
   porque se escribe con el 1 y el 0.

   LA FORMA DE LOS NÚMEROS. Se dibujan con trazos, igual que las
   letras, y no con la fuente: Quicksand hace el 3 con la parte de
   arriba plana (como una z) y el 4 cerrado, y en la escuela los
   enseñan con dos barrigas y abierto. El padre escogió la forma de
   la escuela y la confirmó el 8 nov: el 1 es un palito, el 3 lleva
   dos barrigas, el 4 va abierto y el 7 lleva la rayita en la mitad.
   Si algo cambia, se cambia aquí y se regeneran los PDF.

   Por eso en las páginas de números el número NUNCA va en texto:
   va dibujado con estos mismos trazos (DIBUJO de abajo). Si fuera
   en texto, saldría el 3 de Quicksand al lado del 3 de la plana, y
   ese es justo el problema de la «a» que ya se arregló una vez.

   Celda de 96 x 130, como las letras. El número va de y=40 a y=110
   (la altura de los números en Quicksand es 0,70 em). Del 10 al 20
   van en una celda de 150, como la rr, armados con dos de los de una
   cifra (ver armar()).
   ============================================================ */
(function () {
  "use strict";

  /* ---------- los trazos de cada número ---------- */

  var CERO = "C36 40 28 56 28 75 C28 94 36 110 48 110 C60 110 68 94 68 75 C68 56 60 40 48 40";

  var TRAZOS = {
    "1": [ { d: "M48 40 L48 110", ini: [48, 40], ang: 90 } ],
    "2": [ { d: "M29 56 C29 45 37 40 48 40 C60 40 67 47 67 57 C67 68 58 77 29 110 L70 110",
             ini: [29, 56], ang: -90 } ],
    "3": [ { d: "M30 47 C35 42 41 40 48 40 C59 40 66 46 66 56 C66 66 58 73 46 73 " +
                "C59 73 68 81 68 92 C68 103 59 110 47 110 C39 110 32 107 28 101",
             ini: [30, 47], ang: -45 } ],
    "4": [ { d: "M36 40 L28 87 L72 87", ini: [36, 40], ang: 100 },
           { d: "M60 40 L60 110", ini: [60, 40], ang: 90 } ],
    "5": [ { d: "M33 40 L31 71 C37 66 43 64 50 64 C61 64 69 72 69 87 " +
                "C69 101 60 110 48 110 C39 110 32 106 28 100",
             ini: [33, 40], ang: 94, insignia: [-15, 2] },
           { d: "M33 40 L67 40", ini: [33, 40], ang: 0, insignia: [4, -15] } ],
    "6": [ { d: "M64 45 C59 41 54 40 49 40 C36 40 29 54 29 75 C29 97 37 110 49 110 " +
                "C61 110 69 102 69 90 C69 78 61 70 49 70 C40 70 32 76 29 84",
             ini: [64, 45], ang: 219 } ],
    /* el 7 con la rayita en la mitad: así lo escribe la profesora */
    "7": [ { d: "M28 40 L70 40 L42 110", ini: [28, 40], ang: 0 },
           { d: "M44 76 L68 76", ini: [44, 76], ang: 0, insignia: [-14, 0] } ],
    "8": [ { d: "M64 49 C61 43 55 40 48 40 C38 40 31 46 31 56 C31 66 39 71 48 74 " +
                "C59 77 68 83 68 94 C68 104 59 110 48 110 C37 110 28 104 28 94 " +
                "C28 83 37 77 48 74 C57 71 65 66 65 56 C65 53 65 51 64 49",
             ini: [64, 49], ang: 243 } ],
    "9": [ { d: "M66 50 C63 44 57 40 48 40 C37 40 29 48 29 58 C29 69 37 76 48 76 " +
                "C58 76 66 69 66 56 L66 110",
             ini: [66, 50], ang: 244 } ],
    "0": [ { d: "M48 40 " + CERO, ini: [48, 40], ang: 180 } ]
  };

  /* ---------- los de dos cifras se arman, no se dibujan ----------

     Del 10 al 20 cada número es dos de los de arriba, uno al lado del
     otro, centrados en una celda de 150. Así el 1 del 14 es exactamente
     el mismo 1 del 1, y el 4 el mismo 4: no hay un dibujo nuevo que
     aprender. CAJA es dónde empieza y termina cada número a lo ancho;
     entre los dos van 12 de aire, y 28 detrás del 1, que es un palito
     sin ancho y con 12 quedaría pegado. */

  var CAJA = { "0": [28, 68], "1": [48, 48], "2": [29, 70], "3": [28, 68], "4": [28, 72],
               "5": [28, 69], "6": [29, 69], "7": [28, 70], "8": [28, 68], "9": [29, 66] };

  function correr(d, dx) {
    /* los caminos solo usan M, L y C absolutos: van por pares x y */
    var par = 0;
    return d.replace(/-?\d+(\.\d+)?/g, function (n) {
      var v = parseFloat(n);
      var r = (par % 2 === 0) ? +(v + dx).toFixed(1) : v;
      par++;
      return String(r);
    });
  }

  function armar(id) {
    var a = id.charAt(0), b = id.charAt(1);
    var ca = CAJA[a], cb = CAJA[b];
    var aire = a === "1" ? 28 : 12;
    var total = (ca[1] - ca[0]) + aire + (cb[1] - cb[0]);
    var dxa = 75 - total / 2 - ca[0];
    var dxb = dxa + ca[1] + aire - cb[0];
    var out = [];
    [[a, dxa], [b, dxb]].forEach(function (p) {
      TRAZOS[p[0]].forEach(function (t) {
        var c = { d: correr(t.d, p[1]), ini: [+(t.ini[0] + p[1]).toFixed(1), t.ini[1]], ang: t.ang };
        if (t.insignia) c.insignia = t.insignia;
        out.push(c);
      });
    });
    return out;
  }

  for (var k = 10; k <= 20; k++) TRAZOS[String(k)] = armar(String(k));

  window.NUMEROS_TRAZOS = TRAZOS;

  /* ---------- las cosas para contar ----------

     Dibujos sencillos, hechos aquí, sin personajes. Cada uno en una
     caja de 100 x 100. Con `papel` salen en línea negra sobre blanco,
     para la hoja impresa (y así, de paso, se pueden colorear). */

  function tinta(papel, relleno, borde) {
    return papel ? { r: "#fff", b: "#222" } : { r: relleno, b: borde };
  }

  var OBJETOS = {
    sol: function (papel) {
      var c = tinta(papel, "#ffd34d", "#d99a1e"), rayos = "";
      for (var k = 0; k < 8; k++) {
        var a = k * Math.PI / 4, x1 = 50 + 31 * Math.cos(a), y1 = 50 + 31 * Math.sin(a);
        var x2 = 50 + 44 * Math.cos(a), y2 = 50 + 44 * Math.sin(a);
        rayos += "M" + x1.toFixed(1) + " " + y1.toFixed(1) + " L" + x2.toFixed(1) + " " + y2.toFixed(1) + " ";
      }
      return '<path d="' + rayos + '" stroke="' + c.b + '" stroke-width="5" stroke-linecap="round"/>' +
        '<circle cx="50" cy="50" r="23" fill="' + c.r + '" stroke="' + c.b + '" stroke-width="4"/>';
    },
    ojo: function (papel) {
      var b = papel ? "#222" : "#3a3330";
      return '<path d="M8 52 C28 24 72 24 92 52 C72 80 28 80 8 52 Z" fill="#fff" stroke="' + b + '" stroke-width="4"/>' +
        '<circle cx="50" cy="52" r="16" fill="' + (papel ? "#fff" : "#3f7fa6") + '" stroke="' + b + '" stroke-width="' + (papel ? 3 : 0) + '"/>' +
        '<circle cx="50" cy="52" r="7" fill="' + (papel ? "#222" : "#20303a") + '"/>' +
        (papel ? "" : '<circle cx="56" cy="46" r="3" fill="#fff"/>');
    },
    manzana: function (papel) {
      var c = tinta(papel, "#e5484d", "#a82f33"), h = tinta(papel, "#7cbf4a", "#4f8a2c");
      return '<path d="M50 32 C50 24 52 17 57 12" fill="none" stroke="' + (papel ? "#222" : "#7a5230") + '" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M53 24 C60 13 74 13 76 17 C72 27 60 30 53 24 Z" fill="' + h.r + '" stroke="' + h.b + '" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M50 32 C40 23 16 25 16 51 C16 76 33 92 50 85 C67 92 84 76 84 51 C84 25 60 23 50 32 Z" fill="' + c.r + '" stroke="' + c.b + '" stroke-width="4" stroke-linejoin="round"/>';
    },
    pelota: function (papel) {
      var c = tinta(papel, "#4f9fd9", "#2f6e9e"), raya = papel ? "#222" : "#fff";
      return '<circle cx="50" cy="50" r="36" fill="' + c.r + '" stroke="' + c.b + '" stroke-width="4"/>' +
        '<path d="M19 33 C38 45 62 45 81 33 M19 67 C38 55 62 55 81 67" fill="none" stroke="' + raya + '" stroke-width="' + (papel ? 3 : 6) + '" stroke-linecap="round"/>';
    },
    estrella: function (papel) {
      var c = tinta(papel, "#ffd98a", "#d9a53f");
      return '<path d="M50 8 L62 38 L94 40 L69 60 L78 92 L50 74 L22 92 L31 60 L6 40 L38 38 Z" fill="' + c.r + '" stroke="' + c.b + '" stroke-width="4" stroke-linejoin="round"/>';
    },
    flor: function (papel) {
      var c = tinta(papel, "#f28cb1", "#c2557e"), m = tinta(papel, "#ffd34d", "#d99a1e"), s = "";
      for (var k = 0; k < 5; k++) {
        var a = -Math.PI / 2 + k * 2 * Math.PI / 5;
        s += '<circle cx="' + (50 + 24 * Math.cos(a)).toFixed(1) + '" cy="' + (50 + 24 * Math.sin(a)).toFixed(1) +
          '" r="17" fill="' + c.r + '" stroke="' + c.b + '" stroke-width="3.5"/>';
      }
      return s + '<circle cx="50" cy="50" r="13" fill="' + m.r + '" stroke="' + m.b + '" stroke-width="3.5"/>';
    },
    pez: function (papel) {
      var c = tinta(papel, "#f59e42", "#c26a17");
      return '<path d="M72 50 L93 33 L93 67 Z" fill="' + c.r + '" stroke="' + c.b + '" stroke-width="4" stroke-linejoin="round"/>' +
        '<path d="M8 50 C24 26 58 26 76 50 C58 74 24 74 8 50 Z" fill="' + c.r + '" stroke="' + c.b + '" stroke-width="4" stroke-linejoin="round"/>' +
        '<circle cx="27" cy="46" r="4.5" fill="#222"/>';
    },
    hoja: function (papel) {
      var c = tinta(papel, "#7cbf4a", "#4f8a2c");
      return '<path d="M16 84 C16 42 46 16 86 14 C84 56 58 84 16 84 Z" fill="' + c.r + '" stroke="' + c.b + '" stroke-width="4" stroke-linejoin="round"/>' +
        '<path d="M16 84 C38 62 58 42 78 22" fill="none" stroke="' + c.b + '" stroke-width="3.5" stroke-linecap="round"/>';
    },
    corazon: function (papel) {
      var c = tinta(papel, "#e5484d", "#a82f33");
      return '<path d="M50 86 C20 64 12 48 12 36 C12 23 22 14 34 14 C42 14 48 19 50 27 C52 19 58 14 66 14 C78 14 88 23 88 36 C88 48 80 64 50 86 Z" fill="' + c.r + '" stroke="' + c.b + '" stroke-width="4" stroke-linejoin="round"/>';
    },
    boton: function (papel) {
      var c = tinta(papel, "#9b6fb5", "#5c3a6e"), h = papel ? "#222" : "#5c3a6e";
      return '<circle cx="50" cy="50" r="36" fill="' + c.r + '" stroke="' + c.b + '" stroke-width="4"/>' +
        '<circle cx="50" cy="50" r="26" fill="none" stroke="' + c.b + '" stroke-width="3"/>' +
        '<circle cx="41" cy="41" r="5" fill="' + h + '"/><circle cx="59" cy="41" r="5" fill="' + h + '"/>' +
        '<circle cx="41" cy="59" r="5" fill="' + h + '"/><circle cx="59" cy="59" r="5" fill="' + h + '"/>';
    },
    luna: function (papel) {
      var c = tinta(papel, "#ffe08a", "#c9a227");
      return '<path d="M62 12 C38 16 22 34 22 56 C22 76 38 90 58 90 C70 90 80 85 88 76 ' +
        'C60 80 42 64 42 44 C42 30 50 18 62 12 Z" fill="' + c.r + '" stroke="' + c.b +
        '" stroke-width="4" stroke-linejoin="round"/>';
    },
    huevo: function (papel) {
      var c = tinta(papel, "#fdf6e3", "#c9a26b");
      return '<path d="M50 10 C30 10 18 42 18 60 C18 79 32 92 50 92 C68 92 82 79 82 60 ' +
        'C82 42 70 10 50 10 Z" fill="' + c.r + '" stroke="' + c.b + '" stroke-width="4"/>';
    }
  };

  window.NUMEROS_OBJETOS = OBJETOS;

  /* ---------- las lecciones ----------

     `cosas` es lo que se dice con el número («tres manzanas»): el
     adulto lo lee, no es para descifrar.
     `cuentas` son las cantidades de la hoja «Cuenta y escribe»: el
     número de la lección varias veces, mezclado con los anteriores,
     para que no se vuelva copiar el mismo número sin contar.
     `leeLaPalabra`: false cuando la palabra todavía no se puede leer
     sílaba por sílaba con lo visto en las lecciones de lectura
     (tres y cuatro llevan tr, que es trabada; diez termina en z, y la
     z al final todavía no se ha dado). Se muestra igual y en la plana
     también va —así lo decidió el padre—, pero el aviso le dice al
     adulto que esa palabra la lee él. */

  var NUMEROS = [
    { n: 1, palabra: "uno", objeto: "sol", cosas: "un sol",
      banda: "#fdf1d8", tinta: "#b5832a",
      lead: "El primero. Uno solo.",
      pista: "Pon el lápiz en el punto de arriba y baja derecho hasta el renglón.",
      cuentas: [1, 1, 1, 1],
      aviso: [
        "El 1 es un palito: arriba en el punto y baja derecho, sin levantar el lápiz. Así lo " +
        "enseñan casi siempre en la escuela: sin gorrito ni base.",
        "Para contar algo que es uno solo no hay mucho que contar, y está bien: lo que importa " +
        "de esta lección es que el palito empiece arriba y no abajo."
      ] },

    { n: 2, palabra: "dos", objeto: "ojo", cosas: "dos ojos",
      banda: "#e0eef6", tinta: "#1f6f99",
      lead: "Uno y uno más: dos.",
      pista: "Arriba a la izquierda, da la vuelta como un gancho, baja en diagonal y sigue derecho por el renglón.",
      cuentas: [2, 1, 2, 1, 2],
      aviso: [
        "Para escribirlo: arranca arriba a la izquierda, sube y da la vuelta como un gancho, " +
        "baja en diagonal hasta el renglón y sigue derecho hacia la derecha. Todo de un solo trazo.",
        "El 2 al revés es muy común a esta edad, y así con el 3, el 5, el 7 y el 9. No es un " +
        "problema de la vista: la mano todavía no tiene claro para qué lado mira el número. Se " +
        "corrige mostrando el punto de salida, no borrando y repitiendo.",
        "Y vale la pena contar los ojos de verdad: los de él, los suyos, los del perro."
      ] },

    { n: 3, palabra: "tres", objeto: "manzana", cosas: "tres manzanas", leeLaPalabra: false,
      banda: "#fde4e4", tinta: "#b42318",
      lead: "Dos y uno más: tres.",
      pista: "Dos barrigas que miran a la derecha: la primera arriba, frena en la mitad, y otra abajo.",
      cuentas: [3, 1, 2, 3, 2, 3],
      aviso: [
        "Dos barrigas, las dos mirando al mismo lado, el de la derecha. Arriba se da la vuelta, " +
        "se frena en la mitad y viene otra vuelta, un poco más grande, abajo. Si sale al revés, " +
        "señale el punto de salida: el 3 arranca a la izquierda.",
        "La palabra «tres» todavía no se puede leer: lleva tr, que es trabada y viene mucho " +
        "después en la cartilla. Esa la lee usted, sin detenerse. Va también en la plana porque " +
        "así lo decidió usted, igual que «jugo» en la v."
      ] },

    { n: 4, palabra: "cuatro", objeto: "pelota", cosas: "cuatro pelotas", leeLaPalabra: false,
      banda: "#dcefe6", tinta: "#1b7a5a",
      lead: "Tres y uno más: cuatro.",
      pista: "Primero baja y dobla a la derecha, como una silla. Después el palito largo, de arriba abajo.",
      cuentas: [4, 2, 3, 1, 4, 3],
      aviso: [
        "Dos trazos y abierto arriba: primero baja y dobla hacia la derecha, como una silla; " +
        "después se levanta el lápiz y va el palito largo, de arriba abajo, cruzando. En los " +
        "libros y en la pantalla a veces sale cerrado, como un triángulo: es el mismo número, " +
        "y vale la pena decírselo cuando lo vea.",
        "«cuatro» tampoco se puede leer todavía (lleva tr). La lee usted."
      ] },

    { n: 5, palabra: "cinco", objeto: "estrella", cosas: "cinco estrellas",
      banda: "#fbf3c8", tinta: "#8a6d0b",
      lead: "Cuatro y uno más: cinco. Una mano entera.",
      pista: "Baja un poquito, da la vuelta a la barriga. Después levanta el lápiz y ponle el sombrero.",
      cuentas: [5, 3, 4, 2, 5, 1],
      aviso: [
        "Dos trazos, y el sombrero va de último: primero baja un poquito, da la vuelta a la " +
        "barriga hacia la derecha y termina abajo; después se levanta el lápiz y se pone el " +
        "sombrero, de izquierda a derecha. Si la barriga mira a la izquierda, sale una s.",
        "Cinco es una mano entera. Contar con los dedos no es hacer trampa: es justo como se " +
        "aprende. Y en el marco de diez, cinco es una fila llena."
      ] },

    { n: 6, palabra: "seis", objeto: "flor", cosas: "seis flores",
      banda: "#fce7f3", tinta: "#be185d",
      lead: "Cinco y uno más: seis. Una mano y un dedo.",
      pista: "Empieza arriba a la derecha, baja como un tobogán y al llegar abajo cierra una rueda pequeña.",
      cuentas: [6, 4, 5, 3, 6, 2],
      aviso: [
        "Empieza arriba a la derecha, baja como un tobogán hacia la izquierda y, al llegar al " +
        "renglón, da la vuelta hacia arriba y cierra una rueda pequeña. De un solo trazo.",
        "El 6 y el 9 son el mismo dibujo girado. Mejor no ponerlos lado a lado hasta que el 9 " +
        "llegue y se sepa bien cada uno."
      ] },

    { n: 7, palabra: "siete", objeto: "pez", cosas: "siete peces",
      banda: "#e0f2fe", tinta: "#0369a1",
      lead: "Seis y uno más: siete.",
      pista: "Una raya derecha hacia la derecha y, sin levantar el lápiz, baja en diagonal. Después la rayita de la mitad.",
      cuentas: [7, 5, 6, 4, 7, 3],
      aviso: [
        "Una raya derecha de izquierda a derecha y, sin levantar el lápiz, baja en diagonal " +
        "hasta el renglón. Después se levanta el lápiz y va la rayita que lo cruza en la mitad.",
        "La rayita es la de la escuela de él, y también la de la casa. En los libros y en la " +
        "pantalla el 7 sale casi siempre sin ella: es el mismo número, y vale la pena decírselo " +
        "cuando lo vea."
      ] },

    { n: 8, palabra: "ocho", objeto: "hoja", cosas: "ocho hojas",
      banda: "#ecfccb", tinta: "#4d7c0f",
      lead: "Siete y uno más: ocho.",
      pista: "Haz una s desde arriba y, sin levantar el lápiz, sube otra vez hasta donde empezaste.",
      cuentas: [8, 6, 7, 5, 8, 4],
      aviso: [
        "Es una s y de vuelta para arriba: empieza arriba a la derecha, hace la s hasta abajo y " +
        "regresa subiendo hasta donde empezó, sin levantar el lápiz.",
        "Muchos niños lo hacen como dos ruedas pegadas, una encima de la otra. Se ve igual, pero " +
        "son dos trazos y cuesta más hacerlo rápido después. Si ya lo hace así y le sale bien, " +
        "no hay que pelear por eso."
      ] },

    { n: 9, palabra: "nueve", objeto: "corazon", cosas: "nueve corazones",
      banda: "#f1e4f0", tinta: "#7d3f78",
      lead: "Ocho y uno más: nueve. Al marco le falta uno.",
      pista: "Una rueda pequeña arriba, hacia la izquierda como la de la a, y después el palito derecho hacia abajo.",
      cuentas: [9, 7, 8, 6, 9, 5],
      aviso: [
        "Una rueda pequeña arriba, que gira hacia la izquierda como la de la a, y sin levantar " +
        "el lápiz un palito derecho que baja hasta el renglón. Se parece a la g, pero el palito " +
        "baja derecho, sin anzuelo.",
        "En el marco de diez, el nueve es el que tiene un solo hueco. Ese hueco es el que va a " +
        "hacer fácil el 10."
      ] },

    { n: 0, palabra: "cero", objeto: "manzana", cosas: "cero manzanas",
      banda: "#f3e9dc", tinta: "#7a5230",
      lead: "Cuando no hay ninguno.",
      pista: "Una rueda alta: desde arriba, hacia la izquierda, hasta cerrarla.",
      cuentas: [0, 3, 0, 5, 0, 2],
      aviso: [
        "Una rueda alta que empieza arriba y gira hacia la izquierda: la misma dirección de la " +
        "o, de la rueda de la a y de todas las ruedas del sitio.",
        "El cero no es «nada que escribir»: es lo que se escribe cuando no hay ninguno. Se " +
        "entiende mejor con algo que se acaba: tres galletas, se come una, otra, otra… ¿cuántas " +
        "quedan? Cero.",
        "Va después del 9 y no antes del 1 a propósito: se cuenta desde uno, y el cero hace " +
        "falta para escribir el 10."
      ] },

    { n: 10, palabra: "diez", objeto: "boton", cosas: "diez botones", leeLaPalabra: false,
      banda: "#e6f2df", tinta: "#4f7a2f",
      lead: "Nueve y uno más: diez. El marco lleno.",
      pista: "El 1 y el 0, juntos y en ese orden: primero el palito, después la rueda a la derecha.",
      cuentas: [10, 8, 9, 7, 10, 6],
      aviso: [
        "El primer número que se escribe con dos: el 1 y el 0, juntos y en ese orden. Primero el " +
        "palito, después la rueda a la derecha.",
        "Diez son las dos manos, y el marco con las dos filas llenas. De aquí en adelante todos " +
        "los números se arman con estos diez dibujos.",
        "«diez» todavía no se puede leer: termina en z, y la z al final de la sílaba no se ha " +
        "dado. La lee usted."
      ] },

    /* ---------- del 11 al 20 ----------

       Todos son «diez y algo más», y así se muestran: el primer marco
       lleno y lo que sobra en el segundo. El número lo dice igual: el 1
       de la izquierda es el diez, el de la derecha lo que sobra.

       Los nombres no ayudan parejo. Del 16 al 19 el nombre dice la
       cuenta (dieci-séis = diez y seis). Del 11 al 15 no: once, doce,
       trece, catorce y quince se aprenden de memoria. Por eso el aviso
       de cada uno lo dice distinto. */

    { n: 11, palabra: "once", objeto: "luna", cosas: "once lunas",
      banda: "#fdf1d8", tinta: "#b5832a",
      lead: "Diez y uno más: once.",
      pista: "Dos palitos: el 1 del diez y el 1 que sobra, con espacio en medio.",
      aviso: [
        "Once es diez y uno: el marco de arriba lleno, y uno solo en el de abajo. Se escribe con " +
        "dos palitos iguales: el primero es el diez, el segundo el uno que sobra. Que quede " +
        "espacio entre los dos, si no parece un 11 de un solo palito gordo.",
        "El nombre no lo dice: «once» no suena a «diez y uno». Del 11 al 15 los nombres se " +
        "aprenden de memoria; desde el 16 el nombre ayuda."
      ] },

    { n: 12, palabra: "doce", objeto: "huevo", cosas: "doce huevos",
      banda: "#e0eef6", tinta: "#1f6f99",
      lead: "Diez y dos más: doce. Una docena.",
      pista: "Primero el 1, que es el diez. Después el 2, a la derecha.",
      aviso: [
        "Doce es diez y dos. Se escribe el 1 primero y el 2 después, a la derecha.",
        "El error típico de aquí al 19 es escribirlo al revés: 21 en vez de 12. En la escuela " +
        "le va a pasar más, porque en inglés «sixteen» empieza diciendo el seis aunque se " +
        "escriba con el 1 primero. La regla que sirve en los dos idiomas: el diez va primero, a " +
        "la izquierda, como el marco lleno va primero.",
        "Doce huevos son una docena: si hay un cartón en la nevera, ahí está el doce de verdad."
      ] },

    { n: 13, palabra: "trece", objeto: "manzana", cosas: "trece manzanas", leeLaPalabra: false,
      banda: "#fde4e4", tinta: "#b42318",
      lead: "Diez y tres más: trece.",
      pista: "Primero el 1. Después el 3, con sus dos barrigas mirando a la derecha.",
      aviso: [
        "Trece es diez y tres: el 1 y después el 3.",
        "«trece» todavía no se puede leer: lleva tr, como «tres». La lee usted. Vale la pena " +
        "decirle que «tres» y «trece» se parecen porque los dos tienen el tres adentro."
      ] },

    { n: 14, palabra: "catorce", objeto: "pelota", cosas: "catorce pelotas",
      banda: "#dcefe6", tinta: "#1b7a5a",
      lead: "Diez y cuatro más: catorce.",
      pista: "Primero el 1. Después el 4: la silla y el palito largo.",
      aviso: [
        "Catorce es diez y cuatro: el 1 y después el 4, abierto arriba y en dos trazos.",
        "Ya la puede leer él: ca-tor-ce, con lo de «or» y «ce» que ya vio en las lecciones."
      ] },

    { n: 15, palabra: "quince", objeto: "estrella", cosas: "quince estrellas",
      banda: "#fbf3c8", tinta: "#8a6d0b",
      lead: "Diez y cinco más: quince. Tres manos.",
      pista: "Primero el 1. Después el 5: baja, barriga, y el sombrero de último.",
      aviso: [
        "Quince es diez y cinco: un marco lleno y media fila del otro. Son tres manos.",
        "Es el último de los que se aprenden de memoria. Desde el 16 el nombre dice la cuenta."
      ] },

    { n: 16, palabra: "dieciséis", objeto: "flor", cosas: "dieciséis flores",
      banda: "#fce7f3", tinta: "#be185d",
      lead: "Diez y seis: dieciséis. El nombre lo dice.",
      pista: "Primero el 1. Después el 6, que baja como tobogán y cierra la rueda abajo.",
      aviso: [
        "Aquí el nombre ayuda: dieci-séis es «diez y seis», dicho rápido. Vale la pena decirlo " +
        "despacio las dos maneras para que lo oiga: diez y seis, dieciséis.",
        "Y se escribe en el mismo orden en que se dice: primero el diez (el 1) y después el seis."
      ] },

    { n: 17, palabra: "diecisiete", objeto: "pez", cosas: "diecisiete peces",
      banda: "#e0f2fe", tinta: "#0369a1",
      lead: "Diez y siete: diecisiete.",
      pista: "Primero el 1. Después el 7, con su rayita en la mitad.",
      aviso: [
        "Dieci-siete: diez y siete. Primero el 1, después el 7 con la rayita.",
        "Ojo con el 1 y el 7 juntos: sin la rayita se parecen. Por eso la rayita ayuda."
      ] },

    { n: 18, palabra: "dieciocho", objeto: "hoja", cosas: "dieciocho hojas",
      banda: "#ecfccb", tinta: "#4d7c0f",
      lead: "Diez y ocho: dieciocho.",
      pista: "Primero el 1. Después el 8: la s y de vuelta para arriba.",
      aviso: [
        "Dieci-ocho: diez y ocho. Primero el 1, después el 8.",
        "En el marco de abajo faltan solo dos para llenarlo: dieciocho y dos más son veinte."
      ] },

    { n: 19, palabra: "diecinueve", objeto: "corazon", cosas: "diecinueve corazones",
      banda: "#f1e4f0", tinta: "#7d3f78",
      lead: "Diez y nueve: diecinueve. Falta uno para el veinte.",
      pista: "Primero el 1. Después el 9: la rueda hacia la izquierda y el palito que baja.",
      aviso: [
        "Dieci-nueve: diez y nueve. Primero el 1, después el 9.",
        "Al segundo marco le falta un solo hueco, igual que al nueve le faltaba uno para el diez."
      ] },

    { n: 20, palabra: "veinte", objeto: "boton", cosas: "veinte botones",
      banda: "#e6f2df", tinta: "#4f7a2f",
      lead: "Diecinueve y uno más: veinte. Los dos marcos llenos.",
      pista: "Primero el 2. Después el 0, la rueda alta, a la derecha.",
      aviso: [
        "Veinte son dos dieces: los dos marcos llenos, las manos y los pies. Se escribe con el 2 " +
        "y el 0: el 2 dice cuántos dieces hay, y el 0 que no sobra ninguno.",
        "Es la misma idea del 10 (un diez y nada más) un paso más arriba. Si eso se entiende, " +
        "el 30, el 40 y los demás vienen solos."
      ] }
  ];

  /* el nombre en inglés, para las tarjetas (no va en las planas) */
  var EN = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
            "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen",
            "nineteen", "twenty"];

  NUMEROS.forEach(function (N, i) {
    N.en = EN[N.n];
    N.id = String(N.n);
    N.orden = i + 1;
    N.trazos = TRAZOS[N.id];
    N.ancho = N.n >= 10 ? 150 : 96;
    /* las cantidades de la hoja «Cuenta y escribe» de los de dos cifras:
       el número varias veces, mezclado con los anteriores */
    if (!N.cuentas) {
      var n = N.n;
      N.cuentas = [n, n - 2, n - 1, n - 3, n, n - 4];
    }
  });

  window.NUMEROS = NUMEROS;

  /* ---------- las hojas para trazar en pantalla ----------

     Una ficha por número, igual que las de las letras, para que
     trazos.html la abra sola. Lleva `numero` y no `letra`: con `letra`
     entraría al alfabeto de las sílabas, y en la muestra grande saldría
     el número de la fuente en vez del dibujado. `techo` dibuja una raya
     arriba, donde empieza el número: en los números el renglón de la
     mitad no sirve de tope, como sí en las letras. */

  if (window.FICHAS) {
    NUMEROS.forEach(function (N) {
      window.FICHAS.push({
        id: "numero-" + N.id, grupo: "numeros", orden: N.orden,
        numero: N.id, palabra: N.palabra, en: N.en,
        titulo: "El número " + N.palabra,
        pista: N.pista,
        banda: N.banda, tinta: N.tinta,
        celda: [N.ancho, 130], repeticiones: N.n >= 10 ? 5 : 7, renglones: 3,
        guia: true, cuerpo: 75, techo: 40,
        trazos: N.trazos
      });
    });
  }

  /* ---------- el número dibujado, para mostrarlo grande ----------

     Sin marcas de salida ni guías: solo el número, recortado a lo que
     ocupa. Es lo que reemplaza al texto en todas las páginas de
     números. */

  function svgNumero(id, color, grosor, clase) {
    var t = TRAZOS[id];
    if (!t) return "";
    var g = grosor || 7;
    var dos = id.length > 1;
    var s = '<svg class="' + (clase || "num-dibujado") + '" viewBox="' + (dos ? "22 33 106" : "20 33 56") +
      ' 84" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
    for (var i = 0; i < t.length; i++) {
      s += '<path d="' + t[i].d + '" fill="none" stroke="' + (color || "currentColor") +
        '" stroke-width="' + g + '" stroke-linecap="round" stroke-linejoin="round"/>';
    }
    return s + "</svg>";
  }

  window.NUMERO_SVG = svgNumero;
})();
