var git = require('../utils/git.js');
var files = require('../utils/files.js');
var messages = require('../utils/messages.js');

module.exports = function () {
  console.log('revertCurrentFile');
  git.revertPath(files.getCurrentFile(), onRevert);
  
  function onRevert(err, result, args) {
    if (err) {
      messages.error(err);
    } else {
      messages.info('Revert file');
    }
  }
};