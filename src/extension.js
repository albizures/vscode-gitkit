'use strict';
var vscode = require('vscode');
function addCommand(context, name) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.'+ name, require('./commands/' + name))
  );
}
function activate(context) {
  addCommand(context, 'status');
  addCommand(context, 'addCurrentFile');
  addCommand(context, 'commit');
  addCommand(context, 'addAll');
}
exports.activate = activate;

function deactivate() {
  
}
exports.deactivate = deactivate;