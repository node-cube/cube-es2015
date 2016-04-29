/*!
 * cube-jsx: index.js
 */
'use strict';

const babelCore = require('babel-core');

function ES2015Processor(cube) {
  this.cube = cube;
}

ES2015Processor.type = 'script';
ES2015Processor.ext = '.*';

ES2015Processor.prototype.process = function (data, callback) {
  let code = data.code;
  let root = data.root;
  let flagStrict = this.cube.config && this.cube.config.strictModel;
  let res;
  if (/^\/node_modules\/babel-runtime\//.test(data.queryPath)) {
    return callback(null, data);
  }
  try {
    res = babelCore.transform(code, {
      ast: true,
      code: true,
      plugins: [
        [require('babel-plugin-transform-runtime'), {polyfill: false, regenerator: true}],
        require('babel-plugin-transform-es2015-template-literals'),
        require('babel-plugin-transform-es2015-literals'),
        require('babel-plugin-transform-es2015-function-name'),
        require('babel-plugin-transform-es2015-arrow-functions'),
        require('babel-plugin-transform-es2015-block-scoped-functions'),
        require('babel-plugin-transform-es2015-classes'),
        require('babel-plugin-transform-es2015-object-super'),
        require('babel-plugin-transform-es2015-shorthand-properties'),
        require('babel-plugin-transform-es2015-duplicate-keys'),
        require('babel-plugin-transform-es2015-computed-properties'),
        require('babel-plugin-transform-es2015-for-of'),
        require('babel-plugin-transform-es2015-sticky-regex'),
        require('babel-plugin-transform-es2015-unicode-regex'),
        require('babel-plugin-check-es2015-constants'),
        require('babel-plugin-transform-es2015-spread'),
        require('babel-plugin-transform-es2015-parameters'),
        require('babel-plugin-transform-es2015-destructuring'),
        require('babel-plugin-transform-es2015-block-scoping'),
        require('babel-plugin-transform-es2015-typeof-symbol'),
        [require('babel-plugin-transform-es2015-modules-commonjs'), {strict : flagStrict || false}],
        [require('babel-plugin-transform-regenerator'), {async: false, asyncGenerators: false}]
      ]
    });
  } catch (e) {
    e.message = 'transform to es2015 error, ' + e.message;
    return callback(e);
  }
  data.code = res.code;
  callback(null, data);
};


module.exports = ES2015Processor;
