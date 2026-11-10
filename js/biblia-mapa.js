/* ============================================================
   biblia-mapa.js
   Mapa de los lugares de cada capítulo de la Biblia.

   Los lugares (con sus coordenadas) ya vienen en los archivos de
   biblia/*.js; aquí solo se dibujan y se enfocan.
   ============================================================ */
/*global L */

const BibliaMapa = (function () {
    "use strict";

    const CENTRO_INICIAL = [31.777444, 35.234935]; // Jerusalén
    const ZOOM_INICIAL = 7;
    const ZOOM_MAXIMO = 11;
    const ZOOM_LUGAR = 10;

    // Mapas base que se pueden escoger (todos de Esri, sin clave de acceso).
    const BASES = {
        // El físico solo tiene detalle hasta el zoom 8; de cerca pasa al relieve.
        "Físico": {
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
            maxNativeZoom: 8,
            hastaZoom: 8,
            despues: "Relieve",
            attribution: "Mapa &copy; Esri, US National Park Service"
        },
        "Relieve": {
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
            maxNativeZoom: 13,
            attribution: "Relieve &copy; Esri"
        },
        "Satélite": {
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            maxNativeZoom: 17,
            attribution: "Imágenes &copy; Esri, Maxar, Earthstar Geographics"
        }
    };
    const BASE_INICIAL = "Físico";
    const CLAVE_BASE = "biblia-mapa-base";   // recuerda la última elección de quien visita

    // Tamaño del alfiler (la punta marca el lugar).
    const PIN_W = 22;
    const PIN_H = 32;
    let ICONO;

    let mapa;
    let capa;
    let estadoEl;
    let marcadores = [];
    let puntos = [];

    function limpiar(mensaje) {
        capa.clearLayers();
        marcadores = [];
        puntos = [];
        estadoEl.textContent = mensaje || "";
    }

    // lugares: [[id, nombre, lat, lng], ...]
    function mostrar(lugares, mensaje) {
        if (!mapa) { return; }
        limpiar(mensaje);
        if (!lugares.some(function (l) { return l[2] !== null; })) {
            mapa.setView(CENTRO_INICIAL, ZOOM_INICIAL);
            return;
        }

        // Un solo alfiler por coordenada; si varios nombres caen en el mismo
        // lugar se juntan en la etiqueta.
        const porPunto = new Map();
        const limites = [];

        lugares.forEach(function (l, i) {
            if (l[2] === null) { return; }   // ubicación desconocida: solo se marca en el texto
            const clave = l[2].toFixed(4) + "," + l[3].toFixed(4);
            let p = porPunto.get(clave);
            if (!p) {
                p = {lat: l[2], lng: l[3], nombres: []};
                porPunto.set(clave, p);
            }
            if (!p.nombres.includes(l[1])) { p.nombres.push(l[1]); }
            marcadores[i] = p;
        });

        puntos = [...porPunto.values()];
        puntos.forEach(function (p) {
            p.texto = p.nombres.join(", ");
            p.marcador = L.marker([p.lat, p.lng], {icon: ICONO, keyboard: false}).addTo(capa);
            limites.push([p.lat, p.lng]);
        });

        if (limites.length === 1) {
            mapa.setView(limites[0], 9, {animate: false});
        } else {
            mapa.fitBounds(limites, {paddingTopLeft: [40, 50], paddingBottomRight: [150, 30], maxZoom: ZOOM_MAXIMO, animate: false});
        }
        acomodarEtiquetas();
    }

    /* ---------- Acomodo de etiquetas ----------
       Cada etiqueta prueba varias posiciones alrededor de su alfiler y se queda
       con la primera que no tape otra etiqueta ni otro alfiler y quepa en el mapa.
       Si ninguna sirve, la etiqueta se oculta y aparece al pasar el mouse o tocar
       el alfiler. Se recalcula con cada zoom. */
    const ALTO = 18;          // alto de una etiqueta, en píxeles
    let reglaTexto;

    function anchoTexto(texto) {
        if (!reglaTexto) {
            reglaTexto = document.createElement("canvas").getContext("2d");
            reglaTexto.font = "bold 13px Arial, Helvetica, sans-serif";
        }
        return Math.ceil(reglaTexto.measureText(texto).width) + 10;
    }

    // Posiciones alrededor del centro del alfiler (cx, cy):
    // [dirección de Leaflet, desplazamiento, función que da la esquina del rectángulo]
    function posiciones(w) {
        const h = ALTO, ax = PIN_W / 2 + 3, ay = PIN_H / 2 + 3, dy = PIN_H / 2;
        return [
            ["right", [ax, 0], (x, y) => [x + ax, y - h / 2]],
            ["left", [-ax, 0], (x, y) => [x - ax - w, y - h / 2]],
            ["top", [0, -ay], (x, y) => [x - w / 2, y - ay - h]],
            ["bottom", [0, ay], (x, y) => [x - w / 2, y + ay]],
            ["right", [ax - 2, -dy], (x, y) => [x + ax - 2, y - dy - h / 2]],
            ["right", [ax - 2, dy], (x, y) => [x + ax - 2, y + dy - h / 2]],
            ["left", [-(ax - 2), -dy], (x, y) => [x - ax + 2 - w, y - dy - h / 2]],
            ["left", [-(ax - 2), dy], (x, y) => [x - ax + 2 - w, y + dy - h / 2]]
        ];
    }

    function chocan(a, b) {
        return a[0] < b[2] + 2 && b[0] < a[2] + 2 && a[1] < b[3] + 2 && b[1] < a[3] + 2;
    }

    function acomodarEtiquetas() {
        if (!mapa || !puntos.length) { return; }
        const tam = mapa.getSize();
        const ocupados = puntos.map(function (p) {
            const c = mapa.latLngToContainerPoint([p.lat, p.lng]);
            p.x = c.x;
            p.y = c.y - PIN_H / 2;            // centro del alfiler
            return [c.x - PIN_W / 2, c.y - PIN_H, c.x + PIN_W / 2, c.y];   // el alfiler mismo
        });
        const nPuntos = ocupados.length;
        // Los controles del mapa (zoom, selector, créditos) también cuentan como ocupados.
        const caja = mapa.getContainer().getBoundingClientRect();
        mapa.getContainer().querySelectorAll(".leaflet-control").forEach(function (el) {
            const r = el.getBoundingClientRect();
            if (r.width) { ocupados.push([r.left - caja.left, r.top - caja.top, r.right - caja.left, r.bottom - caja.top]); }
        });

        puntos.forEach(function (p, k) {
            const w = anchoTexto(p.texto);
            let elegida = null;
            posiciones(w).some(function (pos) {
                const [x0, y0] = pos[2](p.x, p.y);
                const r = [x0, y0, x0 + w, y0 + ALTO];
                const dentro = r[0] >= 0 && r[1] >= 0 && r[2] <= tam.x && r[3] <= tam.y;
                const libre = ocupados.every(function (o, j) { return (j === k && j < nPuntos) || !chocan(r, o); });
                if (dentro && libre) {
                    elegida = pos;
                    ocupados.push(r);
                    return true;
                }
                return false;
            });

            p.marcador.unbindTooltip();
            if (elegida) {
                p.marcador.bindTooltip(p.texto, {
                    permanent: true, direction: elegida[0], offset: elegida[1], className: "etiqueta"
                });
            } else {
                // No cabe: se ve al pasar el mouse o tocar el alfiler.
                p.marcador.bindTooltip(p.texto, {direction: "top", offset: [0, -(PIN_H / 2 + 3)], className: "etiqueta"});
            }
        });
    }

    // Como el showLocation del proyecto original: acerca el mapa al lugar
    // y hace saltar su alfiler.
    function enfocar(i, nombre) {
        const p = marcadores[i];
        if (!mapa) { return; }
        if (!p) {
            estadoEl.textContent = `No se sabe con certeza dónde estaba ${nombre}.`;
            return;
        }
        mapa.flyTo([p.lat, p.lng], Math.max(mapa.getZoom(), ZOOM_LUGAR), {duration: 0.8});
        mapa.once("moveend", function () {
            const el = p.marcador.getElement();
            if (!el) { return; }
            el.classList.remove("pin-salta");
            void el.offsetWidth;              // reinicia la animación
            el.classList.add("pin-salta");
        });
    }

    function leerBase() {
        try {
            const b = localStorage.getItem(CLAVE_BASE);
            return BASES[b] ? b : BASE_INICIAL;
        } catch (e) {
            return BASE_INICIAL;
        }
    }

    function init(idMapa, idEstado) {
        estadoEl = document.getElementById(idEstado);
        if (typeof L === "undefined") {
            estadoEl.textContent = "No se pudo cargar el mapa.";
            return;
        }
        // Alfiler rojo (22 x 32 px; la punta marca el lugar).
        ICONO = L.divIcon({
            className: "pin",
            html: '<svg viewBox="0 0 22 32" width="22" height="32" aria-hidden="true">' +
                  '<path d="M11 31C11 31 2 18.5 2 11a9 9 0 0 1 18 0c0 7.5-9 20-9 20z" ' +
                  'fill="#d32f2f" stroke="#7f1010" stroke-width="1.5"/>' +
                  '<circle cx="11" cy="11" r="3.6" fill="#fff"/></svg>',
            iconSize: [PIN_W, PIN_H],
            iconAnchor: [PIN_W / 2, PIN_H],
            tooltipAnchor: [0, -PIN_H / 2]
        });
        mapa = L.map(idMapa).setView(CENTRO_INICIAL, ZOOM_INICIAL);

        const capas = {};
        Object.keys(BASES).forEach(function (nombre) {
            const b = BASES[nombre];
            const opciones = {maxZoom: 16, maxNativeZoom: b.maxNativeZoom, attribution: b.attribution};
            if (b.hastaZoom) {
                const d = BASES[b.despues];
                capas[nombre] = L.layerGroup([
                    L.tileLayer(b.url, Object.assign({}, opciones, {maxZoom: b.hastaZoom})),
                    L.tileLayer(d.url, {minZoom: b.hastaZoom + 1, maxZoom: 16, maxNativeZoom: d.maxNativeZoom, attribution: d.attribution})
                ]);
            } else {
                capas[nombre] = L.tileLayer(b.url, opciones);
            }
        });
        capas[leerBase()].addTo(mapa);
        // En pantallas chicas el selector queda plegado (se abre al tocarlo).
        const plegado = mapa.getSize().x < 600;
        L.control.layers(capas, null, {position: "topright", collapsed: plegado}).addTo(mapa);
        mapa.on("baselayerchange", function (e) {
            acomodarEtiquetas();
            try { localStorage.setItem(CLAVE_BASE, e.name); } catch (err) { /* sin almacenamiento: no pasa nada */ }
        });

        capa = L.layerGroup().addTo(mapa);
        mapa.on("zoomend", acomodarEtiquetas);
        mapa.on("resize", acomodarEtiquetas);
    }

    return {init, mostrar, enfocar, limpiar: function (m) { if (mapa) { limpiar(m); mapa.setView(CENTRO_INICIAL, ZOOM_INICIAL); } }};
}());
