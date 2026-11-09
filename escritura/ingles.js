/* ============================================================
   ingles.js - las tarjetas de lectura, en inglés.

   No hay imágenes nuevas: cada palabra de aquí busca su foto en las
   tarjetas de las lecciones (ABECEDARIO) o en las palabras de las
   vocales (VOCALES_PALABRAS), por su palabra en español. Así una
   tarjeta nueva en lectura se vuelve tarjeta de inglés con solo
   agregarle aquí su renglón: [palabra en español, palabra en inglés].

   Va por temas y no por letras: en otro idioma la letra con que
   empieza la palabra en español no ayuda a nada; el tema sí.

   Un tercer elemento { es: "…" } cambia solo lo que se ve y se oye en
   español, no la búsqueda de la foto: «manzana» y «uva» buscan su foto
   así, pero se muestran en plural, como el inglés y como la foto
   (decisión del padre).

   El inglés es el de Estados Unidos (allá van a la escuela): «ax»,
   «couch», «cookie». Cada traducción se escogió mirando la foto, no
   la palabra: la «lima» de la l es una lima de pulir («file»), la
   «pila» es una pila de piedra («fountain»), el «foco» es un
   reflector de teatro («spotlight»), la «boina» es una gorra («cap»).
   «químico» es «chemist» y no «scientist»: lo pidió el padre (tienen
   un amigo químico). «gelatina» es «gelatin», como en EE. UU.; «jelly»
   allá es la mermelada.

   Se quedaron por fuera, a propósito:
   - los nombres de personas (no se traducen), y los números sueltos
     (están todos, del 0 al 20, en el tema de los números);
   - fotos repetidas con otra palabra (auto = carro, pastel = torta,
     bola = pelota, copa = vaso): en inglés saldrían dos tarjetas iguales;
   - palabras que en inglés no son para niños o no se entienden con la
     foto: tabaco, pipa, vino, urna, género, espumoso, herido;
   - gitano, indio e indígena: en inglés esas palabras no son neutras.
   ============================================================ */
(function () {
  "use strict";

  window.INGLES_TEMAS = [
    { id: "animales", es: "Los animales", en: "Animals", palabras: [
      ["perro", "dog"], ["cachorro", "puppy"], ["toro", "bull"], ["gato", "cat"], ["pato", "duck"], ["pollito", "chick"],
      ["gallina", "hen"], ["gallo", "rooster"], ["caballo", "horse"], ["burro", "donkey"], ["mula", "mule"],
      ["vaca", "cow"], ["oveja", "sheep"], ["chivo", "goat"], ["conejo", "rabbit"], ["ratón", "mouse"],
      ["rata", "rat"], ["oso", "bear"], ["lobo", "wolf"], ["venado", "deer"], ["mono", "monkey"],
      ["jirafa", "giraffe"], ["elefante", "elephant"], ["panda", "panda"], ["puma", "puma"], ["zorra", "fox"],
      ["ardilla", "squirrel"], ["sapo", "toad"], ["rana", "frog"], ["iguana", "iguana"], ["tortuga", "turtle"],
      ["caimán", "crocodile"], ["pájaro", "bird"], ["paloma", "dove"], ["loro", "parrot"], ["canario", "canary"],
      ["águila", "eagle"], ["lechuza", "owl"], ["urraca", "magpie"], ["foca", "seal"], ["ballena", "whale"],
      ["pulpo", "octopus"], ["araña", "spider"], ["abeja", "bee"], ["hormiga", "ant"], ["mosquito", "mosquito"],
      ["cigarra", "cicada"], ["gusano", "worm"]
    ] },
    { id: "comida", es: "La comida", en: "Food", palabras: [
      ["agua", "water"], ["leche", "milk"], ["pan", "bread"], ["arepa", "arepa"], ["huevos", "eggs"],
      ["yema", "yolk"], ["queso", "cheese"], ["sopa", "soup"], ["guiso", "stew"], ["papa", "potato"],
      ["papas", "fries"], ["cebolla", "onion"], ["tomate", "tomato"], ["ensalada", "salad"], ["chorizo", "sausage"],
      ["manzana", "apples", { es: "manzanas" }], ["uva", "grapes", { es: "uvas" }], ["limón", "lemon"], ["miel", "honey"], ["sal", "salt"],
      ["masa", "dough"], ["torta", "cake"], ["chocolate", "chocolate"], ["gelatina", "gelatin"], ["cono", "ice cream cone"]
    ] },
    { id: "cuerpo", es: "El cuerpo", en: "The body", palabras: [
      ["boca", "mouth"], ["lengua", "tongue"], ["ojo", "eye"], ["oreja", "ear"], ["dedo", "finger"],
      ["uña", "nail"], ["puño", "fist"], ["quijada", "jawbone"], ["pipí", "pee"], ["popó", "poop"]
    ] },
    { id: "casa", es: "En la casa", en: "At home", palabras: [
      ["casa", "house"], ["sala", "living room"], ["cocina", "kitchen"], ["mesa", "table"], ["silla", "chair"],
      ["sofá", "couch"], ["cuna", "crib"], ["hamaca", "hammock"], ["olla", "pot"], ["cuchara", "spoon"],
      ["vaso", "glass"], ["jarro", "jug"], ["tetero", "baby bottle"], ["maceta", "flowerpot"],
      ["espejo", "mirror"], ["peine", "comb"], ["cepillo", "toothbrush"], ["escoba", "broom"], ["vela", "candle"],
      ["llave", "key"], ["jaula", "cage"], ["teja", "roof tile"], ["pila", "fountain"]
    ] },
    { id: "ropa", es: "La ropa", en: "Clothes", palabras: [
      ["ropa", "clothes"], ["camisa", "shirt"], ["zapato", "shoe"], ["bota", "boot"], ["bata", "lab coat"],
      ["boina", "cap"], ["uniforme", "uniform"], ["anillo", "ring"], ["joya", "necklace"], ["perlas", "pearls"],
      ["gema", "gem"], ["tela", "fabric"]
    ] },
    { id: "juego", es: "Jugar y la música", en: "Toys and music", palabras: [
      ["pelota", "ball"], ["dado", "die"], ["muñeca", "doll"], ["juguete", "toy"], ["aro", "hoop"], ["raqueta", "racket"],
      ["guitarra", "guitar"], ["piano", "piano"], ["violín", "violin"], ["arpa", "harp"], ["baile", "dance"],
      ["circo", "circus"]
    ] },
    { id: "cosas", es: "Herramientas y cosas", en: "Tools and things", palabras: [
      ["pala", "shovel"], ["hacha", "ax"], ["serrucho", "saw"], ["navaja", "pocketknife"], ["lima", "file"],
      ["lupa", "magnifying glass"], ["imán", "magnet"], ["escalera", "ladder"], ["candado", "padlock"],
      ["soga", "rope"], ["hilo", "thread"], ["nudo", "knot"], ["maleta", "suitcase"], ["paquete", "package"], ["lata", "can"],
      ["pesas", "weights"], ["dedal", "thimble"], ["herradura", "horseshoe"], ["rueda", "wheel"], ["llanta", "tire"],
      ["mapa", "map"], ["tiza", "chalk"], ["pizarra", "chalkboard"], ["foco", "spotlight"], ["espuma", "foam"]
    ] },
    { id: "naturaleza", es: "La naturaleza", en: "Nature", palabras: [
      ["árbol", "tree"], ["pino", "pine tree"], ["mata", "plant"], ["hoja", "leaf"], ["rosa", "rose"],
      ["nido", "nest"], ["ala", "wing"], ["lago", "lake"], ["ola", "wave"],
      ["isla", "island"], ["loma", "hill"], ["nieve", "snow"], ["fuego", "fire"], ["rayo", "lightning"],
      ["arcoíris", "rainbow"]
    ] },
    { id: "cielo", es: "El cielo y los planetas", en: "The sky and the planets", palabras: [
      ["sol", "sun"], ["luna", "moon"], ["estrella", "star"], ["Mercurio", "Mercury"], ["Venus", "Venus"],
      ["Tierra", "Earth"], ["Marte", "Mars"], ["Júpiter", "Jupiter"], ["Saturno", "Saturn"], ["Urano", "Uranus"],
      ["mundo", "world"]
    ] },
    { id: "lugares", es: "Lugares y transporte", en: "Places and getting around", palabras: [
      ["calle", "street"], ["iglesia", "church"], ["castillo", "castle"], ["torre", "tower"], ["choza", "hut"],
      ["iglú", "igloo"], ["pozo", "well"], ["ruinas", "ruins"], ["carro", "car"], ["moto", "motorcycle"],
      ["carreta", "wagon"], ["avión", "airplane"], ["yate", "yacht"], ["remo", "oar"], ["faro", "lighthouse"]
    ] },
    { id: "personas", es: "Personas y personajes", en: "People", palabras: [
      ["Dios", "God"], ["Jesús", "Jesus"], ["mamá", "mom"], ["papá", "dad"], ["familia", "family"], ["hermanos", "brothers"], ["gemelo", "twins"],
      ["nene", "little boy"], ["niña", "girl"], ["viejo", "old man"], ["reina", "queen"], ["cocinero", "cook"], ["soldado", "soldier"],
      ["químico", "chemist"], ["payaso", "clown"], ["mimo", "mime"], ["dormilón", "sleepyhead"],
      ["enano", "dwarf"], ["momia", "mummy"], ["unicornio", "unicorn"]
    ] }
  ];

  /* los números del 0 al 20 (con su `en`) y las figuras salen de sus
     propios archivos: numeros.js y figuras.js */
})();
