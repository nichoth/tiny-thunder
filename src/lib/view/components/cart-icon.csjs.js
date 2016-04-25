var csjs = require('csjs')
module.exports = csjs`
  .tt-cart-icon {
    width: 3em;
    height: 3em;
    margin-bottom: -1em;
  }

  .tt-cart-icon:hover {
    text-decoration: none;
    opacity: 0.6;
  }

  .tt-cart-icon svg {
    position: relative;
    bottom: 1.4em;
  }

  .tt-cart-qty {
    color: darkslategray;
    position: relative;
    left: 1.5em;
    font-weight: bold;
  }
`
