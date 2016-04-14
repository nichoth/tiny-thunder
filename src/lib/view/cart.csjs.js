// cart.csjs.js
var csjs = require('csjs')
var defaultStyle = require('h-shopping-cart/index.csjs')

module.exports = csjs`
  .tt-cart {
    padding: 1em;
  }

  .tt-qty-btn {
    max-width: 3em;
  }

  .tt-cart ${defaultStyle.cell}, .tt-cart ${defaultStyle['cell-title']} {
    align-self: center;
  }

  .button-row {
    text-align: right;
  }
`
