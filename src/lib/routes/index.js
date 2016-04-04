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
    router.addRoute(path, function() {
      stopListening()
      var route = routes[path]()
      var r = route()
      activeRoute.set(route.render(r))

      stopListening = route(function onChange(data) {
        activeRoute.set(route.render(data))
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
