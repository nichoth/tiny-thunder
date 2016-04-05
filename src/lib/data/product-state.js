var observ = require('observ')
var struct = require('observ-struct')

module.exports = function ProductState() {
  return struct({
    isResolving: observ(false),
    products: struct({})
  })
}
