var git = require('../utils/git.js');
var files = require('../utils/files.js');
var messages = require('../utils/messages.js');

module.exports = function () {
  git.addAll(onAdd);
  
  function onAdd(err, result, args) {
    if (err) {
      messages.error(err);
    } else {
      messages.info('Added all files');
    }
  }
};