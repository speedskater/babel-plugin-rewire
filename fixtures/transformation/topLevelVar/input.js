var MyModule = require('MyModule');

var Temp, Thing = MyModule.doDah;

function out(todo) {
  var result = Thing.process(todo);
  return MyModule.something(result);
}

module.exports = out;