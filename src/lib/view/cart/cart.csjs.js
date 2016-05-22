// cart.csjs.js
var csjs = require('csjs')
var defaultStyle = require('h-shopping-cart/index.csjs')

module.exports = csjs`
  .tt-cart {
    padding: 1em;
    padding-top: 3em;
  }

  a.disabled {
    color: lightgray;
    border: 1px solid lightgray;
  }

  a.disabled:hover {
    color: lightgray;
    border: 1px solid lightgray;
    cursor: default;
  }

  .tt-qty-btn {
    max-width: 3em;
  }

  .tt-cart ${defaultStyle.cell}, .tt-cart ${defaultStyle['cell-title']} {
    align-self: center;
  }

  .button-row {
    margin-top: 1em;
    text-align: right;
  }
`
