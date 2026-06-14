// ============================================================
// MUNDIAL 2026 - JUEGO DE PRONOSTICOS
// ============================================================

const App = (() => {
    "use strict";

    // ----------------------------------------------------------
    // CONFIG
    // ----------------------------------------------------------
    const SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbwS6nLiN2elj_j9OOuYC_TUlYYaFwkwo5sh2vHKiV78lg7C4DiMxJKM2Iyt1auTndo5Fg/exec";
    const ESPN_API_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";

    // ----------------------------------------------------------
    // TEAMS DATA
    // ----------------------------------------------------------
    const TEAMS = {
        MEX: { name: "Mexico", flag: "\u{1F1F2}\u{1F1FD}", group: "A" },
        RSA: { name: "Sudafrica", flag: "\u{1F1FF}\u{1F1E6}", group: "A" },
        KOR: { name: "Corea del Sur", flag: "\u{1F1F0}\u{1F1F7}", group: "A" },
        CZE: { name: "Chequia", flag: "\u{1F1E8}\u{1F1FF}", group: "A" },
        CAN: { name: "Canada", flag: "\u{1F1E8}\u{1F1E6}", group: "B" },
        BIH: { name: "Bosnia", flag: "\u{1F1E7}\u{1F1E6}", group: "B" },
        QAT: { name: "Qatar", flag: "\u{1F1F6}\u{1F1E6}", group: "B" },
        SUI: { name: "Suiza", flag: "\u{1F1E8}\u{1F1ED}", group: "B" },
        BRA: { name: "Brasil", flag: "\u{1F1E7}\u{1F1F7}", group: "C" },
        MAR: { name: "Marruecos", flag: "\u{1F1F2}\u{1F1E6}", group: "C" },
        HAI: { name: "Haiti", flag: "\u{1F1ED}\u{1F1F9}", group: "C" },
        SCO: { name: "Escocia", flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}", group: "C" },
        USA: { name: "Estados Unidos", flag: "\u{1F1FA}\u{1F1F8}", group: "D" },
        PAR: { name: "Paraguay", flag: "\u{1F1F5}\u{1F1FE}", group: "D" },
        AUS: { name: "Australia", flag: "\u{1F1E6}\u{1F1FA}", group: "D" },
        TUR: { name: "Turquia", flag: "\u{1F1F9}\u{1F1F7}", group: "D" },
        GER: { name: "Alemania", flag: "\u{1F1E9}\u{1F1EA}", group: "E" },
        CUR: { name: "Curazao", flag: "\u{1F1E8}\u{1F1FC}", group: "E" },
        CIV: { name: "Costa de Marfil", flag: "\u{1F1E8}\u{1F1EE}", group: "E" },
        ECU: { name: "Ecuador", flag: "\u{1F1EA}\u{1F1E8}", group: "E" },
        NED: { name: "Paises Bajos", flag: "\u{1F1F3}\u{1F1F1}", group: "F" },
        JPN: { name: "Japon", flag: "\u{1F1EF}\u{1F1F5}", group: "F" },
        SWE: { name: "Suecia", flag: "\u{1F1F8}\u{1F1EA}", group: "F" },
        TUN: { name: "Tunez", flag: "\u{1F1F9}\u{1F1F3}", group: "F" },
        BEL: { name: "Belgica", flag: "\u{1F1E7}\u{1F1EA}", group: "G" },
        EGY: { name: "Egipto", flag: "\u{1F1EA}\u{1F1EC}", group: "G" },
        IRN: { name: "Iran", flag: "\u{1F1EE}\u{1F1F7}", group: "G" },
        NZL: { name: "Nueva Zelanda", flag: "\u{1F1F3}\u{1F1FF}", group: "G" },
        ESP: { name: "Espana", flag: "\u{1F1EA}\u{1F1F8}", group: "H" },
        CPV: { name: "Cabo Verde", flag: "\u{1F1E8}\u{1F1FB}", group: "H" },
        KSA: { name: "Arabia Saudita", flag: "\u{1F1F8}\u{1F1E6}", group: "H" },
        URU: { name: "Uruguay", flag: "\u{1F1FA}\u{1F1FE}", group: "H" },
        FRA: { name: "Francia", flag: "\u{1F1EB}\u{1F1F7}", group: "I" },
        SEN: { name: "Senegal", flag: "\u{1F1F8}\u{1F1F3}", group: "I" },
        IRQ: { name: "Irak", flag: "\u{1F1EE}\u{1F1F6}", group: "I" },
        NOR: { name: "Noruega", flag: "\u{1F1F3}\u{1F1F4}", group: "I" },
        ARG: { name: "Argentina", flag: "\u{1F1E6}\u{1F1F7}", group: "J" },
        ALG: { name: "Argelia", flag: "\u{1F1E9}\u{1F1FF}", group: "J" },
        AUT: { name: "Austria", flag: "\u{1F1E6}\u{1F1F9}", group: "J" },
        JOR: { name: "Jordania", flag: "\u{1F1EF}\u{1F1F4}", group: "J" },
        POR: { name: "Portugal", flag: "\u{1F1F5}\u{1F1F9}", group: "K" },
        COD: { name: "RD Congo", flag: "\u{1F1E8}\u{1F1E9}", group: "K" },
        UZB: { name: "Uzbekistan", flag: "\u{1F1FA}\u{1F1FF}", group: "K" },
        COL: { name: "Colombia", flag: "\u{1F1E8}\u{1F1F4}", group: "K" },
        ENG: { name: "Inglaterra", flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}", group: "L" },
        CRO: { name: "Croacia", flag: "\u{1F1ED}\u{1F1F7}", group: "L" },
        GHA: { name: "Ghana", flag: "\u{1F1EC}\u{1F1ED}", group: "L" },
        PAN: { name: "Panama", flag: "\u{1F1F5}\u{1F1E6}", group: "L" }
    };

    // ----------------------------------------------------------
    // MATCHES DATA - Group Stage (UTC times)
    // ----------------------------------------------------------
    const MATCHES = [
        // Matchday 1
        { id: 1,  home: "MEX", away: "RSA", group: "A", date: "2026-06-11", utc: "19:00", phase: "group" },
        { id: 2,  home: "KOR", away: "CZE", group: "A", date: "2026-06-12", utc: "02:00", phase: "group" },
        { id: 3,  home: "CAN", away: "BIH", group: "B", date: "2026-06-12", utc: "19:00", phase: "group" },
        { id: 4,  home: "USA", away: "PAR", group: "D", date: "2026-06-13", utc: "01:00", phase: "group" },
        { id: 5,  home: "QAT", away: "SUI", group: "B", date: "2026-06-13", utc: "19:00", phase: "group" },
        { id: 6,  home: "BRA", away: "MAR", group: "C", date: "2026-06-13", utc: "22:00", phase: "group" },
        { id: 7,  home: "HAI", away: "SCO", group: "C", date: "2026-06-14", utc: "01:00", phase: "group" },
        { id: 24, home: "AUS", away: "TUR", group: "D", date: "2026-06-14", utc: "04:00", phase: "group" },
        { id: 8,  home: "GER", away: "CUR", group: "E", date: "2026-06-14", utc: "17:00", phase: "group" },
        { id: 9,  home: "NED", away: "JPN", group: "F", date: "2026-06-14", utc: "20:00", phase: "group" },
        { id: 10, home: "CIV", away: "ECU", group: "E", date: "2026-06-14", utc: "23:00", phase: "group" },
        { id: 11, home: "SWE", away: "TUN", group: "F", date: "2026-06-15", utc: "02:00", phase: "group" },
        { id: 12, home: "ESP", away: "CPV", group: "H", date: "2026-06-15", utc: "16:00", phase: "group" },
        { id: 13, home: "BEL", away: "EGY", group: "G", date: "2026-06-15", utc: "19:00", phase: "group" },
        { id: 14, home: "KSA", away: "URU", group: "H", date: "2026-06-15", utc: "22:00", phase: "group" },
        { id: 15, home: "IRN", away: "NZL", group: "G", date: "2026-06-16", utc: "01:00", phase: "group" },
        { id: 16, home: "FRA", away: "SEN", group: "I", date: "2026-06-16", utc: "19:00", phase: "group" },
        { id: 17, home: "IRQ", away: "NOR", group: "I", date: "2026-06-16", utc: "22:00", phase: "group" },
        { id: 18, home: "ARG", away: "ALG", group: "J", date: "2026-06-17", utc: "01:00", phase: "group" },
        { id: 19, home: "AUT", away: "JOR", group: "J", date: "2026-06-17", utc: "04:00", phase: "group" },
        { id: 20, home: "POR", away: "COD", group: "K", date: "2026-06-17", utc: "17:00", phase: "group" },
        { id: 21, home: "ENG", away: "CRO", group: "L", date: "2026-06-17", utc: "20:00", phase: "group" },
        { id: 22, home: "GHA", away: "PAN", group: "L", date: "2026-06-17", utc: "23:00", phase: "group" },
        { id: 23, home: "UZB", away: "COL", group: "K", date: "2026-06-18", utc: "02:00", phase: "group" },
        // Matchday 2
        { id: 25, home: "CZE", away: "RSA", group: "A", date: "2026-06-18", utc: "16:00", phase: "group" },
        { id: 26, home: "SUI", away: "BIH", group: "B", date: "2026-06-18", utc: "19:00", phase: "group" },
        { id: 27, home: "CAN", away: "QAT", group: "B", date: "2026-06-18", utc: "22:00", phase: "group" },
        { id: 28, home: "MEX", away: "KOR", group: "A", date: "2026-06-19", utc: "01:00", phase: "group" },
        { id: 29, home: "USA", away: "AUS", group: "D", date: "2026-06-19", utc: "19:00", phase: "group" },
        { id: 30, home: "SCO", away: "MAR", group: "C", date: "2026-06-19", utc: "22:00", phase: "group" },
        { id: 31, home: "BRA", away: "HAI", group: "C", date: "2026-06-20", utc: "00:30", phase: "group" },
        { id: 32, home: "TUR", away: "PAR", group: "D", date: "2026-06-20", utc: "03:00", phase: "group" },
        { id: 33, home: "NED", away: "SWE", group: "F", date: "2026-06-20", utc: "17:00", phase: "group" },
        { id: 35, home: "GER", away: "CIV", group: "E", date: "2026-06-20", utc: "20:00", phase: "group" },
        { id: 36, home: "ECU", away: "CUR", group: "E", date: "2026-06-21", utc: "00:00", phase: "group" },
        { id: 34, home: "TUN", away: "JPN", group: "F", date: "2026-06-21", utc: "04:00", phase: "group" },
        { id: 37, home: "ESP", away: "KSA", group: "H", date: "2026-06-21", utc: "16:00", phase: "group" },
        { id: 39, home: "BEL", away: "IRN", group: "G", date: "2026-06-21", utc: "19:00", phase: "group" },
        { id: 38, home: "URU", away: "CPV", group: "H", date: "2026-06-21", utc: "22:00", phase: "group" },
        { id: 40, home: "NZL", away: "EGY", group: "G", date: "2026-06-22", utc: "01:00", phase: "group" },
        { id: 43, home: "ARG", away: "AUT", group: "J", date: "2026-06-22", utc: "17:00", phase: "group" },
        { id: 41, home: "FRA", away: "IRQ", group: "I", date: "2026-06-22", utc: "21:00", phase: "group" },
        { id: 42, home: "NOR", away: "SEN", group: "I", date: "2026-06-23", utc: "00:00", phase: "group" },
        { id: 44, home: "JOR", away: "ALG", group: "J", date: "2026-06-23", utc: "03:00", phase: "group" },
        { id: 45, home: "POR", away: "UZB", group: "K", date: "2026-06-23", utc: "17:00", phase: "group" },
        { id: 47, home: "ENG", away: "GHA", group: "L", date: "2026-06-23", utc: "20:00", phase: "group" },
        { id: 48, home: "PAN", away: "CRO", group: "L", date: "2026-06-23", utc: "23:00", phase: "group" },
        { id: 46, home: "COL", away: "COD", group: "K", date: "2026-06-24", utc: "02:00", phase: "group" },
        // Matchday 3
        { id: 51, home: "BIH", away: "QAT", group: "B", date: "2026-06-24", utc: "19:00", phase: "group" },
        { id: 52, home: "SUI", away: "CAN", group: "B", date: "2026-06-24", utc: "19:00", phase: "group" },
        { id: 53, home: "MAR", away: "HAI", group: "C", date: "2026-06-24", utc: "22:00", phase: "group" },
        { id: 54, home: "SCO", away: "BRA", group: "C", date: "2026-06-24", utc: "22:00", phase: "group" },
        { id: 49, home: "RSA", away: "KOR", group: "A", date: "2026-06-25", utc: "01:00", phase: "group" },
        { id: 50, home: "CZE", away: "MEX", group: "A", date: "2026-06-25", utc: "01:00", phase: "group" },
        { id: 59, home: "CUR", away: "CIV", group: "E", date: "2026-06-25", utc: "20:00", phase: "group" },
        { id: 60, home: "ECU", away: "GER", group: "E", date: "2026-06-25", utc: "20:00", phase: "group" },
        { id: 57, home: "JPN", away: "SWE", group: "F", date: "2026-06-25", utc: "23:00", phase: "group" },
        { id: 58, home: "TUN", away: "NED", group: "F", date: "2026-06-25", utc: "23:00", phase: "group" },
        { id: 55, home: "PAR", away: "AUS", group: "D", date: "2026-06-26", utc: "02:00", phase: "group" },
        { id: 56, home: "TUR", away: "USA", group: "D", date: "2026-06-26", utc: "02:00", phase: "group" },
        { id: 65, home: "NOR", away: "FRA", group: "I", date: "2026-06-26", utc: "19:00", phase: "group" },
        { id: 66, home: "SEN", away: "IRQ", group: "I", date: "2026-06-26", utc: "19:00", phase: "group" },
        { id: 61, home: "CPV", away: "KSA", group: "H", date: "2026-06-27", utc: "00:00", phase: "group" },
        { id: 62, home: "URU", away: "ESP", group: "H", date: "2026-06-27", utc: "00:00", phase: "group" },
        { id: 63, home: "NZL", away: "BEL", group: "G", date: "2026-06-27", utc: "03:00", phase: "group" },
        { id: 64, home: "EGY", away: "IRN", group: "G", date: "2026-06-27", utc: "03:00", phase: "group" },
        { id: 71, home: "PAN", away: "ENG", group: "L", date: "2026-06-27", utc: "21:00", phase: "group" },
        { id: 72, home: "CRO", away: "GHA", group: "L", date: "2026-06-27", utc: "21:00", phase: "group" },
        { id: 69, home: "COL", away: "POR", group: "K", date: "2026-06-27", utc: "23:30", phase: "group" },
        { id: 70, home: "COD", away: "UZB", group: "K", date: "2026-06-27", utc: "23:30", phase: "group" },
        { id: 67, home: "ALG", away: "AUT", group: "J", date: "2026-06-28", utc: "02:00", phase: "group" },
        { id: 68, home: "JOR", away: "ARG", group: "J", date: "2026-06-28", utc: "02:00", phase: "group" }
    ];

    // Knockout matches - added by admin when teams are confirmed
    let knockoutMatches = [];

    // Countries for user registration
    const USER_COUNTRIES = [
        { code: "AR", name: "Argentina", flag: "\u{1F1E6}\u{1F1F7}" },
        { code: "BO", name: "Bolivia", flag: "\u{1F1E7}\u{1F1F4}" },
        { code: "BR", name: "Brasil", flag: "\u{1F1E7}\u{1F1F7}" },
        { code: "CL", name: "Chile", flag: "\u{1F1E8}\u{1F1F1}" },
        { code: "CO", name: "Colombia", flag: "\u{1F1E8}\u{1F1F4}" },
        { code: "CR", name: "Costa Rica", flag: "\u{1F1E8}\u{1F1F7}" },
        { code: "CU", name: "Cuba", flag: "\u{1F1E8}\u{1F1FA}" },
        { code: "EC", name: "Ecuador", flag: "\u{1F1EA}\u{1F1E8}" },
        { code: "SV", name: "El Salvador", flag: "\u{1F1F8}\u{1F1FB}" },
        { code: "ES", name: "Espana", flag: "\u{1F1EA}\u{1F1F8}" },
        { code: "US", name: "Estados Unidos", flag: "\u{1F1FA}\u{1F1F8}" },
        { code: "GT", name: "Guatemala", flag: "\u{1F1EC}\u{1F1F9}" },
        { code: "HN", name: "Honduras", flag: "\u{1F1ED}\u{1F1F3}" },
        { code: "MX", name: "Mexico", flag: "\u{1F1F2}\u{1F1FD}" },
        { code: "NI", name: "Nicaragua", flag: "\u{1F1F3}\u{1F1EE}" },
        { code: "PA", name: "Panama", flag: "\u{1F1F5}\u{1F1E6}" },
        { code: "PY", name: "Paraguay", flag: "\u{1F1F5}\u{1F1FE}" },
        { code: "PE", name: "Peru", flag: "\u{1F1F5}\u{1F1EA}" },
        { code: "PR", name: "Puerto Rico", flag: "\u{1F1F5}\u{1F1F7}" },
        { code: "DO", name: "Rep. Dominicana", flag: "\u{1F1E9}\u{1F1F4}" },
        { code: "UY", name: "Uruguay", flag: "\u{1F1FA}\u{1F1FE}" },
        { code: "VE", name: "Venezuela", flag: "\u{1F1FB}\u{1F1EA}" },
        { code: "OTHER", name: "Otro", flag: "\u{1F30D}" }
    ];

    // ----------------------------------------------------------
    // STATE
    // ----------------------------------------------------------
    let currentUser = null;
    let predictions = {};
    let results = {};
    let allPredictions = {};
    let squads = {};           // { teamCode: [{ name, position }] }
    let squadsLoaded = false;
    let currentMatchForPred = null;

    // ----------------------------------------------------------
    // INIT
    // ----------------------------------------------------------
    async function init() {
        loadFromStorage();
        await loadSquadsFromFile();
        populateCountrySelect();
        populateGroupFilter();
        populateDateFilter();
        populateAdminMatchSelect();
        populateAdminDateSelect();
        renderMatches();

        if (currentUser) {
            document.getElementById("login-modal").style.display = "none";
            updateUserBar();
        }

        // Listen for score changes in prediction to update scorer dropdowns
        document.getElementById("pred-home-score").addEventListener("change", updateScorerOptions);
        document.getElementById("pred-away-score").addEventListener("change", updateScorerOptions);

        // Load all predictions from Sheets, then fix current user's data
        await loadFromSheets();
        if (currentUser && Object.keys(predictions).length > 0) {
            allPredictions[currentUser.username] = {
                country: currentUser.country,
                countryFlag: currentUser.countryFlag,
                predictions: { ...predictions }
            };
            localStorage.setItem("mundial_all_predictions", JSON.stringify(allPredictions));
            // Re-sync to fix corrupted scorer data in Sheets
            syncToSheets();
        }
    }

    // ----------------------------------------------------------
    // LOAD SQUADS FROM LOCAL JSON (no API calls)
    // ----------------------------------------------------------
    async function loadSquadsFromFile() {
        if (squadsLoaded && Object.keys(squads).length > 0) return;
        try {
            const res = await fetch("squads.json");
            if (res.ok) {
                squads = await res.json();
                squadsLoaded = true;
                localStorage.setItem("mundial_squads", JSON.stringify(squads));
            }
        } catch (e) {
            // Fallback to localStorage cache
            const cached = localStorage.getItem("mundial_squads");
            if (cached) {
                squads = JSON.parse(cached);
                squadsLoaded = true;
            }
            console.warn("No se pudo cargar squads.json, usando cache:", e);
        }
    }

    // ----------------------------------------------------------
    // STORAGE
    // ----------------------------------------------------------
    function loadFromStorage() {
        const user = localStorage.getItem("mundial_user");
        if (user) currentUser = JSON.parse(user);

        const preds = localStorage.getItem("mundial_predictions");
        if (preds) predictions = JSON.parse(preds);

        const res = localStorage.getItem("mundial_results");
        if (res) results = JSON.parse(res);

        const allP = localStorage.getItem("mundial_all_predictions");
        if (allP) allPredictions = JSON.parse(allP);

        const sq = localStorage.getItem("mundial_squads");
        if (sq) squads = JSON.parse(sq);

        const ko = localStorage.getItem("mundial_knockout");
        if (ko) knockoutMatches = JSON.parse(ko);
    }

    function saveToStorage() {
        if (currentUser) localStorage.setItem("mundial_user", JSON.stringify(currentUser));
        localStorage.setItem("mundial_predictions", JSON.stringify(predictions));
        localStorage.setItem("mundial_results", JSON.stringify(results));
        localStorage.setItem("mundial_all_predictions", JSON.stringify(allPredictions));

        if (currentUser) {
            allPredictions[currentUser.username] = {
                country: currentUser.country,
                countryFlag: currentUser.countryFlag,
                predictions: { ...predictions }
            };
            localStorage.setItem("mundial_all_predictions", JSON.stringify(allPredictions));
        }

        syncToSheets();
    }

    function serializePredictions(preds) {
        const copy = {};
        Object.keys(preds).forEach(matchId => {
            const p = preds[matchId];
            copy[matchId] = {
                homeScore: p.homeScore,
                awayScore: p.awayScore,
                advances: p.advances || null,
                scorers: (p.scorers || []).map(s =>
                    typeof s === "string" ? s : (s.player + (s.ownGoal ? " (AG)" : ""))
                )
            };
        });
        return copy;
    }

    async function syncToSheets() {
        if (!SHEETS_API_URL || !currentUser) return;
        try {
            await fetch(SHEETS_API_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "savePrediction",
                    username: currentUser.username,
                    country: currentUser.country,
                    countryFlag: currentUser.countryFlag,
                    predictions: serializePredictions(predictions)
                })
            });
        } catch (e) {
            console.warn("No se pudo sincronizar con Google Sheets:", e);
        }
    }

    function cleanScorerData(preds) {
        // Remove "[object Object]" entries from corrupted Sheets data
        Object.keys(preds).forEach(username => {
            const userPreds = preds[username].predictions || {};
            Object.keys(userPreds).forEach(matchId => {
                const p = userPreds[matchId];
                if (p.scorers) {
                    p.scorers = p.scorers.filter(s => {
                        const name = typeof s === "string" ? s : (s.player || "");
                        return name && !name.includes("[object");
                    });
                }
            });
        });
    }

    async function loadFromSheets() {
        if (!SHEETS_API_URL) return;
        try {
            const res = await fetch(SHEETS_API_URL + "?action=getAll");
            const data = await res.json();
            if (data && data.predictions) {
                allPredictions = data.predictions;
                cleanScorerData(allPredictions);
                localStorage.setItem("mundial_all_predictions", JSON.stringify(allPredictions));
            }
            if (data && data.results) {
                results = data.results;
                localStorage.setItem("mundial_results", JSON.stringify(results));
            }
        } catch (e) {
            console.warn("No se pudo cargar desde Google Sheets:", e);
        }
    }

    // ----------------------------------------------------------
    // ESPN API: FETCH RESULTS AUTOMATICALLY (free, no key)
    // ----------------------------------------------------------
    async function fetchResultsFromAPI() {
        showToast("Consultando resultados desde ESPN...");

        try {
            const allM = getAllMatches();
            const dates = [...new Set(allM.map(m => m.date))].sort();
            let updated = 0;

            // Only check dates that could have finished matches
            const today = new Date().toISOString().substring(0, 10);
            const pastDates = dates.filter(d => d <= today);

            // Collect ESPN dates to query: for each match date, also check previous day
            // (ESPN groups by US Eastern time, so early-UTC matches appear under the prior day)
            const espnDatesSet = new Set();
            for (const date of pastDates) {
                espnDatesSet.add(date);
                const prev = new Date(date + "T12:00:00");
                prev.setDate(prev.getDate() - 1);
                espnDatesSet.add(prev.toISOString().substring(0, 10));
            }
            const espnDates = [...espnDatesSet].sort();

            for (const date of espnDates) {
                const espnDate = date.replace(/-/g, "");
                const res = await fetch(`${ESPN_API_URL}?dates=${espnDate}`);
                const data = await res.json();
                const events = data.events || [];

                for (const event of events) {
                    const comp = event.competitions[0];
                    const status = comp.status?.type?.name || "";

                    // Only process finished matches
                    if (status !== "STATUS_FULL_TIME" && status !== "STATUS_FINAL") continue;

                    const competitors = comp.competitors || [];
                    if (competitors.length < 2) continue;

                    // ESPN: competitors[0] is home, competitors[1] is away
                    const espnHome = competitors.find(c => c.homeAway === "home") || competitors[0];
                    const espnAway = competitors.find(c => c.homeAway === "away") || competitors[1];

                    const homeAbbr = espnHome.team.abbreviation.toUpperCase();
                    const awayAbbr = espnAway.team.abbreviation.toUpperCase();
                    const homeScore = parseInt(espnHome.score);
                    const awayScore = parseInt(espnAway.score);

                    // Map ESPN abbreviation to our code
                    const homeCode = espnAbbrToCode(homeAbbr);
                    const awayCode = espnAbbrToCode(awayAbbr);

                    // Find matching match across ALL matches
                    const match = allM.find(m =>
                        (m.home === homeCode && m.away === awayCode) ||
                        (m.home === awayCode && m.away === homeCode)
                    );

                    if (!match) continue;

                    // Get scorers from details
                    const scorers = [];
                    const details = comp.details || [];
                    details.forEach(det => {
                        const typeText = (det.type?.text || "").toLowerCase();
                        // Match: Goal, Own Goal, Penalty - Scored, etc.
                        const isGoal = typeText.includes("goal") ||
                            (typeText.includes("penalty") && !typeText.includes("miss") && !typeText.includes("saved"));
                        if (isGoal) {
                            const athletes = det.athletesInvolved || [];
                            athletes.forEach(a => {
                                if (a.displayName) scorers.push(a.displayName);
                            });
                        }
                    });

                    // Determine who advanced (knockout)
                    let advances = null;
                    if (match.phase !== "group") {
                        const homeWon = espnHome.winner;
                        advances = homeWon ? match.home : match.away;
                    }

                    // Build new result
                    const newResult = match.home === homeCode
                        ? { homeScore, awayScore, scorers, advances }
                        : { homeScore: awayScore, awayScore: homeScore, scorers, advances };

                    // Check if result changed
                    const old = results[match.id];
                    if (!old || old.homeScore !== newResult.homeScore || old.awayScore !== newResult.awayScore ||
                        JSON.stringify(old.scorers) !== JSON.stringify(newResult.scorers)) {
                        updated++;
                    }
                    results[match.id] = newResult;
                }

                // Small delay between date requests
                await new Promise(r => setTimeout(r, 300));
            }

            localStorage.setItem("mundial_results", JSON.stringify(results));
            renderMatches();

            if (updated > 0) {
                showToast(`${updated} resultado(s) actualizado(s)`);
                // Sync to sheets
                if (SHEETS_API_URL) {
                    for (const matchId of Object.keys(results)) {
                        const r = results[matchId];
                        fetch(SHEETS_API_URL, {
                            method: "POST",
                            mode: "no-cors",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                action: "saveResult",
                                matchId, homeScore: r.homeScore,
                                awayScore: r.awayScore,
                                scorers: r.scorers,
                                advances: r.advances
                            })
                        }).catch(() => {});
                    }
                }
            } else {
                showToast("No hay resultados nuevos");
            }
        } catch (e) {
            showToast("Error consultando ESPN: " + e.message, true);
            console.error(e);
        }
    }

    // Map ESPN abbreviations to our team codes
    function espnAbbrToCode(abbr) {
        const map = {
            "MEX": "MEX", "RSA": "RSA", "KOR": "KOR", "CZE": "CZE",
            "CAN": "CAN", "BIH": "BIH", "QAT": "QAT", "SUI": "SUI",
            "BRA": "BRA", "MAR": "MAR", "HAI": "HAI", "SCO": "SCO",
            "USA": "USA", "PAR": "PAR", "AUS": "AUS", "TUR": "TUR",
            "GER": "GER", "CUW": "CUR", "CIV": "CIV", "ECU": "ECU",
            "NED": "NED", "JPN": "JPN", "SWE": "SWE", "TUN": "TUN",
            "BEL": "BEL", "EGY": "EGY", "IRN": "IRN", "NZL": "NZL",
            "ESP": "ESP", "CPV": "CPV", "KSA": "KSA", "URU": "URU",
            "FRA": "FRA", "SEN": "SEN", "IRQ": "IRQ", "NOR": "NOR",
            "ARG": "ARG", "ALG": "ALG", "AUT": "AUT", "JOR": "JOR",
            "POR": "POR", "COD": "COD", "UZB": "UZB", "COL": "COL",
            "ENG": "ENG", "CRO": "CRO", "GHA": "GHA", "PAN": "PAN"
        };
        return map[abbr] || abbr;
    }

    // ----------------------------------------------------------
    // AUTH
    // ----------------------------------------------------------
    function login(event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value.trim();
        const countrySelect = document.getElementById("login-country");
        const selectedOption = countrySelect.options[countrySelect.selectedIndex];
        const country = selectedOption.text;
        const countryFlag = selectedOption.dataset.flag;

        if (!username) return;

        currentUser = { username, country, countryFlag };
        localStorage.setItem("mundial_user", JSON.stringify(currentUser));

        if (allPredictions[username]) {
            predictions = allPredictions[username].predictions || {};
            localStorage.setItem("mundial_predictions", JSON.stringify(predictions));
        }

        document.getElementById("login-modal").style.display = "none";
        updateUserBar();
        renderMatches();
        showToast("Bienvenido, " + username);
    }

    function logout() {
        currentUser = null;
        predictions = {};
        localStorage.removeItem("mundial_user");
        localStorage.removeItem("mundial_predictions");
        document.getElementById("login-modal").style.display = "flex";
        document.getElementById("user-display").textContent = "";
        document.getElementById("btn-logout").style.display = "none";
        renderMatches();
    }

    function updateUserBar() {
        if (!currentUser) return;
        document.getElementById("user-display").textContent =
            currentUser.countryFlag + " " + currentUser.username;
        document.getElementById("btn-logout").style.display = "inline-block";
    }

    // ----------------------------------------------------------
    // POPULATE SELECTS
    // ----------------------------------------------------------
    function populateCountrySelect() {
        const sel = document.getElementById("login-country");
        USER_COUNTRIES.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.code;
            opt.textContent = c.flag + " " + c.name;
            opt.dataset.flag = c.flag;
            sel.appendChild(opt);
        });
    }

    function populateGroupFilter() {
        const sel = document.getElementById("filter-group");
        "ABCDEFGHIJKL".split("").forEach(g => {
            const opt = document.createElement("option");
            opt.value = g;
            opt.textContent = "Grupo " + g;
            sel.appendChild(opt);
        });
        // Add knockout phases
        const koOpt = document.createElement("option");
        koOpt.value = "knockout";
        koOpt.textContent = "Eliminatorias";
        sel.appendChild(koOpt);
    }

    function populateDateFilter() {
        const sel = document.getElementById("filter-date");
        const allMatches = getAllMatches();
        const dates = [...new Set(allMatches.map(m => matchLocalDate(m)))].sort();
        dates.forEach(d => {
            const opt = document.createElement("option");
            opt.value = d;
            opt.textContent = formatDateShort(d);
            sel.appendChild(opt);
        });
    }

    function populateAdminMatchSelect() {
        const sel = document.getElementById("admin-match-select");
        getAllMatches().forEach(m => {
            const home = TEAMS[m.home];
            const away = TEAMS[m.away];
            if (!home || !away) return;
            const opt = document.createElement("option");
            opt.value = m.id;
            const phaseLabel = m.phase !== "group" ? ` [${getPhaseLabel(m.phase)}]` : "";
            opt.textContent = home.flag + " " + home.name +
                " vs " + away.flag + " " + away.name +
                " (" + formatDateShort(matchLocalDate(m)) + ")" + phaseLabel;
            sel.appendChild(opt);
        });
    }

    function populateAdminDateSelect() {
        const sel = document.getElementById("admin-wa-date");
        const allMatches = getAllMatches();
        const dates = [...new Set(allMatches.map(m => matchLocalDate(m)))].sort();
        dates.forEach(d => {
            const opt = document.createElement("option");
            opt.value = d;
            opt.textContent = formatDateShort(d);
            sel.appendChild(opt);
        });
    }

    function getAllMatches() {
        return [...MATCHES, ...knockoutMatches];
    }

    function getPhaseLabel(phase) {
        const labels = {
            group: "Grupos",
            round32: "32avos",
            round16: "Octavos",
            quarter: "Cuartos",
            semi: "Semifinal",
            third: "3er Puesto",
            final: "Final"
        };
        return labels[phase] || phase;
    }

    // ----------------------------------------------------------
    // RENDER MATCHES
    // ----------------------------------------------------------
    function renderMatches() {
        const container = document.getElementById("matches-list");
        const groupFilter = document.getElementById("filter-group").value;
        const dateFilter = document.getElementById("filter-date").value;

        let allM = getAllMatches();

        let filtered = allM.filter(m => {
            if (groupFilter === "knockout") {
                if (m.phase === "group") return false;
            } else if (groupFilter !== "all") {
                if (m.group !== groupFilter) return false;
            }
            if (dateFilter !== "all" && matchLocalDate(m) !== dateFilter) return false;
            return true;
        });

        filtered.sort((a, b) => (a.date + a.utc).localeCompare(b.date + b.utc));

        let html = "";
        let lastDate = "";
        const now = new Date();

        filtered.forEach(m => {
            const home = TEAMS[m.home];
            const away = TEAMS[m.away];
            if (!home || !away) return;

            const localDate = matchLocalDate(m);
            if (localDate !== lastDate) {
                lastDate = localDate;
                html += `<div class="match-date-header">${formatDateLong(localDate)}</div>`;
            }

            const result = results[m.id];
            const pred = predictions[m.id];
            const localTime = utcToLocal(m.date, m.utc);
            const played = !!result;
            const kickoff = new Date(m.date + "T" + m.utc + ":00Z");
            const started = now >= kickoff;
            const hasPred = !!pred;
            const isKnockout = m.phase !== "group";
            const phaseTag = isKnockout ? getPhaseLabel(m.phase) : "Grupo " + m.group;

            let scoreHtml = "";
            if (played) {
                scoreHtml = `<span class="match-score">${result.homeScore} - ${result.awayScore}</span>`;
            }

            let predBadge = "";
            if (hasPred) {
                let extra = "";
                if (isKnockout && pred.advances) {
                    const advTeam = TEAMS[pred.advances];
                    extra = " | Clasifica: " + (advTeam ? advTeam.flag : "");
                }
                predBadge = `<span class="match-prediction-badge">Tu: ${pred.homeScore}-${pred.awayScore}${extra}</span>`;
            }

            const viewAllBtn = started
                ? `<button class="btn-view-all" onclick="event.stopPropagation(); App.showMatchPredictions('${m.id}')">Ver pronosticos</button>`
                : "";

            html += `
                <div class="match-card ${played ? 'played' : ''} ${hasPred ? 'has-prediction' : ''}"
                     onclick="${played ? '' : `App.openPrediction('${m.id}')`}">
                    <div class="match-teams">
                        <div class="match-team">
                            <span class="team-flag">${home.flag}</span>
                            <span class="team-name">${home.name}</span>
                        </div>
                        <span class="match-vs">${played ? '' : 'vs'}</span>
                        ${scoreHtml}
                        <div class="match-team away">
                            <span class="team-name">${away.name}</span>
                            <span class="team-flag">${away.flag}</span>
                        </div>
                    </div>
                    <span class="match-group">${phaseTag}</span>
                    <span class="match-time">${localTime}</span>
                    ${predBadge}
                    ${viewAllBtn}
                </div>`;
        });

        if (!filtered.length) {
            html = '<p style="color:#666;text-align:center;padding:40px;">No hay partidos para este filtro.</p>';
        }

        container.innerHTML = html;
    }

    function filterMatches() {
        renderMatches();
    }

    // ----------------------------------------------------------
    // PREDICTION MODAL
    // ----------------------------------------------------------
    async function openPrediction(matchId) {
        if (!currentUser) {
            document.getElementById("login-modal").style.display = "flex";
            return;
        }

        const allM = getAllMatches();
        const match = allM.find(m => String(m.id) === String(matchId));
        if (!match) return;

        currentMatchForPred = match;
        const isKnockout = match.phase !== "group";

        // Check deadline
        const kickoff = new Date(match.date + "T" + match.utc + ":00Z");
        const deadline = new Date(kickoff.getTime() - 5 * 60 * 1000);
        const now = new Date();

        const deadlineEl = document.getElementById("pred-deadline");
        if (now >= deadline) {
            deadlineEl.textContent = "CERRADO - El pronostico ya no se acepta para este partido.";
            deadlineEl.className = "deadline-text";
        } else {
            deadlineEl.textContent = "Abierto - Cierra " + deadline.toLocaleString();
            deadlineEl.className = "deadline-text open";
        }

        const home = TEAMS[match.home];
        const away = TEAMS[match.away];

        document.getElementById("pred-match-id").value = matchId;
        document.getElementById("pred-match-title").textContent =
            home.flag + " " + home.name + " vs " + away.flag + " " + away.name;

        const phaseLabel = isKnockout ? getPhaseLabel(match.phase) : "Grupo " + match.group;
        document.getElementById("pred-match-info").textContent =
            phaseLabel + " | " + formatDateLong(matchLocalDate(match));
        document.getElementById("pred-home-name").textContent = home.flag + " " + home.name;
        document.getElementById("pred-away-name").textContent = away.flag + " " + away.name;

        // Knockout: show "who advances" section
        const advancesSection = document.getElementById("advances-section");
        if (isKnockout) {
            advancesSection.style.display = "block";
            const advSelect = document.getElementById("pred-advances");
            advSelect.innerHTML = `
                <option value="">Selecciona quien clasifica...</option>
                <option value="${match.home}">${home.flag} ${home.name}</option>
                <option value="${match.away}">${away.flag} ${away.name}</option>`;
        } else {
            advancesSection.style.display = "none";
        }

        // Load existing prediction
        const pred = predictions[matchId];
        document.getElementById("pred-home-score").value = pred ? pred.homeScore : "";
        document.getElementById("pred-away-score").value = pred ? pred.awayScore : "";

        if (isKnockout && pred && pred.advances) {
            document.getElementById("pred-advances").value = pred.advances;
        }

        // Scorer inputs
        const scorerDiv = document.getElementById("scorer-inputs");
        scorerDiv.innerHTML = "";

        if (pred && pred.scorers && pred.scorers.length > 0) {
            pred.scorers.forEach(s => addScorerInputWithValue(s.player, s.ownGoal));
        } else {
            addScorerInput();
        }

        document.getElementById("prediction-modal").style.display = "flex";
    }

    function closePrediction() {
        document.getElementById("prediction-modal").style.display = "none";
        currentMatchForPred = null;
    }

    function addScorerInput() {
        addScorerInputWithValue("", false);
    }

    function addScorerInputWithValue(value, isOwnGoal) {
        if (!currentMatchForPred) return;

        const container = document.getElementById("scorer-inputs");
        const div = document.createElement("div");
        div.className = "scorer-row";

        // Own goal checkbox
        const ogLabel = document.createElement("label");
        ogLabel.className = "og-label";
        const ogCheck = document.createElement("input");
        ogCheck.type = "checkbox";
        ogCheck.className = "scorer-og";
        ogCheck.checked = !!isOwnGoal;
        ogCheck.addEventListener("change", () => updateSingleScorerDropdown(div));
        ogLabel.appendChild(ogCheck);
        ogLabel.appendChild(document.createTextNode(" AG"));
        ogLabel.title = "Autogol";

        // Player select
        const select = document.createElement("select");
        select.className = "scorer-name";

        div.appendChild(select);
        div.appendChild(ogLabel);
        container.appendChild(div);

        populateScorerDropdown(select, isOwnGoal, value);
    }

    function populateScorerDropdown(select, isOwnGoal, selectedValue) {
        if (!currentMatchForPred) return;

        const homeScore = parseInt(document.getElementById("pred-home-score").value) || 0;
        const awayScore = parseInt(document.getElementById("pred-away-score").value) || 0;

        // Determine which team's players to show
        let teamCode;
        if (isOwnGoal) {
            // Own goal: show players from the team that did NOT benefit from the goal
            // If home scores via OG, the OG scorer is from the away team
            // Since we don't know which side, show both teams for OG
            teamCode = null; // Show both
        } else {
            // Normal goal: show players from scoring teams
            if (homeScore > 0 && awayScore > 0) {
                teamCode = null; // Both teams scored, show both
            } else if (homeScore > 0) {
                teamCode = currentMatchForPred.home;
            } else if (awayScore > 0) {
                teamCode = currentMatchForPred.away;
            } else {
                // 0-0, no scorers needed
                select.innerHTML = '<option value="">No hay goleadores (0-0)</option>';
                return;
            }
        }

        select.innerHTML = '<option value="">Seleccionar goleador...</option>';

        const teamsToShow = teamCode
            ? [teamCode]
            : [currentMatchForPred.home, currentMatchForPred.away];

        teamsToShow.forEach(tc => {
            const team = TEAMS[tc];
            const squad = squads[tc] || [];

            if (squad.length > 0) {
                const optgroup = document.createElement("optgroup");
                optgroup.label = team.flag + " " + team.name;

                // Sort: Attackers first, then Midfielders, then Defenders, then Goalkeepers
                const posOrder = { Attacker: 0, Midfielder: 1, Defender: 2, Goalkeeper: 3 };
                const sorted = [...squad].sort((a, b) =>
                    (posOrder[a.position] ?? 4) - (posOrder[b.position] ?? 4)
                );

                sorted.forEach(p => {
                    const opt = document.createElement("option");
                    opt.value = p.name;
                    const posLabel = { Attacker: "DEL", Midfielder: "MED", Defender: "DEF", Goalkeeper: "POR" };
                    opt.textContent = p.name + " (" + (posLabel[p.position] || p.position) + ")";
                    if (p.name === selectedValue) opt.selected = true;
                    optgroup.appendChild(opt);
                });

                select.appendChild(optgroup);
            } else {
                // No squad loaded, add a text input fallback option
                const opt = document.createElement("option");
                opt.value = "__manual__";
                opt.textContent = team.flag + " " + team.name + " (sin convocatoria cargada)";
                select.appendChild(opt);
            }
        });
    }

    function updateSingleScorerDropdown(row) {
        const select = row.querySelector(".scorer-name");
        const ogCheck = row.querySelector(".scorer-og");
        const currentVal = select.value;
        populateScorerDropdown(select, ogCheck.checked, currentVal);
    }

    function updateScorerOptions() {
        // When score changes, update all scorer dropdowns
        const rows = document.querySelectorAll(".scorer-row");
        rows.forEach(row => {
            const select = row.querySelector(".scorer-name");
            const ogCheck = row.querySelector(".scorer-og");
            const currentVal = select.value;
            populateScorerDropdown(select, ogCheck ? ogCheck.checked : false, currentVal);
        });
    }

    function removeScorerInput() {
        const container = document.getElementById("scorer-inputs");
        if (container.children.length > 0) {
            container.removeChild(container.lastChild);
        }
    }

    function submitPrediction(event) {
        event.preventDefault();

        const matchId = document.getElementById("pred-match-id").value;
        const allM = getAllMatches();
        const match = allM.find(m => String(m.id) === String(matchId));

        // Validate deadline
        const kickoff = new Date(match.date + "T" + match.utc + ":00Z");
        const deadline = new Date(kickoff.getTime() - 5 * 60 * 1000);
        if (new Date() >= deadline) {
            showToast("Pronostico cerrado para este partido", true);
            return;
        }

        const homeScore = parseInt(document.getElementById("pred-home-score").value);
        const awayScore = parseInt(document.getElementById("pred-away-score").value);

        if (isNaN(homeScore) || isNaN(awayScore)) {
            showToast("Ingresa un marcador valido", true);
            return;
        }

        const isKnockout = match.phase !== "group";

        // Knockout: must select who advances
        let advances = null;
        if (isKnockout) {
            advances = document.getElementById("pred-advances").value;
            if (!advances) {
                showToast("Debes seleccionar quien clasifica", true);
                return;
            }
            // If not a draw, the advancing team must be the winner
            if (homeScore !== awayScore) {
                const winner = homeScore > awayScore ? match.home : match.away;
                if (advances !== winner) {
                    showToast("Si no predices empate, debe clasificar el ganador", true);
                    return;
                }
            }
        }

        // Collect scorers
        const scorerSelects = document.querySelectorAll(".scorer-name");
        const ogChecks = document.querySelectorAll(".scorer-og");
        const scorers = [];
        scorerSelects.forEach((sel, i) => {
            const val = sel.value.trim();
            if (val && val !== "__manual__") {
                scorers.push({
                    player: val,
                    ownGoal: ogChecks[i] ? ogChecks[i].checked : false
                });
            }
        });

        if (homeScore + awayScore > 0 && scorers.length === 0) {
            if (!confirm("No pusiste goleador. Si el partido no termina 0-0, pierdes ese punto. Continuar?")) {
                return;
            }
        }

        predictions[matchId] = { homeScore, awayScore, scorers, advances };
        saveToStorage();
        closePrediction();
        renderMatches();
        showToast("Pronostico guardado");
    }

    // ----------------------------------------------------------
    // MATCH PREDICTIONS VIEW (all players for a match)
    // ----------------------------------------------------------
    function showMatchPredictions(matchId) {
        const allM = getAllMatches();
        const match = allM.find(m => String(m.id) === String(matchId));
        if (!match) return;

        const home = TEAMS[match.home];
        const away = TEAMS[match.away];
        const result = results[matchId];
        const mode = document.getElementById("scoring-mode")?.value || "jorge";

        let html = `<div class="modal-content" style="max-width:600px">`;
        html += `<button class="modal-close" onclick="document.getElementById('match-preds-modal').style.display='none'">&times;</button>`;
        html += `<h2>${home.flag} ${home.name} vs ${away.flag} ${away.name}</h2>`;

        if (result) {
            html += `<p class="result-line">Resultado: <strong>${result.homeScore} - ${result.awayScore}</strong>`;
            if (result.scorers && result.scorers.length) {
                html += ` | Goles: ${result.scorers.join(", ")}`;
            }
            html += `</p>`;
        }

        html += `<table class="ranking-table" style="margin-top:10px"><thead><tr>
            <th>Jugador</th><th>Pronostico</th><th>Goleador(es)</th><th>Pts</th>
        </tr></thead><tbody>`;

        const rows = [];
        Object.keys(allPredictions).forEach(username => {
            const playerData = allPredictions[username];
            // Use local predictions for current user (has correct scorer data)
            const pred = (currentUser && username === currentUser.username)
                ? predictions[matchId]
                : (playerData.predictions || {})[matchId];
            if (!pred) return;

            const scorerNames = (pred.scorers || []).map(s =>
                typeof s === "string" ? s : (s.player + (s.ownGoal ? " (AG)" : ""))
            );

            let pts = "-";
            if (result) {
                pts = calculatePoints(pred, result, match, mode);
            }

            rows.push({ username, flag: playerData.countryFlag || "", pred, scorerNames, pts });
        });

        rows.sort((a, b) => (typeof b.pts === "number" ? b.pts : -1) - (typeof a.pts === "number" ? a.pts : -1));

        if (rows.length === 0) {
            html += `<tr><td colspan="4" style="text-align:center;color:#666;padding:15px;">Nadie hizo pronostico para este partido</td></tr>`;
        }

        rows.forEach(r => {
            html += `<tr>
                <td>${r.flag} ${r.username}</td>
                <td>${r.pred.homeScore} - ${r.pred.awayScore}</td>
                <td>${r.scorerNames.length ? r.scorerNames.join(", ") : "-"}</td>
                <td><strong>${r.pts}</strong></td>
            </tr>`;
        });

        html += `</tbody></table></div>`;

        let modal = document.getElementById("match-preds-modal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "match-preds-modal";
            modal.className = "modal";
            modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
            document.body.appendChild(modal);
        }
        modal.innerHTML = html;
        modal.style.display = "flex";
    }

    // ----------------------------------------------------------
    // MY PREDICTIONS VIEW
    // ----------------------------------------------------------
    function renderMyPredictions() {
        const container = document.getElementById("my-predictions-list");
        if (!currentUser) {
            container.innerHTML = '<p style="color:#666;text-align:center;padding:40px;">Ingresa tu usuario para ver tus pronosticos.</p>';
            return;
        }

        const allM = getAllMatches();
        const matchesWithPreds = allM.filter(m => predictions[m.id]);
        if (!matchesWithPreds.length) {
            container.innerHTML = '<p style="color:#666;text-align:center;padding:40px;">Aun no has hecho pronosticos. Ve a Partidos y haz click en un partido.</p>';
            return;
        }

        let html = "";
        matchesWithPreds.forEach(m => {
            const pred = predictions[m.id];
            const home = TEAMS[m.home];
            const away = TEAMS[m.away];
            if (!home || !away) return;
            const result = results[m.id];
            const isKnockout = m.phase !== "group";

            const scorerNames = (pred.scorers || []).map(s =>
                typeof s === "string" ? s : (s.player + (s.ownGoal ? " (AG)" : ""))
            );

            let advancesText = "";
            if (isKnockout && pred.advances) {
                const advTeam = TEAMS[pred.advances];
                advancesText = " | Clasifica: " + (advTeam ? advTeam.flag + " " + advTeam.name : pred.advances);
            }

            let pointsHtml = "";
            if (result) {
                const ptsJorge = calculatePoints(pred, result, m, "jorge");
                const ptsLean = calculatePoints(pred, result, m, "lean");
                pointsHtml = `
                    <div class="pred-points ${ptsJorge === 0 ? 'zero' : ''}">
                        Puntos (Jorge): ${ptsJorge}/3 | Puntos (Lean): ${ptsLean}/3
                    </div>
                    <div class="pred-detail">Resultado real: ${result.homeScore}-${result.awayScore} | Goleadores: ${result.scorers.length ? result.scorers.join(", ") : "Ninguno"}</div>`;
            }

            html += `
                <div class="prediction-card">
                    <div class="match-label">
                        ${home.flag} ${home.name} vs ${away.flag} ${away.name}
                        <span class="match-group">${isKnockout ? getPhaseLabel(m.phase) : "Grupo " + m.group}</span>
                    </div>
                    <div class="pred-detail">
                        Tu pronostico: ${pred.homeScore} - ${pred.awayScore}
                        ${scorerNames.length ? "| Goleador(es): " + scorerNames.join(", ") : "| Sin goleador"}
                        ${advancesText}
                    </div>
                    ${pointsHtml}
                </div>`;
        });

        container.innerHTML = html;
    }

    // ----------------------------------------------------------
    // SCORING
    // ----------------------------------------------------------
    function calculatePoints(prediction, result, match, mode) {
        let points = 0;
        const predHome = prediction.homeScore;
        const predAway = prediction.awayScore;
        const resHome = result.homeScore;
        const resAway = result.awayScore;
        const isKnockout = match && match.phase !== "group";

        // 1. Winner point
        if (isKnockout) {
            // Knockout: winner point = correctly predicting who advances
            const resAdvances = result.advances; // set by admin
            const predAdvances = prediction.advances;

            if (resAdvances && predAdvances) {
                if (predAdvances === resAdvances) {
                    points += 1;
                } else {
                    // Predicted draw + wrong team advances = 0 total points
                    if (predHome === predAway) {
                        return 0;
                    }
                    // Predicted a winner but wrong team advances: no winner point, but can still get score/scorer
                }
            }
        } else {
            // Group stage: simple winner comparison
            const predWinner = predHome > predAway ? "home" : (predHome < predAway ? "away" : "draw");
            const resWinner = resHome > resAway ? "home" : (resHome < resAway ? "away" : "draw");
            if (predWinner === resWinner) points += 1;
        }

        // 2. Exact score point (always 90 min score)
        if (predHome === resHome && predAway === resAway) points += 1;

        // 3. Scorer point
        const normName = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
        const predScorers = (prediction.scorers || []).map(s =>
            normName(typeof s === "string" ? s : s.player)
        );
        const resScorers = (result.scorers || []).map(s => normName(s));

        const scorerMatch = (ps, rs) => rs.includes(ps) || ps.includes(rs);

        if (mode === "jorge") {
            if (predScorers.length === 0) {
                if (resScorers.length === 0) points += 1;
            } else {
                const allMatch = predScorers.every(ps =>
                    resScorers.some(rs => scorerMatch(ps, rs))
                );
                if (allMatch) points += 1;
            }
        } else {
            if (predScorers.length > 0) {
                const allMatch = predScorers.every(ps =>
                    resScorers.some(rs => scorerMatch(ps, rs))
                );
                if (allMatch) points += 1;
            }
        }

        return points;
    }

    // ----------------------------------------------------------
    // RANKINGS
    // ----------------------------------------------------------
    function showRanking(type) {
        document.querySelectorAll(".rank-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".ranking-content").forEach(c => c.classList.remove("active"));

        document.querySelector(`.rank-tab[onclick*="${type}"]`).classList.add("active");
        document.getElementById("ranking-" + type).classList.add("active");
    }

    function refreshRankings() {
        const mode = document.getElementById("scoring-mode").value;
        renderIndividualRanking(mode);
        renderCountryRanking(mode);
    }

    function renderIndividualRanking(mode) {
        const tbody = document.querySelector("#table-individual tbody");
        const players = [];
        const allM = getAllMatches();

        Object.keys(allPredictions).forEach(username => {
            const playerData = allPredictions[username];
            let totalPts = 0, gamesPlayed = 0, winnerPts = 0, scorePts = 0, scorerPts = 0;

            // Use local predictions for current user (correct scorer data)
            const userPreds = (currentUser && username === currentUser.username)
                ? predictions : (playerData.predictions || {});

            Object.keys(playerData.predictions || {}).forEach(matchId => {
                const result = results[matchId];
                if (!result) return;

                gamesPlayed++;
                const pred = userPreds[matchId] || playerData.predictions[matchId];
                const match = allM.find(m => String(m.id) === String(matchId));
                const pts = calculatePoints(pred, result, match, mode);
                totalPts += pts;

                const predHome = pred.homeScore;
                const predAway = pred.awayScore;
                const resHome = result.homeScore;
                const resAway = result.awayScore;

                const predW = predHome > predAway ? "h" : (predHome < predAway ? "a" : "d");
                const resW = resHome > resAway ? "h" : (resHome < resAway ? "a" : "d");
                if (predW === resW) winnerPts++;
                if (predHome === resHome && predAway === resAway) scorePts++;

                const scorerPt = pts - (predW === resW ? 1 : 0) - ((predHome === resHome && predAway === resAway) ? 1 : 0);
                if (scorerPt > 0) scorerPts++;
            });

            players.push({
                username,
                country: playerData.country,
                countryFlag: playerData.countryFlag || "",
                totalPts, gamesPlayed, winnerPts, scorePts, scorerPts
            });
        });

        players.sort((a, b) => b.totalPts - a.totalPts || b.gamesPlayed - a.gamesPlayed);

        tbody.innerHTML = players.map((p, i) => `
            <tr class="${i < 3 ? 'rank-' + (i + 1) : ''}">
                <td>${i + 1}</td>
                <td>${p.username}</td>
                <td>${p.countryFlag} ${p.country}</td>
                <td><strong>${p.totalPts}</strong></td>
                <td>${p.gamesPlayed}</td>
                <td>${p.winnerPts}</td>
                <td>${p.scorePts}</td>
                <td>${p.scorerPts}</td>
            </tr>`).join("");

        if (!players.length) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:#666;padding:20px;">Sin datos aun</td></tr>';
        }
    }

    function renderCountryRanking(mode) {
        const tbody = document.querySelector("#table-country tbody");
        const countries = {};
        const allM = getAllMatches();

        Object.keys(allPredictions).forEach(username => {
            const playerData = allPredictions[username];
            const key = playerData.country || "Desconocido";

            if (!countries[key]) {
                countries[key] = { flag: playerData.countryFlag || "", totalPts: 0, playerCount: 0 };
            }
            countries[key].playerCount++;

            Object.keys(playerData.predictions || {}).forEach(matchId => {
                const result = results[matchId];
                if (!result) return;
                const pred = playerData.predictions[matchId];
                const match = allM.find(m => String(m.id) === String(matchId));
                countries[key].totalPts += calculatePoints(pred, result, match, mode);
            });
        });

        const sorted = Object.entries(countries)
            .map(([name, data]) => ({ name, ...data, avg: data.playerCount ? (data.totalPts / data.playerCount).toFixed(1) : 0 }))
            .sort((a, b) => b.totalPts - a.totalPts);

        tbody.innerHTML = sorted.map((c, i) => `
            <tr class="${i < 3 ? 'rank-' + (i + 1) : ''}">
                <td>${i + 1}</td>
                <td>${c.flag} ${c.name}</td>
                <td>${c.playerCount}</td>
                <td><strong>${c.totalPts}</strong></td>
                <td>${c.avg}</td>
            </tr>`).join("");

        if (!sorted.length) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#666;padding:20px;">Sin datos aun</td></tr>';
        }
    }

    // ----------------------------------------------------------
    // ADMIN
    // ----------------------------------------------------------
    function loadAdminMatch() {
        const matchId = document.getElementById("admin-match-select").value;
        if (!matchId) {
            document.getElementById("admin-result-form").style.display = "none";
            return;
        }

        const allM = getAllMatches();
        const match = allM.find(m => String(m.id) === String(matchId));
        const home = TEAMS[match.home];
        const away = TEAMS[match.away];

        document.getElementById("admin-home-name").textContent = home.flag + " " + home.name;
        document.getElementById("admin-away-name").textContent = away.flag + " " + away.name;

        // Show advances selector for knockout
        const advSection = document.getElementById("admin-advances-section");
        if (match.phase !== "group") {
            advSection.style.display = "block";
            const advSelect = document.getElementById("admin-advances");
            advSelect.innerHTML = `
                <option value="">Quien clasifico?</option>
                <option value="${match.home}">${home.flag} ${home.name}</option>
                <option value="${match.away}">${away.flag} ${away.name}</option>`;
        } else {
            advSection.style.display = "none";
        }

        const result = results[matchId];
        document.getElementById("admin-home-score").value = result ? result.homeScore : "";
        document.getElementById("admin-away-score").value = result ? result.awayScore : "";
        if (result && result.advances && match.phase !== "group") {
            document.getElementById("admin-advances").value = result.advances;
        }

        // Populate admin scorer dropdowns
        const scorerContainer = document.getElementById("admin-scorer-inputs");
        scorerContainer.innerHTML = "";
        currentAdminMatch = match;
        if (result && result.scorers && result.scorers.length > 0) {
            result.scorers.forEach(s => {
                const name = typeof s === "string" ? s : (s.player || String(s));
                addAdminScorerWithValue(name);
            });
        }

        document.getElementById("admin-result-form").style.display = "block";
    }

    let currentAdminMatch = null;

    function addAdminScorer() {
        addAdminScorerWithValue("");
    }

    function addAdminScorerWithValue(value) {
        if (!currentAdminMatch) return;
        const container = document.getElementById("admin-scorer-inputs");
        const div = document.createElement("div");
        div.className = "scorer-row";

        const select = document.createElement("select");
        select.className = "admin-scorer-name";
        select.innerHTML = '<option value="">Seleccionar goleador...</option>';

        [currentAdminMatch.home, currentAdminMatch.away].forEach(tc => {
            const team = TEAMS[tc];
            const squad = squads[tc] || [];
            if (squad.length > 0) {
                const optgroup = document.createElement("optgroup");
                optgroup.label = team.flag + " " + team.name;
                const posOrder = { Attacker: 0, Midfielder: 1, Defender: 2, Goalkeeper: 3 };
                const sorted = [...squad].sort((a, b) =>
                    (posOrder[a.position] ?? 4) - (posOrder[b.position] ?? 4)
                );
                sorted.forEach(p => {
                    const opt = document.createElement("option");
                    opt.value = p.name;
                    const posLabel = { Attacker: "DEL", Midfielder: "MED", Defender: "DEF", Goalkeeper: "POR" };
                    opt.textContent = p.name + " (" + (posLabel[p.position] || p.position) + ")";
                    if (p.name === value) opt.selected = true;
                    optgroup.appendChild(opt);
                });
                select.appendChild(optgroup);
            }
        });

        // If value wasn't found in squads, add it as a manual option
        if (value && !select.value) {
            const opt = document.createElement("option");
            opt.value = value;
            opt.textContent = value + " (manual)";
            opt.selected = true;
            select.appendChild(opt);
        }

        div.appendChild(select);
        container.appendChild(div);
    }

    function removeAdminScorer() {
        const container = document.getElementById("admin-scorer-inputs");
        if (container.children.length > 0) {
            container.removeChild(container.lastChild);
        }
    }

    function saveResult() {
        const matchId = document.getElementById("admin-match-select").value;
        const homeScore = parseInt(document.getElementById("admin-home-score").value);
        const awayScore = parseInt(document.getElementById("admin-away-score").value);

        if (isNaN(homeScore) || isNaN(awayScore)) {
            showToast("Ingresa un marcador valido", true);
            return;
        }

        const scorerSelects = document.querySelectorAll(".admin-scorer-name");
        const scorers = [];
        scorerSelects.forEach(sel => {
            const val = sel.value.trim();
            if (val) scorers.push(val);
        });

        const allM = getAllMatches();
        const match = allM.find(m => String(m.id) === String(matchId));
        let advances = null;
        if (match && match.phase !== "group") {
            advances = document.getElementById("admin-advances").value;
        }

        results[matchId] = { homeScore, awayScore, scorers, advances };
        localStorage.setItem("mundial_results", JSON.stringify(results));
        renderMatches();
        showToast("Resultado guardado");

        if (SHEETS_API_URL) {
            fetch(SHEETS_API_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "saveResult", matchId, homeScore, awayScore, scorers, advances })
            }).catch(() => {});
        }
    }

    // Admin: Add knockout match
    function addKnockoutMatch() {
        const homeCode = document.getElementById("ko-home").value;
        const awayCode = document.getElementById("ko-away").value;
        const date = document.getElementById("ko-date").value;
        const utc = document.getElementById("ko-time").value;
        const phase = document.getElementById("ko-phase").value;

        if (!homeCode || !awayCode || !date || !utc || !phase) {
            showToast("Completa todos los campos", true);
            return;
        }

        if (homeCode === awayCode) {
            showToast("Los equipos deben ser diferentes", true);
            return;
        }

        const newId = "ko_" + Date.now();
        knockoutMatches.push({
            id: newId,
            home: homeCode,
            away: awayCode,
            group: null,
            date: date,
            utc: utc,
            phase: phase
        });

        localStorage.setItem("mundial_knockout", JSON.stringify(knockoutMatches));
        renderMatches();
        refreshAdminSelects();
        showToast("Partido de eliminatoria agregado");
    }

    function refreshAdminSelects() {
        // Refresh admin match select
        const sel = document.getElementById("admin-match-select");
        sel.innerHTML = '<option value="">Seleccionar partido...</option>';
        populateAdminMatchSelect();
    }

    // ----------------------------------------------------------
    // WHATSAPP MESSAGE
    // ----------------------------------------------------------
    function generateWhatsAppMessage() {
        const date = document.getElementById("admin-wa-date").value;
        if (!date) return;

        const allM = getAllMatches();
        const dayMatches = allM.filter(m => matchLocalDate(m) === date);
        if (!dayMatches.length) {
            document.getElementById("wa-message-box").textContent = "No hay partidos en esta fecha.";
            return;
        }

        let msg = `*Partidos de manana:*\n\n`;

        dayMatches.forEach(m => {
            const home = TEAMS[m.home];
            const away = TEAMS[m.away];
            if (!home || !away) return;
            const phaseLabel = m.phase !== "group" ? ` [${getPhaseLabel(m.phase)}]` : ` (Grupo ${m.group})`;
            msg += `${home.flag} ${home.name} vs ${away.flag} ${away.name}${phaseLabel}\n`;
        });

        msg += `\nPongan sus pronosticos!\n`;
        msg += window.location.href;

        document.getElementById("wa-message-box").textContent = msg;
    }

    function generateWhatsAppIndividual() {
        const mode = document.getElementById("scoring-mode")?.value || "jorge";
        const allM = getAllMatches();
        const players = [];

        Object.keys(allPredictions).forEach(username => {
            const playerData = allPredictions[username];
            let totalPts = 0, gamesPlayed = 0;
            const userPreds = (currentUser && username === currentUser.username)
                ? predictions : (playerData.predictions || {});

            Object.keys(playerData.predictions || {}).forEach(matchId => {
                const result = results[matchId];
                if (!result) return;
                gamesPlayed++;
                const pred = userPreds[matchId] || playerData.predictions[matchId];
                const match = allM.find(m => String(m.id) === String(matchId));
                totalPts += calculatePoints(pred, result, match, mode);
            });

            players.push({ username, flag: playerData.countryFlag || "", totalPts, gamesPlayed });
        });

        players.sort((a, b) => b.totalPts - a.totalPts || b.gamesPlayed - a.gamesPlayed);

        const medals = ["🥇", "🥈", "🥉"];
        let msg = "⚽ *TABLA INDIVIDUAL* ⚽\n";
        msg += "━━━━━━━━━━━━━━━━━━━━\n";

        players.forEach((p, i) => {
            const medal = i < 3 ? medals[i] + " " : "      ";
            const pos = String(i + 1).padStart(2, " ");
            const pts = String(p.totalPts).padStart(2, " ");
            msg += `${medal}${pos}. ${p.flag} ${p.username} - *${pts} pts* (${p.gamesPlayed} PJ)\n`;
        });

        msg += "━━━━━━━━━━━━━━━━━━━━\n";
        msg += `Criterio: ${mode === "jorge" ? "Jorge" : "Lean"}`;

        document.getElementById("wa-message-box").textContent = msg;
    }

    function generateWhatsAppCountry() {
        const mode = document.getElementById("scoring-mode")?.value || "jorge";
        const allM = getAllMatches();
        const countries = {};

        Object.keys(allPredictions).forEach(username => {
            const playerData = allPredictions[username];
            const key = playerData.country || "Desconocido";

            if (!countries[key]) {
                countries[key] = { flag: playerData.countryFlag || "", totalPts: 0, playerCount: 0 };
            }
            countries[key].playerCount++;

            Object.keys(playerData.predictions || {}).forEach(matchId => {
                const result = results[matchId];
                if (!result) return;
                const pred = playerData.predictions[matchId];
                const match = allM.find(m => String(m.id) === String(matchId));
                countries[key].totalPts += calculatePoints(pred, result, match, mode);
            });
        });

        const sorted = Object.entries(countries)
            .map(([name, data]) => ({ name, ...data, avg: data.playerCount ? (data.totalPts / data.playerCount).toFixed(1) : 0 }))
            .sort((a, b) => b.totalPts - a.totalPts);

        const medals = ["🥇", "🥈", "🥉"];
        let msg = "🌍 *TABLA POR PAIS* 🌍\n";
        msg += "━━━━━━━━━━━━━━━━━━━━━━━\n";

        sorted.forEach((c, i) => {
            const medal = i < 3 ? medals[i] + " " : "      ";
            const pos = String(i + 1).padStart(2, " ");
            const pts = String(c.totalPts).padStart(2, " ");
            msg += `${medal}${pos}. ${c.flag} ${c.name} - *${pts} pts* (${c.playerCount} jug, prom ${c.avg})\n`;
        });

        msg += "━━━━━━━━━━━━━━━━━━━━━━━\n";
        msg += `Criterio: ${mode === "jorge" ? "Jorge" : "Lean"}`;

        document.getElementById("wa-message-box").textContent = msg;
    }

    function copyWhatsApp() {
        const msg = document.getElementById("wa-message-box").textContent;
        if (!msg) return;

        navigator.clipboard.writeText(msg).then(() => {
            showToast("Mensaje copiado al portapapeles");
        }).catch(() => {
            const ta = document.createElement("textarea");
            ta.value = msg;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            showToast("Mensaje copiado");
        });
    }

    // ----------------------------------------------------------
    // NAVIGATION
    // ----------------------------------------------------------
    function showView(viewName) {
        document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
        document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));

        document.getElementById("view-" + viewName).classList.add("active");
        document.querySelector(`.nav-btn[data-view="${viewName}"]`).classList.add("active");

        if (viewName === "my-predictions") renderMyPredictions();
        if (viewName === "rankings") {
            loadFromSheets();
            refreshRankings();
        }
        if (viewName === "admin") generateWhatsAppMessage();
    }

    // ----------------------------------------------------------
    // UTILITIES
    // ----------------------------------------------------------
    function formatDateShort(dateStr) {
        const d = new Date(dateStr + "T12:00:00");
        return d.toLocaleDateString("es", { month: "short", day: "numeric" });
    }

    function formatDateLong(dateStr) {
        const d = new Date(dateStr + "T12:00:00");
        return d.toLocaleDateString("es", { weekday: "long", month: "long", day: "numeric" });
    }

    function matchLocalDate(m) {
        const d = new Date(m.date + "T" + m.utc + ":00Z");
        const y = d.getFullYear();
        const mo = String(d.getMonth() + 1).padStart(2, "0");
        const da = String(d.getDate()).padStart(2, "0");
        return `${y}-${mo}-${da}`;
    }

    function utcToLocal(dateStr, utcTime) {
        const d = new Date(dateStr + "T" + utcTime + ":00Z");
        return d.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
    }

    function showToast(message, isError = false) {
        const existing = document.querySelector(".toast");
        if (existing) existing.remove();

        const toast = document.createElement("div");
        toast.className = "toast" + (isError ? " error" : "");
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // ----------------------------------------------------------
    // PUBLIC API
    // ----------------------------------------------------------
    return {
        init,
        login,
        logout,
        showView,
        filterMatches,
        openPrediction,
        closePrediction,
        addScorerInput,
        removeScorerInput,
        submitPrediction,
        showRanking,
        refreshRankings,
        loadAdminMatch,
        saveResult,
        generateWhatsAppMessage,
        generateWhatsAppIndividual,
        generateWhatsAppCountry,
        copyWhatsApp,
        addKnockoutMatch,
        fetchResultsFromAPI,
        updateScorerOptions,
        showMatchPredictions,
        addAdminScorer,
        removeAdminScorer
    };
})();

document.addEventListener("DOMContentLoaded", App.init);
