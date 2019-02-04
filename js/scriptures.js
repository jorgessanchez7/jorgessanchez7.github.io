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
    books, bookChapterValid, forEach, fullName, getElementById, gridName,
    hash, id, init, innerHTML, length, log, maxBookId, minBookId, onHashChanged,
    onerror, onload, open, parse, push, responseText, send, slice, split,
    status, substring
*/
/*global
    console
 */
/*jslint
    browser: true
    long: true */

const Scriptures = (function (){
    "use strict";
    /*--------------------------------------------------------------------------
     *                      CONSTANTS
    */

    /*--------------------------------------------------------------------------
     *                      PRIVATE VARIABLES
    */
    let books;
    let volumes;

    /*--------------------------------------------------------------------------
     *                      PRIVATE METHOD DECLARATIONS
    */
    let ajax;
    let cacheBooks;
    let init;
    let onHashChanged;
    let navigateHome;
    let navigateBook;
    let navigateChapter;
    let bookChapterValid;

    /*--------------------------------------------------------------------------
     *                      PRIVATE METHODS
    */
    ajax = function (url, succesCallback, failureCallback) {
        let request = new XMLHttpRequest();

        request.open("GET", url, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                let data = JSON.parse(request.responseText);

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
    	return true;
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

    init = function (callback) {
        let booksLoaded = false;
        let volumesLoaded = false;

        ajax("https://scriptures.byu.edu/mapscrip/model/books.php",
            function (data) {
                //console.log("Loaded books from server");
                //console.log(data);
                books = data;
                booksLoaded = true;

                if (volumesLoaded) {
                    cacheBooks(callback);
                }
            }
        );
        ajax("https://scriptures.byu.edu/mapscrip/model/volumes.php",
            function (data) {
                //console.log("Loaded volumes from server");
                //console.log(data);
                volumes = data;
                volumesLoaded = true;

                if (booksLoaded) {
                    cacheBooks(callback);
                }

            }
        );
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
    };

    navigateBook = function (bookId) {
	    //console.log("book" + bookId);
    	document.getElementById("scriptures").innerHTML = "<div>" + bookId + "</div>";


    };

    navigateChapter = function (bookId, chapter) {
    	if (bookId != undefined) {
    		let book = books[bookId];
    		let volume = volumes[book.patentBookId -1];

    		//ajax()
		    document.getElementById("scriptures").innerHTML = "<div>Chapter" + chapter + "</div>";

	    }
        console.log("book chapter" + bookId + ", " + chapter);
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

    /*--------------------------------------------------------------------------
     *                      PUBLIC API
    */
    return {
        init: init,
        onHashChanged: onHashChanged
    };
}());
