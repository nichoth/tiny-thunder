var Router = require('routes')
var observ = require('observ')
var onRoute = require('route-event')
var four04 = require('../view/404')
var Routes = require('./routes')

module.exports = function(moltin) {
  var router = Router()
  var activeRoute = observ('')

  var setRoute = onRoute(function(path, scroll) {
    var m = router.match(path)
    if (!m) {
      return activeRoute.set(four04())
    }
    m.fn(m.params)
    console.log(path, scroll);
    setTimeout(function () {
      window.scrollTo(scroll.scrollX, scroll.scrollY);
    }, 0)
  }, { saveScroll: true })

  var routes = Routes(moltin, setRoute)

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

  return activeRoute
}
