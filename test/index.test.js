/*!
 * cube-es2015: test/index.test.js
 * Authors  : fishbar <zhengxinlin@gmail.com> (https://github.com/fishbar)
 * Create   : 2016-03-31 14:55:42
 * CopyRight 2016 (c) Fish And Other Contributors
 */
'use strict';
const should = require('should');
const TestMod = require('../index');
const path = require('path');
const fs = require('fs');
var cube = {
  processJsCode: function (file, code, options, callback) {
    callback(null, code);
  }
};
var root = path.join(__dirname);

describe('cube-es2015', function () {
  describe('process()', function () {
    it('should work fine with class', function (done) {
      var mod = new TestMod(cube);
      var code = fs.readFileSync(path.join(__dirname, './case/class.js')).toString();
      mod.process({code: code}, function (err, res) {
        res.code.should.not.match(/class A/);
        done();
      });
    });

    it('should work fine with let', function (done) {
      var mod = new TestMod(cube);
      var code = fs.readFileSync(path.join(__dirname, './case/let.js')).toString();
      mod.process({code: code}, function (err, res) {
        res.code.should.not.match(/let/);
        done();
      });
    });
  });
});