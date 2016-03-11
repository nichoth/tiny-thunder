require('dotenv').config();
var wrap = require('./lib/wrap');
var m = require('moltin')({
    publicId: process.env.PUBLIC_ID,
    secretKey: process.env.SECRET_KEY
  })
;

wrap(m.Authenticate.bind(m))(app);

function app(err, auth) {
  var find = wrap(m.Product.Find.bind(m.Product));
  find({}, function(err, res) {
    console.log(res);
  });
}

