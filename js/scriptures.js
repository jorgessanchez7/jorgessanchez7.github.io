/*============================================================================
 * FILE:    scriptures.js
 * AUTHOR:  Stephen W. Liddle
 * DATE:    Winter 2019
 *
 * DESCRIPTION: Front-end JavaScript code for The Scriptures, Mapped.
 *              IS 542, Winter 2019, BYU.
 */
/*property
    Animation, DROP, LatLng, LatLngBounds, Marker, abs, align, animation,
    appendChild, body, books, changeHash, children, classKey, clearTimeout,
    content, createHTMLDocument, exec, extend, fitBounds, fontColor, fontSize,
    forEach, fullName, getAttribute, getCenter, getElementById, getPosition,
    getTitle, google, gridName, hash, href, id, implementation, includes, init,
    innerHTML, lat, length, lng, log, map, maps, maxBookId, minBookId,
    numChapters, onHashChanged, onerror, onload, open, panTo, parentBookId,
    parse, position, push, querySelectorAll, responseText, round, send, setMap,
    setTimeout, setTitle, setZoom, showLocation, slice, split, status,
    strokeColor, substring, text, title, tocName
*/
/*global console, google, map, MapLabel */
/*jslint
    browser: true
    long: true */

const Scriptures = (function () {
    /*------------------------------------------------------------------------
     *                      CONSTANTS
     */
    const BOTTOM_PADDING = "<br /><br />";
    const CLASS_BOOKS = "books";
    const CLASS_VOLUME = "volume";
    const DIV_BREADCRUMBS = "crumbs";
    const DIV_SCRIPTURES_NAVIGATOR = "scripnav";
    const DIV_SCRIPTURES = "scriptures";
    const DIV_SCRIPTURES2 = "scriptures2";
    const INDEX_PLACENAME = 2;
    const INDEX_LATITUDE = 3;
    const INDEX_LONGITUDE = 4;
    const INDEX_PLACE_FLAG = 11;
    const LAT_LON_PARSER = /\((.*),'(.*)',(.*),(.*),(.*),(.*),(.*),(.*),(.*),(.*),'(.*)'\)/;
    const MAX_RETRY_DELAY = 5000;
    const MAX_ZOOM_LEVEL = 18;
    const MIN_ZOOM_LEVEL = 6;
    const REQUEST_GET = "GET";
    const REQUEST_STATUS_OK = 200;
    const REQUEST_STATUS_ERROR = 400;
    const TAG_HEADER5 = "h5";
    const TAG_LIST_ITEM = "li";
    const TAG_UNORDERED_LIST = "ul";
    const TEXT_TOP_LEVEL = "The Scriptures";
    const URL_BOOKS = "https://scriptures.byu.edu/mapscrip/model/books.php";
    const URL_SCRIPTURES = "https://scriptures.byu.edu/mapscrip/mapgetscrip.php";
    const URL_VOLUMES = "https://scriptures.byu.edu/mapscrip/model/volumes.php";
    const ZOOM_RATIO = 450;

    /*------------------------------------------------------------------------
     *                      PRIVATE VARIABLES
     */
    let books;
    let gmLabels = [];
    let gmMarkers = [];
    let requestedBreadcrumbs;
    let requestedNextPrevious;
    let retryDelay = 500;
    let volumes;

    /*------------------------------------------------------------------------
     *                      PRIVATE METHOD DECLARATIONS
     */
    let addMarker;
    let ajax;
    let bookChapterValid;
    let booksGrid;
    let booksGridContent;
    let breadcrumbs;
    let cacheBooks;
    let changeHash;
    let clearMarkers;
    let encodedScriptureUrlParameters;
    let getScriptureCallback;
    let getScriptureFailed;
    let htmlAnchor;
    let htmlDiv;
    let htmlElement;
    let htmlHashLink;
    let htmlLink;
    let init;
    let markerIndex;
    let mergePlacename;
    let navigateBook;
    let navigateChapter;
    let navigateHome;
    let nextChapter;
    let onHashChanged;
    let parseHtml;
    let previousChapter;
    let setupMarkers;
    let showLocation;
    let titleForBookChapter;
    let transitionBreadcrumbs;
    let transitionScriptures;
    let volumeForId;
    let volumesGridContent;

    /*------------------------------------------------------------------------
     *                      PRIVATE METHODS
     */
    addMarker = function (placename, latitude, longitude) {
        let index = markerIndex(latitude, longitude);

        if (index >= 0) {
            mergePlacename(placename, index);
        } else {
            let marker = new google.maps.Marker({
                position: {lat: Number(latitude), lng: Number(longitude)},
                map,
                title: placename,
                animation: google.maps.Animation.DROP
            });

            gmMarkers.push(marker);

            let mapLabel = new MapLabel({
                text: marker.getTitle(),
                position: new google.maps.LatLng(Number(latitude), Number(longitude)),
                map,
                fontSize: 16,
                fontColor: "#201000",
                strokeColor: "#fff8f0",
                align: "left"
            });

            gmLabels.push(mapLabel);
        }
    };

    ajax = function (url, successCallback, failureCallback, skipParse) {
        let request = new XMLHttpRequest();

        request.open(REQUEST_GET, url, true);

        request.onload = function () {
            if (request.status >= REQUEST_STATUS_OK && request.status < REQUEST_STATUS_ERROR) {
                let data;

                if (skipParse) {
                    data = request.responseText;
                } else {
                    data = JSON.parse(request.responseText);
                }

                if (typeof successCallback === "function") {
                    successCallback(data);
                }
            } else {
                if (typeof failureCallback === "function") {
                    failureCallback(request);
                }
            }
        };

        request.onerror = failureCallback;
        request.send();
    };

    bookChapterValid = function (bookId, chapter) {
        let book = books[bookId];

        if (book === undefined || chapter < 0 || chapter > book.numChapters) {
            return false;
        }

        if (chapter === 0 && book.numChapters > 0) {
            return false;
        }

        return true;
    };

    booksGrid = function (volume) {
        return htmlDiv({
            classKey: CLASS_BOOKS,
            content: booksGridContent(volume)
        });
    };

    booksGridContent = function (volume) {
        let gridContent = "";

        volume.books.forEach(function (book) {
            gridContent += htmlLink({
                classKey: "btn",
                id: book.id,
                href: `#${volume.id}:${book.id}`,
                content: book.gridName
            });
        });

        return gridContent;
    };

    breadcrumbs = function (volume, book, chapter) {
        let crumbs;

        if (volume === undefined) {
            crumbs = htmlElement(TAG_LIST_ITEM, TEXT_TOP_LEVEL);
        } else {
            crumbs = htmlElement(TAG_LIST_ITEM, htmlHashLink("", TEXT_TOP_LEVEL));

            if (book === undefined) {
                crumbs += htmlElement(TAG_LIST_ITEM, volume.fullName);
            } else {
                crumbs += htmlElement(TAG_LIST_ITEM, htmlHashLink(`${volume.id}`, volume.fullName));

                if (chapter === undefined || chapter <= 0) {
                    crumbs += htmlElement(TAG_LIST_ITEM, book.tocName);
                } else {
                    crumbs += htmlElement(TAG_LIST_ITEM, htmlHashLink(`${volume.id},${book.id}`, book.tocName));
                    crumbs += htmlElement(TAG_LIST_ITEM, chapter);
                }
            }
        }

        return htmlElement(TAG_UNORDERED_LIST, crumbs);
    };

    cacheBooks = function (callback) {
        volumes.forEach(function (volume) {
            let volumeBooks = [];
            let bookId = volume.minBookId;

            while (bookId <= volume.maxBookId) {
                volumeBooks.push(books[bookId]);
                bookId += 1;
            }

            volume.books = volumeBooks;
        });

        if (typeof callback === "function") {
            callback();
        }
    };

    changeHash = function (volumeId, bookId, chapter) {
        let newHash = "";

        if (volumeId !== undefined) {
            newHash += volumeId;

            if (bookId !== undefined) {
                newHash += `:${bookId}`;

                if (chapter !== undefined) {
                    newHash += `:${chapter}`;
                }
            }
        }

        location.hash = newHash;
    };

    clearMarkers = function () {
        gmLabels.forEach(function (marker) {
            marker.setMap(null);
        });
        gmMarkers.forEach(function (marker) {
            marker.setMap(null);
        });

        gmMarkers = [];
    };

    encodedScriptureUrlParameters = function (bookId, chapter, verses, isJst) {
        if (bookId !== undefined && chapter !== undefined) {
            let options = "";

            if (verses !== undefined) {
                options += verses;
            }

            if (isJst !== undefined && isJst) {
                options += "&jst=JST";
            }

            return `${URL_SCRIPTURES}?book=${bookId}&chap=${chapter}&verses${options}`;
        }
    };

    getScriptureCallback = function (chapterHtml) {
        //document.getElementById(DIV_SCRIPTURES).innerHTML = chapterHtml;
        $(`#${DIV_SCRIPTURES}`).fadeOut(100, function(){
            document.getElementById(DIV_SCRIPTURES).innerHTML = chapterHtml;
            document.querySelectorAll(".navheading").forEach(function (element) {
                element.appendChild(parseHtml(`<div class="nextprev">${requestedNextPrevious}</div>`)[0]);
            });
            $(`#${DIV_SCRIPTURES}`).fadeIn(200);
        });
        /*
        document.querySelectorAll(".navheading").forEach(function (element) {
            element.appendChild(parseHtml(`<div class="nextprev">${requestedNextPrevious}</div>`)[0]);
        });
        */
        //document.getElementById(DIV_BREADCRUMBS).innerHTML = requestedBreadcrumbs;
        $(`#${DIV_BREADCRUMBS}`).fadeOut(100, function(){
            document.getElementById(DIV_BREADCRUMBS).innerHTML = requestedBreadcrumbs;
            $(`#${DIV_BREADCRUMBS}`).fadeIn(200);
        });
        setupMarkers();
    };

    getScriptureFailed = function () {
        console.log("Warning: unable to receive scripture content from server.");
    };

    htmlAnchor = function (volume) {
        return `<a name="v${volume.id}" />`;
    };

    htmlDiv = function (parameters) {
        let classString = "";
        let contentString = "";
        let idString = "";

        if (parameters.classKey !== undefined) {
            classString = ` class="${parameters.classKey}"`;
        }

        if (parameters.content !== undefined) {
            contentString = parameters.content;
        }

        if (parameters.id !== undefined) {
            idString = ` id="${parameters.id}"`;
        }

        return `<div${idString}${classString}>${contentString}</div>`;
    };

    htmlElement = function (tagName, content) {
        return `<${tagName}>${content}</${tagName}>`;
    };

    htmlLink = function (parameters) {
        let classString = "";
        let contentString = "";
        let hrefString = "";
        let idString = "";

        if (parameters.classKey !== undefined) {
            classString = ` class="${parameters.classKey}"`;
        }

        if (parameters.content !== undefined) {
            contentString = parameters.content;
        }

        if (parameters.href !== undefined) {
            hrefString = ` href="${parameters.href}"`;
        }

        if (parameters.id !== undefined) {
            idString = ` id="${parameters.id}"`;
        }

        return `<a${idString}${classString}${hrefString}>${contentString}</a>`;
    };

    htmlHashLink = function (hashArguments, content) {
        return `<a href="javascript:void(0)" onclick="Scriptures.changeHash(${hashArguments})">${content}</a>`;
    };

    init = function (callback) {
        let booksLoaded = false;
        let volumesLoaded = false;

        ajax(URL_BOOKS, function (booksObject) {
            books = booksObject;
            booksLoaded = true;

            if (volumesLoaded) {
                cacheBooks(callback);
            }
        });

        ajax(URL_VOLUMES, function (volumesArray) {
            volumes = volumesArray;
            volumesLoaded = true;

            if (booksLoaded) {
                cacheBooks(callback);
            }
        });
    };

    markerIndex = function (latitude, longitude) {
        let i = gmMarkers.length - 1;

        while (i >= 0) {
            let marker = gmMarkers[i];

            // Note: here is the safe way to compare IEEE floating-point
            // numbers: compare their difference to a small number
            if (Math.abs(marker.getPosition().lat() - latitude) < 0.0000001 &&
                Math.abs(marker.getPosition().lng() - longitude) < 0.0000001) {
                return i;
            }

            i -= 1;
        }

        return -1;
    };

    mergePlacename = function (placename, index) {
        let marker = gmMarkers[index];
        let label = gmLabels[index];
        let title = marker.getTitle();

        if (!title.includes(placename)) {
            title += ", " + placename;
            marker.setTitle(title);
            label.text = title;
        }
    };

    navigateBook = function (bookId) {
        let book = books[bookId];
        let volume;

        if (book !== undefined) {
            volume = volumeForId(book.parentBookId);
        }

        if (book.numChapters <= 0) {
            navigateChapter(book.id, 0);
        } else if (book.numChapters === 1) {
            navigateChapter(book.id, 1);
        } else {
            let chapter = 1;
            let navContents = `<div id="${DIV_SCRIPTURES_NAVIGATOR}"><div class="volume"><h5>${book.fullName}</h5></div><div class="books">`;

            while (chapter <= book.numChapters) {
                navContents += `<a class="btn chapter" id="${chapter}" href="#0:${book.id}:${chapter}">${chapter}</a>`;
                chapter += 1;
            }

            navContents += "</div>";

            transitionScriptures(navContents);
            transitionBreadcrumbs(breadcrumbs(volume, book));

        }
    };

    navigateChapter = function (bookId, chapter) {
        if (bookId !== undefined) {
            let book = books[bookId];
            let volume = volumes[book.parentBookId - 1];

            requestedBreadcrumbs = breadcrumbs(volume, book, chapter);

            let nextPrev = previousChapter(bookId, chapter);

            if (nextPrev === undefined) {
                requestedNextPrevious = "";
            } else {
                requestedNextPrevious = `<a href="javascript:void(0);" onclick="Scriptures.changeHash(0, ${nextPrev[0]}, ${nextPrev[1]})" title="${nextPrev[2]}"><i class="material-icons">skip_previous</i></a>`;
            }

            nextPrev = nextChapter(bookId, chapter);

            if (nextPrev !== undefined) {
                requestedNextPrevious += `<a href="javascript:void(0);" onclick="Scriptures.changeHash(0, ${nextPrev[0]}, ${nextPrev[1]})" title="${nextPrev[2]}"><i class="material-icons">skip_next</i></a>`;
            }

            ajax(encodedScriptureUrlParameters(bookId, chapter), getScriptureCallback, getScriptureFailed, true);
        }
    };

    navigateHome = function (volumeId) {
        /*
        document.getElementById(DIV_SCRIPTURES).innerHTML = htmlDiv({
            id: DIV_SCRIPTURES_NAVIGATOR,
            content: volumesGridContent(volumeId)
        });
        */

        $(`#${DIV_SCRIPTURES}`).fadeOut(100, function(){
            document.getElementById(DIV_SCRIPTURES).innerHTML = htmlDiv({
                id: DIV_SCRIPTURES_NAVIGATOR,
                content: volumesGridContent(volumeId)
            });
            $(`#${DIV_SCRIPTURES}`).fadeIn(200);
        });

        //document.getElementById(DIV_BREADCRUMBS).innerHTML = breadcrumbs(volumeForId(volumeId));
        $(`#${DIV_BREADCRUMBS}`).fadeOut(100, function(){
            document.getElementById(DIV_BREADCRUMBS).innerHTML = breadcrumbs(volumeForId(volumeId));
            $(`#${DIV_BREADCRUMBS}`).fadeIn(200);
        });
    };

    // Book ID and chapter must be integers
    // Returns undefined if there is no next chapter
    // Otherwise returns an array with the next book ID, chapter, and title
    nextChapter = function (bookId, chapter) {
        let book = books[bookId];

        if (book !== undefined) {
            if (chapter < book.numChapters) {
                return [bookId, chapter + 1, titleForBookChapter(book, chapter + 1)];
            }

            let nextBook = books[bookId + 1];

            if (nextBook !== undefined) {
                let nextChapterValue = 0;

                if (nextBook.numChapters > 0) {
                    nextChapterValue = 1;
                }

                return [
                    nextBook.id,
                    nextChapterValue,
                    titleForBookChapter(nextBook, nextChapterValue)
                ];
            }
        }
    };

    // We're expecting a hash value of the form #volume:book:chapter,
    // where each of the three parameters is optional.
    onHashChanged = function () {
        let ids = [];

        if (location.hash !== "" && location.hash.length > 1) {
            ids = location.hash.substring(1).split(":");
        }

        if (ids.length <= 0) {
            navigateHome();
        } else if (ids.length === 1) {
            let volumeId = Number(ids[0]);

            if (volumeId < volumes[0].id || volumeId > volumes.slice(-1).id) {
                navigateHome();
            } else {
                navigateHome(volumeId);
            }
        } else if (ids.length >= 2) {
            let bookId = Number(ids[1]);

            if (books[bookId] === undefined) {
                navigateHome();
            } else {
                if (ids.length === 2) {
                    navigateBook(bookId);
                } else {
                    let chapter = Number(ids[2]);

                    if (bookChapterValid(bookId, chapter)) {
                        navigateChapter(bookId, chapter);
                    } else {
                        navigateHome();
                    }
                }
            }
        }
    };

    parseHtml = function (html) {
        let htmlDocument = document.implementation.createHTMLDocument();

        htmlDocument.body.innerHTML = html;

        return htmlDocument.body.children;
    };

    // Book ID and chapter must be integers
    // Returns undefined if there is no previous chapter
    // Otherwise returns an array with the next book ID, chapter, and title
    previousChapter = function (bookId, chapter) {
        let book = books[bookId];

        if (book !== undefined) {
            if (chapter > 1) {
                return [bookId, chapter - 1, titleForBookChapter(book, chapter - 1)];
            }

            let previousBook = books[bookId - 1];

            if (previousBook !== undefined) {
                return [
                    previousBook.id,
                    previousBook.numChapters,
                    titleForBookChapter(previousBook, previousBook.numChapters)
                ];
            }
        }
    };

    setupMarkers = function () {
        if (window.google === undefined) {
            let retryId = window.setTimeout(setupMarkers, retryDelay);

            retryDelay += retryDelay;

            if (retryDelay > MAX_RETRY_DELAY) {
                window.clearTimeout(retryId);
            }

            return;
        }

        if (gmMarkers.length > 0) {
            clearMarkers();
        }

        let matches;

        document.querySelectorAll("a[onclick^=\"showLocation(\"]").forEach(function (element) {
            matches = LAT_LON_PARSER.exec(element.getAttribute("onclick"));

            if (matches) {
                let placename = matches[INDEX_PLACENAME];
                let latitude = parseFloat(matches[INDEX_LATITUDE]);
                let longitude = parseFloat(matches[INDEX_LONGITUDE]);
                let flag = matches[INDEX_PLACE_FLAG];

                if (flag !== "") {
                    placename += " " + flag;
                }

                addMarker(placename, latitude, longitude);
            }
        });

        if (gmMarkers.length > 0) {
            if (gmMarkers.length === 1 && matches) {
                // When there's exactly one marker, add it and zoom to it
                let zoomLevel = Math.round(Number(matches[9]) / ZOOM_RATIO);

                if (zoomLevel < MIN_ZOOM_LEVEL) {
                    zoomLevel = MIN_ZOOM_LEVEL;
                } else if (zoomLevel > MAX_ZOOM_LEVEL) {
                    zoomLevel = MAX_ZOOM_LEVEL;
                }

                map.setZoom(zoomLevel);
                map.panTo(gmMarkers[0].position);
            } else {
                let bounds = new google.maps.LatLngBounds();

                gmMarkers.forEach(function (marker) {
                    bounds.extend(marker.position);
                });

                map.panTo(bounds.getCenter());
                map.fitBounds(bounds);
            }
        }
    };

    showLocation = function (id, placename, latitude, longitude, viewLatitude,
                             viewLongitude, viewTilt, viewRoll, viewAltitude, viewHeading) {
        map.panTo({lat: latitude, lng: longitude});
        //map.setZoom(Math.round(viewAltitude / ZOOM_RATIO));
        map.setZoom(Math.round(Math.log(35200000 / viewAltitude) / Math.log(2)));
    };

    titleForBookChapter = function (book, chapter) {
        if (chapter > 0) {
            return book.tocName + " " + chapter;
        }

        return book.tocName;
    };

    transitionBreadcrumbs = function (newCrumbs) {
        //document.getElementById(DIV_BREADCRUMBS).innerHTML = newCrumbs;
        $(`#${DIV_BREADCRUMBS}`).fadeOut(100, function(){
            document.getElementById(DIV_BREADCRUMBS).innerHTML = newCrumbs;
            $(`#${DIV_BREADCRUMBS}`).fadeIn(200);
        });
    };

    transitionScriptures = function (newContent) {
        //document.getElementById(DIV_SCRIPTURES).innerHTML = htmlDiv({content: newContent});
        $(`#${DIV_SCRIPTURES}`).fadeOut(100, function(){
            document.getElementById(DIV_SCRIPTURES).innerHTML = htmlDiv({content: newContent});
            $(`#${DIV_SCRIPTURES}`).fadeIn(200);
        });
        setupMarkers(newContent);
    };

    volumeForId = function (volumeId) {
        if (volumeId !== undefined && volumeId > 0 && volumeId <= volumes.length) {
            return volumes[volumeId - 1];
        }
    };

    volumesGridContent = function (volumeId) {
        let gridContent = "";

        volumes.forEach(function (volume) {
            if (volumeId === undefined || volumeId === volume.id) {
                gridContent += htmlDiv({
                    classKey: CLASS_VOLUME,
                    content: htmlAnchor(volume) + htmlElement(TAG_HEADER5, volume.fullName)
                });

                gridContent += booksGrid(volume);
            }
        });

        return gridContent + BOTTOM_PADDING;
    };

    /*------------------------------------------------------------------------
     *                      PUBLIC API
     */
    return {
        changeHash,
        init,
        onHashChanged,
        showLocation
    };
}());
