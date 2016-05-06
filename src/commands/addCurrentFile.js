var git = require('../utils/git.js');
var files = require('../utils/files.js');
var messages = require('../utils/messages.js');

module.exports = function () {
  console.log('addCurrentFile', files.getCurrentFile());
  git.addPath(files.getCurrentFile(), onAdd);
  
  function onAdd(err, result, args) {
    if (err) {
      messages.error(err);
    } else {
      messages.info('Added ' + (args && args[1]));
    }
  }
  function onCreteFile(err) {
    console.log('onCreteFile', err);
    if (!err) {
      files.open(NAME_FILE_STATUS, onOpen);
    }
  }
};