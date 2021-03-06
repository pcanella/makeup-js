'use strict';

var findIndex = require('core-js-pure/features/array/find-index');

var startsWith = require('core-js-pure/features/string/starts-with');

var includes = require('core-js-pure/features/string/includes');

function typeahead() {
  var timeout;
  var typeStr = '';
  return {
    getIndex: function getIndex(nodeList, _char, timeoutLength) {
      typeStr = typeStr.concat(_char);
      var index; // eslint-disable-next-line eqeqeq

      if (nodeList == null) return -1;
      var lowerTypeStr = typeStr.toLocaleLowerCase();
      index = findIndex(nodeList, function (el) {
        return startsWith(el.textContent.toLocaleLowerCase(), lowerTypeStr);
      });

      if (index === -1) {
        index = findIndex(nodeList, function (el) {
          return includes(el.textContent.toLocaleLowerCase(), lowerTypeStr);
        });
      }

      if (timeout) {
        clearTimeout(timeout);
      }

      setTimeout(function () {
        clearTimeout(timeout);
        typeStr = '';
      }, timeoutLength);
      return index;
    },
    destroy: function destroy() {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  };
}

module.exports = typeahead;
