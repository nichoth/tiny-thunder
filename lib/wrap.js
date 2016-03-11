// use node style (err, value) callback
module.exports = function wrap(method) {

   return function() {
     // all args except cb
     var args = Array.prototype.slice.call(arguments, 0, -1);
     var cb = arguments[arguments.length-1];
     return method(...args, res => cb(null, res), err => cb(err));
   };

}

