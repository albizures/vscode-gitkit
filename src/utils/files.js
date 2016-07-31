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

exports.writeFile = function (pathFile, test, cb) {
  if (pathFile.indexOf(rootPath) === -1) {
    pathFile = path.join(rootPath, pathFile);
  }
  fs.writeFile(pathFile, test, cb);
};

exports.open = function (pathFile, cb) {
  pathFile = path.join(rootPath, pathFile);
  workspace.openTextDocument(pathFile).then(onOpen, onError);
  
  function onOpen(textDocument) {
    window.showTextDocument(textDocument).then(onShow, onError);
  }
  function onShow(editor) {
    var err;
    if (!editor) {
       err = true;
    }
    if(cb) cb(err);
  }
  function onError(err, data) {
    console.log(err, data);
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
  originalPath = pathFile;
  pathFile = path.join(rootPath, pathFile);
  fileExist(pathFile, function (err, exist) {
    if (err || !exist) {
      if(cb) cb(err);
      return;
    }
    fs.unlink(pathFile, cb);
  });
};

function fileExist(pathFile, cb, root) {
  if (pathFile.indexOf(rootPath) === -1) {
    pathFile = path.join(rootPath, pathFile);
  }
  fs.stat(pathFile, onStats);
  function onStats(err, stats) {
    cb(err, stats && stats.isFile());
  }
}

exports.fileExist = fileExist;


exports.closeCurrentFile = function () {
  commands.executeCommand('workbench.action.closeActiveEditor');
};

exports.onSave = function (cb) {
  return workspace.onDidSaveTextDocument(cb);
};

exports.appendLine = function (pathFile, line, cb) {
  if (pathFile.indexOf(rootPath) === -1) {
    pathFile = path.join(rootPath, pathFile);
  }
  fs.appendFile(pathFile, line, cb);
};

exports.getRelativePath = function (absolutePath) {
  return absolutePath.replace(rootPath, '');
}