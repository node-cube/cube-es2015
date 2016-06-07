/*!
 * cube-jsx: index.js
 */
'use strict';

const babelCore = require('babel-core');

function genRule(rule) {
  if (rule.indexOf('/') === 0) {
    rule = '^' + rule;
  }
  return new RegExp(rule.replace(/\./g, '\\.').replace(/\*/g, '.*'));
}

function ES2015Processor(cube) {
  this.cube = cube;
  let config = this.cube.config;
  let exclude = [];
  if (config.build && config.build.es2015) {
    config.build.es2015.exclude && config.build.es2015.exclude.forEach(function (rule) {
      exclude.push(genRule(rule));
    });
  } else {
    exclude.push(/^\/node_modules/);
  }
  this.excludeRules = exclude;
  let flagStrict = this.cube.config && this.cube.config.strictModel;
  this.plugins = [
    [
      require('babel-plugin-transform-runtime'),
      {polyfill: false, regenerator: true}
    ],
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
    [
      require('babel-plugin-transform-es2015-modules-commonjs'),
      {strict: flagStrict || false, allowTopLevelThis: true}
    ],
    [
      require('babel-plugin-transform-regenerator'),
      {async: false, asyncGenerators: false}
    ]
  ];
}

ES2015Processor.type = 'script';
ES2015Processor.ext = '.*';

ES2015Processor.prototype.process = function (data, callback) {
  let code = data.code;
  let res;
  let exclude = this.excludeRules;
  for (let i = 0, len = exclude.length; i < len; i++) {
    if (exclude[i].test(data.queryPath)) {
      return callback(null, data);
    }
  }
  try {
    res = babelCore.transform(code, {
      ast: true,
      code: true,
      filename: data.realPath,
      sourceRoot: this.cube.config.root,
      comments: false,
      plugins: this.plugins
    });
  } catch (e) {
    e.message = 'transform to es2015 error, ' + e.message;
    return callback(e);
  }
  data.code = res.code;
  callback(null, data);
};

module.exports = ES2015Processor;
