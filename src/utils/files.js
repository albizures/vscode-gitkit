var fs = require('fs');
var path = require('path');
var vscode = require('vscode');
var workspace = vscode.workspace;
var commands = vscode.commands;
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

exports.getCurrentFile = function (relative) {
  var activeEditor = window.activeTextEditor;
  var document = activeEditor && activeEditor.document;
  if (relative && document && document.fileName) {
    return document.fileName.replace(rootPath, '');
  }
  return document && document.fileName;
};
exports.removeFile = function (pathFile, cb) {
  fs.unlink(path.join(rootPath, pathFile.replace(rootPath, '')), cb);
};

exports.closeCurrentFile = function () {
  commands.executeCommand('workbench.action.closeActiveEditor');
};

exports.saveEvent = function (cb) {
  workspace.onDidSaveTextDocument(cb);
};

exports.appendLine = function (pathFile, line, cb) {
  fs.appendFile(path.join(rootPath, pathFile.replace(rootPath, '')), line, cb);
};

exports.getRelativePath = function (absolutePath) {
  return absolutePath.replace(rootPath, '');
}