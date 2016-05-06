var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');
var rootPath = require('vscode').workspace.rootPath;

function exec(args, cb) {
  console.log('git.exec');
  var result = '';
  var err = '';
  cp = spawn('git', args, {cwd : rootPath});
  
  cp.stdout.on('data', function (data) {
    console.log('cp.stdout.on');
    result += data;
  });

  cp.stderr.on('data', function (data) {
    console.log('cp.stderr.on');
    err += data;
  });

  cp.on('close', function (code) {
    console.log('close');
    cp.stdin.pause();
    cp.kill();
    if(cb) cb(err, result, args);
  });
};

exports.exec = exec;

exports.status = function (cb) {
  console.log('git.status');
  exec(['status'], cb);
};

exports.addPath = function (addPath, cb) {
  console.log('git.add');
  exec(['add', addPath.replace(rootPath + '/', '')], cb);
};
//git reset <file>
exports.addAll = function (cb) {
  console.log('git.addAll');
  exec(['add', '--all'], cb);
};

exports.commitWithFile = function (filePath, cb) {
  console.log('git.commitWithFile');
  exec([
    'commit',
    '--cleanup=strip',
    '--file=' + filePath.replace('\\' + rootPath, '')
  ], cb);
}