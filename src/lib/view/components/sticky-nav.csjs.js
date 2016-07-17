var cart = require('../cart/cart.csjs')
var csjs = require('csjs')
module.exports = csjs`
  .sticky-nav {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
  }

  ${cart['tt-cart']} .sticky-nav nav {
    justify-content: center;
  }

  .sticky-nav nav {
    padding: 0 1em;
    border-bottom: 1px solid gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.8em;
  }
`
