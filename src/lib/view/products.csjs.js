var csjs = require('csjs')
var grid = require('./grid.csjs')

module.exports = csjs`
  .product-container extends ${grid.row} {
    justify-content: space-around;
    list-style: none;
    padding: 0;
  }

  .product-list-item extends ${grid.cell} {
    margin: 0 2em;
    margin-bottom: 4em;
  }

  .product-list-item > a {
    display: block;
  }

  .product-list-item .product-image-wrapper {
    opacity: 0.6;
    transition: opacity 0.3s;
    display: block;
    margin: 0 auto;
    background-repeat: no-repeat;
    height: 300px;
    width: 300px;
    background-size: contain;
    -webkit-clip-path: url("#clippy-diamond");
    clip-path: url("#clippy-diamond");
  }

  .product-list-item:hover .product-image-wrapper,
  .product-list-item:hover .product-item-title {
    opacity: 1;
  }

  .product-item-title {
    color: black;
    text-decoration: none;
    transition: opacity 0.3s;
    opacity: 0.5;
    display: inline-block;
    margin-top: 1em;
    padding-top: 1em;
    border-top: 1px solid gray;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

`
