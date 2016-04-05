var Products = require('../data/products')
var productView = require('../view/products')
var bel = require('bel')
var products

module.exports = function(moltin) {
  products = products || Products(moltin)
  products.render = productView
  products.fetch()
  return products
}
