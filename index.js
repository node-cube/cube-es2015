var path = require('path');
var fs = require('fs');
var jsx = require('./JSXTransformer');

var JSXProcessor = function (cube) {
  this.cube = cube;
};
JSXProcessor.info = {
  type: 'script',
  ext: '.jsx'
};

JSXProcessor.prototype = {
  process: function (file, options, callback) {
    var code;
    var root = options.root;

    try {
      code = fs.readFileSync(path.join(root, file), 'utf8');
      code = jsx.transform(code).code;
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
    this.cube.processJsCode.call(this.cube, file, code, options, callback);
  }
};

module.exports = JSXProcessor;