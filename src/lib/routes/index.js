var Router = require('routes')
var observ = require('observ')
var onRoute = require('route-event')
var four04 = require('../view/404')

module.exports = function(moltin) {
  var router = Router()
  var routes = require('./routes')(moltin)

  var activeRoute = observ('')

  var stopListening = function(){}

  Object.keys(routes).forEach(function(path) {
    var routeFn = routes[path]
    router.addRoute(path, function(params) {
      stopListening()
      var routeState = routeFn(params)
      var routeData = routeState()
      activeRoute.set(routeState.render(routeData))

      stopListening = routeState(function onChange(data) {
        activeRoute.set(routeState.render(data))
      })
    })
  })

  onRoute(function(path) {
    var m = router.match(path)
    if (!m) {
      return activeRoute.set(four04())
    }
    m.fn(m.params)
  })

  return activeRoute
}
