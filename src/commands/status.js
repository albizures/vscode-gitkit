var git = require('../utils/git.js');
var files = require('../utils/files.js');


var NAME_FILE_STATUS = '/.git/GITKIT_STATUS';
module.exports = function () {
  console.log('status');
  git.status(onStatus);
  
  function onStatus(err, result) {
    console.log('onStatus', err, result);
    files.createFile(NAME_FILE_STATUS, result, onCreteFile);
  }
  function onCreteFile(err) {
    console.log('onCreteFile', err);
    if (!err) {
      files.open(NAME_FILE_STATUS, onOpen);
    }
  }
  function onOpen(err) {
    console.log('onOpen', err);
  }
};