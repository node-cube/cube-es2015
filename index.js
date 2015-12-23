/*!
 * cube-jsx: index.js
 */
var path = require('path');
var simple = require('jstransform/simple');

var JSXProcessor = function (cube) {
  this.cube = cube;
};

JSXProcessor.type = 'script';
JSXProcessor.ext = '.jsx';

JSXProcessor.prototype = {
  process: function (file, options, callback) {
    var code;
    var root = options.root;

    try {
      code = simple.transformFileSync(path.join(root, file), {react: true}).code;
    } catch (e) {
      return callback(e);
    }
    if (!options.moduleWrap) {
      return callback(null, {source: code, code: code});
    }
    if (options.release) {
      file = file.replace(/\.jsx/g, '.js');
      options.qpath = file;
    }
    this.cube.processJsCode(file, code, options, callback);
  }
};

module.exports = JSXProcessor;
