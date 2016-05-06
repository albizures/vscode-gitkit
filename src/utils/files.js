var fs = require('fs');
var path = require('path');
var vscode = require('vscode');
var workspace = vscode.workspace;
var window = vscode.window;
var rootPath = workspace.rootPath;

exports.createFile = function (fileName, text, cb) {
  fs.writeFile(path.join(rootPath, fileName), text, function (err, data) {
    if(cb) cb();
  });
};

exports.open = function (fileName, cb) {
  workspace.openTextDocument(path.join(rootPath, fileName)).then(onOpen);
  
  function onOpen(textDocument) {
    window.showTextDocument(textDocument).then();
  }
  function onShow(editor) {
    var err;
    if (!editor) {
       err = true;
    }
    if(cb) cb(err);
  }
};

exports.getCurrentFile = function () {
  var activeEditor = window.activeTextEditor;
  var document = activeEditor && activeEditor.document;
  return document && document.fileName;
};