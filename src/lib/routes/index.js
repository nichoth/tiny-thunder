var router = require('routes')()
var cartView = require('./cart')
var bel = require('bel')

module.exports = function(update) {
  router.addRoute('/', function(params) {
    update(require('./root')(bel))
  })

  router.addRoute('/cart', function(params) {
    var testData = { rows: [
      {
        onDelete: console.log.bind(console, 'delete'),
        title: 'Example Product',
        priceEach: '7',
        quantity: 3,
        priceTotal: 7*3
      }
    ]}

    update(cartView(bel, testData))
  })

  return router
}
