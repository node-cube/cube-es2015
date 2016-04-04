/*!
 * cube-jsx: index.js
 */
'use strict';

const path = require('path');
const babelCore = require('babel-core');
const babelPluginTransformRuntime = require('babel-plugin-transform-runtime');
const babelPresetEs2015 = require('babel-preset-es2015');

const ES2015Processor = function (cube) {
  this.cube = cube;
};

ES2015Processor.type = 'script';
ES2015Processor.ext = '.js';

ES2015Processor.prototype.process = function (data, callback) {
  let code = data.code;
  let root = data.root;
  let res;
  try {
    res = babelCore.transform(code, {
      ast: true,
      code: true,
      plugins: [
        [babelPluginTransformRuntime, {
          "polyfill": false,
          "regenerator": true
        }]
      ],
      presets: [
        babelPresetEs2015
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
