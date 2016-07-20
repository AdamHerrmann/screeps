'use strict';

module.exports = function assert(condition, message) {
  if (!condition) {
    console.log(`ASSERT: ${message}`);
  }
};
