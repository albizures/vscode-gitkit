var git = require('../utils/git.js');
var files = require('../utils/files.js');

var NAME_FILE_STATUS = '/.git/GITKIT_COMMIT';
module.exports = function () {
  console.log('commit');
  git.status(onStatus);
  
  function onStatus(err, result) {
    console.log('onStatus', err);
    files.createFile(NAME_FILE_STATUS, '\n# ' + result.replace(/\n/g, '\n# '), onCreateFile);
  }
  function onCreateFile(err) {
    var vscode = require('vscode');
    console.log('onCreateFile', err);
    if (!err) {
      files.open(NAME_FILE_STATUS, onOpen);
      files.saveEvent(onSave);
    }
  }
  function onOpen(err) {
    console.log('onOpen', err);
  }
  function onSave(document) {
    console.log('SAVE!!!', document);
    git.commitWithFile(document.fileName, onCommit);
  }
  function onCommit(err) {
    console.log('onCommit', err);
    files.removeFile(NAME_FILE_STATUS);
  }
  function onRemove(err) {
    console.log('onRemove', err);
  }
};