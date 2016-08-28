var http = require('http')
var fs = require('fs')
var auth = require('basic-auth')
var ecstatic = require('ecstatic')({
  root: __dirname + '/dist',
  handleError: false
})
var serverSecrets = require('./server-config.json')
var config = require('./config.json')

http.createServer(function onRequest (req, resp) {
  var creds = auth(req)

  if (!creds || creds.name !== serverSecrets.NAME || creds.pass !== serverSecrets.PASS) {
    resp.statusCode = 401
    resp.setHeader('WWW-Authenticate', 'Basic realm="tinythunderdesign"')
    resp.end('Access denied')
    return
  }

  ecstatic(req, resp, next)

  function next () {
    resp.writeHead(200, { 'Content-Type': 'text/html' })
    fs.createReadStream('dist/index.html')
      .pipe(resp)
  }

}).listen(config.PORT, config.IP)

console.log('listening on ' + config.IP + ':' + config.PORT)
