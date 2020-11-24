'use strict';

const findIndex = require('core-js-pure/features/array/find-index');

function typeahead() {
    let timeout;
    let typeStr = '';
    return function(nodeList, char, timeoutLength) {
        typeStr = typeStr.concat(char);
        let index;
        // eslint-disable-next-line eqeqeq
        if (nodeList == null) return -1;
        const lowerTypeStr = typeStr.toLocaleLowerCase();
        index = findIndex(nodeList, (el) => el.innerText.toLocaleLowerCase().startsWith(lowerTypeStr));
        if (index === -1) {
            index = findIndex(nodeList, (el) => el.innerText.toLocaleLowerCase().includes(lowerTypeStr));
        }
        if (timeout) {
            clearTimeout(timeout);
        }
        setTimeout(() => {
            clearTimeout(timeout);
            typeStr = '';
        }, timeoutLength);
        return index;
    };
}

module.exports = typeahead;