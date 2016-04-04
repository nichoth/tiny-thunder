var Products = require('../data/products')
var loading = require('../view/loading')
var bel = require('bel')

module.exports = function(moltin) {
  var products = Products(moltin)
  products.render = render
  products.fetch()
  return products
}

function render(data) {
  console.log(data)
  if (data.isResolving) {
    return loading()
  }
  return bel`<div>product page ${Object.keys(data.products).length}</div>`
}

