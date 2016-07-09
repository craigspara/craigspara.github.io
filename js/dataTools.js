/**
 *
 * @param element
 * @param dataAttr
 * @returns {*}
 */
function fetchDataAttr(element, dataAttr) {
    "use strict";
    var d;

    if (element.hasAttribute('data-' + dataAttr)) {
        d = element.dataset.test;
    }

    return d;
}

// Usage
    var domElement = document.querySelector('.data-attr-test1');
    var dataAttrValue = fetchDataAttr(domElement, 'test');
    console.log(dataAttrValue);
    console.log(typeof dataAttrValue);
