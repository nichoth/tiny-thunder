var http = require('http')
var fs = require('fs')
var auth = require('basic-auth')
var ecstatic = require('ecstatic')({
  root: __dirname + '/public',
  handleError: false
})
var config = require('./config')

http.createServer(function onRequest (req, resp) {
  var creds = auth(req)

  if (!creds || creds.name !== config.NAME || creds.pass !== config.PASS) {
    resp.statusCode = 401
    resp.setHeader('WWW-Authenticate', 'Basic realm="example"')
    resp.end('Access denied')
    return
  }

  ecstatic(req, resp, next)

  function next () {
    resp.writeHead(200, { 'Content-Type': 'text/html' })
    fs.createReadStream('public/index.html')
      .pipe(resp)
  }

}).listen(config.PORT, config.IP)

console.log('listening on ' + config.IP + ':' + config.PORT)
