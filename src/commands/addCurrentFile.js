var git = require('../utils/git.js');
var files = require('../utils/files.js');
var messages = require('../utils/messages.js');

module.exports = function () {
  console.log('addCurrentFile');
  git.addPath(files.getCurrentFile(), onAdd);
  
  function onAdd(err, result, args) {
    if (err) {
      messages.error(err);
    } else {
      messages.info('Added ' + (args && args[1]));
    }
  }
};