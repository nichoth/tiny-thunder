var Router = require('routes')
var struct = require('observ-struct')
var observ = require('observ')
var observify = require('observify')
var cartView = require('./cart')
var CartStore = require('../data/cart')
var bel = require('bel')
var onRoute = require('route-event')
var four04 = require('../view/404')

module.exports = function(moltin) {
  var router = Router()
  var routes = require('./routes')(moltin)

  var state = struct({
    activeRoute: observ('')
  })

//  var state = struct(Object.keys(routes).reduce(function(acc, path) {
//    acc[path] = struct({})
//    return acc
//  }, { activeRoute: observ('') }))

  var stopListening = function(){}

  Object.keys(routes).forEach(function(path) {
    router.addRoute(path, function() {
      stopListening()
      var route = routes[path]()
      stopListening = route(function onChange(data) {
        state.activeRoute.set(route.render.bind(null, data))
      })
      var r = route()
      state.activeRoute.set(route.render.bind(null, r))
    })
  })

//   router.addRoute('/', function(params) {
//     update(require('./root')(bel))
//   })
//
//   router.addRoute('/cart', function(params) {
//     var testData = { rows: [
//       {
//         onDelete: console.log.bind(console, 'delete'),
//         title: 'Example Product',
//         priceEach: '7',
//         quantity: 3,
//         priceTotal: 7*3
//       }
//     ]}
//
//     var cart = CartStore(moltin)
//
//     update(cartView(bel, testData))
//   })
//
  onRoute(function(path) {
    var m = router.match(path)
    if (!m) {
      return state.activeRoute.set(four04.bind(null, bel))
    }
    m.fn(m.params)
  })

  return state
}
