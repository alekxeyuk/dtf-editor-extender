// ==UserScript==
// @name         CMTT Editor Extender
// @namespace    https://github.com/ureshii-ww
// @version      1.0.3
// @description  Extends CMTT editor
// @author       ureshii-ww
// @match        https://dtf.ru/*
// @match        https://tjournal.ru/*
// @match        https://vc.ru/*
// @icon         https://www.google.com/s2/favicons?domain=simply-how.com
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function addClasses () {
        $("body").addClass(["app--popup-fullpage-maximized", "app--left-column-off"]);
        $(".v-popup-fp-container").addClass("v-popup-fp-container--maximized");
        $(".v-popup-fp-overlay").addClass("v-popup-fp-overlay--maximized");
        $(".v-popup-fp-window").addClass("v-popup-fp-window--maximized");
        $(".v-popup-fp-window__control").first().remove();
    }

    function deleteClasses () {
        $(".v-popup-fp-container").removeClass("v-popup-fp-container--maximized");
        $("body").removeClass(["app--popup-fullpage-maximized", "app--left-column-off"]);
    }

    function doWork() {
        addClasses();

        let callback = (mutationList, observer) => {
            mutationList.forEach(mutation => {
                if (mutation.removedNodes.length && mutation.removedNodes[0].classList[0] === "v-popup-fp-overlay") {
                    deleteClasses();
                    observer.disconnect();
                }
            })
        };

        new MutationObserver(callback).observe(document.querySelector('.v-popup-fp-container'), {childList: true});
    };

    waitForKeyElements(
        '.v-popup-fp-overlay', doWork, false
    );
})();
