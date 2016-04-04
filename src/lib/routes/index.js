var Router = require('routes')
var struct = require('observ-struct')
var observ = require('observ')
var onRoute = require('route-event')
var four04 = require('../view/404')

module.exports = function(moltin) {
  var router = Router()
  var routes = require('./routes')(moltin)

  var state = struct({
    activeRoute: observ('')
  })

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

  onRoute(function(path) {
    var m = router.match(path)
    if (!m) {
      return state.activeRoute.set(four04)
    }
    m.fn(m.params)
  })

  return state
}
