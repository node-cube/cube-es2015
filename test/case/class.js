/*!
 * cube-es2015: test/case/class.js
 * Authors  : fishbar <zhengxinlin@gmail.com> (https://github.com/fishbar)
 * Create   : 2016-03-31 14:55:42
 * CopyRight 2016 (c) Fish And Other Contributors
 */
'use strict';

var B = require('./b');

class A extends B {
  constructor () {
    super();
    console.log('hello');
  }
}

module.exports = A;