// ==UserScript==
// @name         DTF Editor Extender
// @namespace    https://github.com/ureshii-ww
// @version      1.0.2
// @description  Extends DTF editor
// @author       ureshii-ww
// @match        https://dtf.ru/*
// @icon         https://www.google.com/s2/favicons?domain=simply-how.com
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
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
    };

    function deleteClasses () {
        $(".v-popup-fp-container").removeClass("v-popup-fp-container--maximized");
        $("body").removeClass(["app--popup-fullpage-maximized", "app--left-column-off"]);
    }

    function mutationEditorCheck () {
        const target = document.getElementsByClassName('v-popup-fp-container')[0];

        const config = {childList: true};

        const callback = function (mutationList, observer) {
            for (const mutation of mutationList) {
                if (mutation.addedNodes.length > 0) {
                    addClasses();
                }

                if (mutation.removedNodes.length > 0 && mutation.removedNodes[0].classList[0] === "v-popup-fp-overlay") {
                    deleteClasses();
                }
            }
        };

        const observer = new MutationObserver(callback);

        observer.observe(target, config);
    };

    function mutationLayoutCheck () {
        let find = false;

        const target = document.getElementsByClassName('layout__content')[0];

        const config = {childList: true};

        const callback = function (mutationList, observer) {
            for (const mutation of mutationList) {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(e => {
                        if (e.classList[0] === 'v-popup-fp-container'){
                            observer.disconnect();
                            mutationEditorCheck();
                        }
                    });
                }
            }
        };

        const observer = new MutationObserver(callback);

        observer.observe(target, config);
    };

    mutationLayoutCheck();
})();