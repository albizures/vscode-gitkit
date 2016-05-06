'use strict';
var vscode = require('vscode');
function addCommand(context, name) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.'+ name, require('./commands/' + name))
  );
}

exports.activate = function (context) {
  addCommand(context, 'status');
  addCommand(context, 'addCurrentFile');
  addCommand(context, 'commit');
  addCommand(context, 'addAll');
  addCommand(context, 'ignoreCurrentFile');
};

exports.deactivate = function () {};