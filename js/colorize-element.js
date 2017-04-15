'use strict';
window.colorizeElement = (function (elem, colors, callback) {
  var randCol = colors[Math.floor(Math.random() * colors.length)];
  callback(elem, randCol);
});
