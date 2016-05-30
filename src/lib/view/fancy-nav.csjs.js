var csjs = require('csjs')
var ciStyle = require('./components/cart-icon.csjs')

module.exports = csjs`
  .diamond-item {
    z-index: 2;
    pointer-events: none;
    flex: 1;
    width: 22em;
    height: 90px;
  }

  .half-diamond-item extends .diamond-item {
    flex: 0.5;
  }

  .half-diamond-l {
    position: relative;
    bottom: 2.7em;
  }

  .half-diamond-r {
    position: relative;
    bottom: 1.6em;
  }

  .diamond-wrapper {
    display: flex;
    flex-flow: row wrap;
  }

  .sub-nav-wrapper extends .diamond-wrapper {
    z-index: 1;
    position: relative;
    bottom: 155px;
  }

  .sub-nav-wrapper .diamond-item {
    height: 185px;
  }

  .sub-nav-wrapper polyline {
    fill: whitesmoke;
  }

  .sub-nav-wrapper .nav-text {
    top: 130px;
  }

  .nav-text {
    pointer-events: initial;
    position: relative;
    top: 40px;
  }

  .nav-text-left extends .nav-text {
    display: block;
    top: 3.8em;
    right: 2em;
  }

  .nav-text-right extends .nav-text {
    top: 64px;
    left: 4em;
    display: block;
    width: 3em;
    height: 3em;
  }

  .nav-text-right ${ciStyle['tt-cart-qty']} {
  }

  .nav-text a {
    font-family: Avenir Next;
    text-transform: uppercase;
    text-decoration: none;
    color: black;
    letter-spacing: 0.1em;
  }

  .nav-text a.active-link {
    font-weight: bold;
  }
`
