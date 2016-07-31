var git = require('../utils/git.js');
var files = require('../utils/files.js');
var fileCreated = false;
var vscode = require('vscode');
var NAME_FILE_STATUS = '/.git/GITKIT_COMMIT';
var subscription;

module.exports = function () {
  files.fileExist(NAME_FILE_STATUS, onExists);
  if (!subscription) {
    subscription = files.onSave(onSave);
  }

  function onExists(err, exists) {
    fileCreated = exists;
    git.status(onStatus);
  }

  function onStatus(err, result) {
    console.log('onStatus', err);
    if (fileCreated) {
      files.writeFile(NAME_FILE_STATUS, '\n# ' + result.replace(/\n/g, '\n# '), onWrite);
    } else {
      files.createFile(NAME_FILE_STATUS, '\n# ' + result.replace(/\n/g, '\n# '), onCreateFile);
    }
  }
  function onWrite(err) {
    console.log('onWrite', err);
    if (err) {
      return;
    }
    files.open(NAME_FILE_STATUS, onOpen);
  }
  function onCreateFile(err) {
    console.log('onCreateFile', err);
    if (err) {
      return;
    }
    files.open(NAME_FILE_STATUS, onOpen);
  }
  function onOpen(err) {
    console.log('onOpen', err);
  }
};

function onSave(document) {
  console.log('SAVE!!!', document);
  if (document.fileName.indexOf(NAME_FILE_STATUS) == -1) {
    return;
  }
  git.commitWithFile(document.fileName, onCommit);
}
function onCommit(err) {
  console.log('onCommit', err);
  files.removeFile(NAME_FILE_STATUS, onRemove);
}

function onRemove(err) {
  console.log('onRemove', err);
}