/*=============================================================================
* FILE: scriptures.js
* AUTHOR: Stephen W. Liddle
* DATE: Winter 2019
*
* DESCRIPTION: Front-end JavaScript code for The Scriptures, Mapped.
*              IS 542, Winter 2019, BYU.
*
*/
/*property
    Animation, DROP, Marker, animation, books, classKey, clearTimeout, content,
    exec, forEach, fullName, getAttribute, getElementById, google, gridName,
    hash, href, id, init, innerHTML, lat, length, lng, log, map, maps,
    maxBookId, minBookId, numChapters, onHashChanged, onerror, onload, open,
    parse, position, push, querySelectorAll, responseText, send, setMap,
    setTimeout, slice, split, status, substring, title, tocName
*/
/*global
    console, google, map
 */
/*jslint
    browser: true
    long: true */

const Scriptures = (function () {
    /*--------------------------------------------------------------------------
     *                      CONSTANTS
    */
    const BOTTOM_PADDING = "<br /><br />";
    const CLASS_BOOKS = "books";
    const CLASS_VOLUME = "volume";
    const DIV_SCRIPTURES_NAVIGATOR = "scripnav";
    const DIV_SCRIPTURES = "scriptures";
    const INDEX_PLACENAME = 2;
    const INDEX_LATITUDE = 3;
    const INDEX_LONGITUDE = 4;
    const INDEX_PLACE_FLAG = 11;
    const LAT_LON_PARSER = /\((.*),'(.*)',(.*),(.*),(.*),(.*),(.*),(.*),(.*),(.*),'(.*)'\)/;
    const MAX_RETRY_DELAY = 5000;
    const REQUEST_GET = "GET";
    const REQUEST_STATUS_OK = 200;
    const REQUEST_STATUS_ERROR = 400;
    const URL_BOOKS = "https://scriptures.byu.edu/mapscrip/model/books.php";
    const URL_SCRIPTURES = "https://scriptures.byu.edu/mapscrip/mapgetscrip.php";
    const URL_VOLUMES = "https://scriptures.byu.edu/mapscrip/model/volumes.php";
    /*--------------------------------------------------------------------------
     *                      PRIVATE VARIABLES
    */
    let books;
    let gmMarkers = [];
    let retryDelay = 500;
    let volumes;

    /*--------------------------------------------------------------------------
     *                      PRIVATE METHOD DECLARATIONS
    */
    let addMarker;
    let ajax;
    let bookChapterValid;
    let booksGrid;
    let booksGridContent;
    let cacheBooks;
    let clearMarkers;
    let encodedScriptureUrlParameters;
    let getScriptureCallback;
    let getScriptureFailed;
    let htmlAnchor;
    let htmlDiv;
    let htmlHeader5;
    let htmlLink;
    let init;
    let navigateHome;
    let navigateBook;
    let navigateChapter;
    let nextChapter;
    let onHashChanged;
    let previousChapter;
    let setupMarkers;
    let titleForBookChapter;
    let volumesGridContent;


    /*--------------------------------------------------------------------------
     *                      PRIVATE METHODS
    */

    addMarker = function (placename, latitude, longitude) {
        //console.log(placename, latitude, longitude);

        let marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            map: map,
            title: placename,
            animation: google.maps.Animation.DROP
        });
    };

    ajax = function (url, succesCallback, failureCallback, skipParse) {
        let request = new XMLHttpRequest();

        request.open(REQUEST_GET, url, true);

        request.onload = function () {
            if (request.status >= REQUEST_STATUS_OK && request.status < REQUEST_STATUS_ERROR) {
                // Success!
                let data;
                if (skipParse) {
                    data = request.responseText;
                } else {
                    data = JSON.parse(request.responseText);
                }

                if (typeof succesCallback === "function") {
                    succesCallback(data);
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

    clearMarkers = function () {
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

            if (isJst !== undefined && isJst){
                options += "&jst=JST";
            }

            return `${URL_SCRIPTURES}?book=${bookId}&chap=${chapter}&verses${options}`;
        }
    };

    getScriptureCallback = function (chapterHtml) {
            document.getElementById(DIV_SCRIPTURES).innerHTML = chapterHtml;
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

    htmlHeader5 = function (content) {
        if (content === undefined) {
            content = "";
        }
        return `<h5>${content}</h5>`;
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

    init = function (callback) {
        let booksLoaded = false;
        let volumesLoaded = false;

        ajax(URL_BOOKS, function (booksObject) {
            //console.log("Loaded books from server");
            //console.log(data);
            books = booksObject;
            booksLoaded = true;

            if (volumesLoaded) {
                cacheBooks(callback);
            }
        });

        ajax(URL_VOLUMES, function (volumesArray) {
            //console.log("Loaded volumes from server");
            //console.log(data);
            volumes = volumesArray;
            volumesLoaded = true;

            if (booksLoaded) {
                cacheBooks(callback);
            }

        });
    };

    navigateHome = function (volumeId) {
        /*
        document.getElementById("scriptures").innerHTML =
            "<div>The Old Testament</div>" +
            "<div>The New Testament</div>" +
            "<div>The Book of Mormon</div>" +
            "<div>Doctrines and Covenants</div>" +
            "<div>The Pearl of Great Price</div>" +
            volumeId;
        */
        /*
        let navContents = "<div id=\"scripnav\">";

        volumes.forEach(function (volume) {
            if (volumeId === undefined || volumeId === volume.id) {
                navContents += "<div class=\"volume\"><a name=\"v" + volume.id + "\"/><h5>" +
                    volume.fullName + "</h5></div><div class=\"books\">";

                volume.books.forEach(function (book) {
                    navContents += "<a class=\"btn\" id\"" + book.id + "\" href=\"#" +
                        volume.id + ":" + book.id + "\">" + book.gridName + "</a>";
                });

                navContents += "</div>";

            }

        });

        navContents += "<br /><br></div>";

        document.getElementById("scriptures").innerHTML = navContents;
        */

        document.getElementById(DIV_SCRIPTURES).innerHTML = htmlDiv({
            id: DIV_SCRIPTURES_NAVIGATOR,
            content: volumesGridContent(volumeId)
        });

    };

    navigateBook = function (bookId) {
        //console.log("book" + bookId);
        //document.getElementById("scriptures").innerHTML = "<div>" + bookId + "</div>";
        document.getElementById(DIV_SCRIPTURES).innerHTML = htmlDiv({content: bookId});

    };

    navigateChapter = function (bookId, chapter) {
        if (bookId !== undefined) {
            //let book = books[bookId];
            //let volume = volumes[book.parentBookId -1];
            console.log(nextChapter(bookId, chapter));
            console.log(previousChapter(bookId, chapter));

            ajax(encodedScriptureUrlParameters(bookId, chapter), getScriptureCallback, getScriptureFailed, true);
            //document.getElementById("scriptures").innerHTML = "<div>Chapter" + chapter + " " + volume + "</div>";
        }
        console.log("book chapter" + bookId + ", " + chapter);
    };

    //Book ID and chapter must be integers
    //Returns undefined if there is no next chapter
    //Otherwise returns an array with the next book ID, chapter, and title

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

    onHashChanged = function () {
        /*
         * Check the hash to see if it’s empty; if so, navigate to the “home” state
         * Trim the leading “#” and then split the hash based on colons (“:”)
         * If we have one ID, it’s a volume, so navigate to that volume,
         * But if the volume ID is < 1 or > 5, it’s invalid, so navigate to “home”
         * If we have two ID’s, it’s a volume and book, so navigate to that book’s list of chapters,
         * But if the volume or book ID is invalid, navigate “home”
         * If the book doesn’t have chapters, navigate to its content directly
         * If we have three ID’s, its volume, book, chapter, so navigate there if valid If invalid, navigate “home”
        */
        let ids = [];
        if (location.hash !== "" && location.hash.length > 1) {
            ids = location.hash.substring(1).split(":");
        }

        if (ids.length <= 0) {
            navigateHome();
        } else if (ids.length ===1) {
            let volumeId = Number(ids[0]);

            if (volumeId < volumes[0].id || volumeId > volumes.slice(-1).id) {
                navigateHome();
            } else {
                navigateHome(volumeId);
            }
        } else if (ids.length >= 2){
            let bookId = Number(ids[1]);

            if (books[bookId] === undefined) {
                navigateHome();
            } else {
                if (ids.length === 2) {
                    navigateBook(bookId);
                } else {
                    let chapter = Number (ids[2]);

                    if (bookChapterValid (bookId, chapter)) {
                        navigateChapter(bookId, chapter);
                    } else {
                        navigateHome();
                    }
                }
            }
        }
    };

    previousChapter = function (bookId, chapter) {
        let book = books[bookId];

        if (book !== undefined) {
            if (chapter > 1 && chapter <= book.numChapters) {
                return [bookId, chapter - 1, titleForBookChapter(book, chapter - 1)];
            }

            let previousBook = books[bookId - 1];

            if (previousBook !== undefined) {
                let previousChapterValue = previousBook.numChapters;

                if (previousBook.numChapters > 0) {
                    previousChapterValue = previousBook.numChapters;
                }

                return [
                    previousBook.id,
                    previousChapterValue,
                    titleForBookChapter(previousBook, previousChapterValue)
                ];

            }

        }
    };

    setupMarkers = function () {
        if (window.google === undefined) {
            let retryId = window.setTimeout(setupMarkers, retryDelay);
            console.log(retryDelay);
            retryDelay  += retryDelay;

            if (retryDelay > MAX_RETRY_DELAY) {
                window.clearTimeout(retryId);
            }
        }
        if (gmMarkers.length > 0) {
            clearMarkers();
        }

        document.querySelectorAll("a[onclick^=\"showLocation(\"]").forEach(function (element) {
            let matches = LAT_LON_PARSER.exec(element.getAttribute("onclick"));

            if (matches) {
                let placename = matches[INDEX_PLACENAME];
                let latitude = parseFloat(matches[INDEX_LATITUDE]);
                let longitude =parseFloat(matches[INDEX_LONGITUDE]);
                let flag = matches[INDEX_PLACE_FLAG];

                if (flag !== "") {
                    placename += " " + flag;
                }

                addMarker(placename, latitude, longitude);
            }
        });
    };

    titleForBookChapter = function (book, chapter) {
        if (chapter > 0) {
            return book.tocName + " " + chapter;
        }

        return book.tocName;
    };

    volumesGridContent = function (volumeId) {

        let gridContent = "";

        volumes.forEach(function (volume) {
            if (volumeId === undefined || volumeId === volume.id) {
                gridContent += htmlDiv({
                    classKey: CLASS_VOLUME,
                    content: htmlAnchor(volume) + htmlHeader5(volume.fullName)
                });

                gridContent += booksGrid(volume);
            }

        });

        return gridContent + BOTTOM_PADDING;
    };

    /*--------------------------------------------------------------------------
     *                      PUBLIC API
    */
    return {
        init: init,
        onHashChanged: onHashChanged
    };
}());
