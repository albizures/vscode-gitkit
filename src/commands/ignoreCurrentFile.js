var git = require('../utils/git.js');
var files = require('../utils/files.js');
var messages = require('../utils/messages.js');

module.exports = function () {
  console.log('addCurrentFile');
  files.appendLine('.gitignore', files.getCurrentFile(true), onAppend);
  
  function onAppend(err, result, args) {
    if (err) {
      messages.error(err);
    } else {
      messages.info('Ignore File');
    }
  }
};