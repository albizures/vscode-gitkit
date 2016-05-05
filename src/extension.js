'use strict';
var vscode = require('vscode');
function addCommand(context, name) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.'+ name, require('./commands/' + name))
  );
}
function activate(context) {
  var disposable = vscode.commands.registerCommand('extension.sayHello', function () {
    
  });
  addCommand(context, 'status');
  
  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
  
}
exports.deactivate = deactivate;