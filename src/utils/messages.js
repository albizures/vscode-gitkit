var vscode = require('vscode');

exports.info = function (msg) {
  vscode.window.showInformationMessage(msg);
}

exports.error = function (msg) {
  vscode.window.showErrorMessage(msg);
}