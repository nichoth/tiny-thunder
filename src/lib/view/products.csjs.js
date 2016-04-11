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

  .product-list-item .product-image-wrapper {
    transition: opacity 0.3s;
    display: block;
    opacity: 0.6;
    margin: 0 auto;
    background-repeat: no-repeat;
    height: 300px;
    width: 300px;
    background-size: contain;
    -webkit-clip-path: url("#clippy-diamond");
    clip-path: url("#clippy-diamond");
  }

  .product-image-wrapper:hover {
    opacity: 1;
  }

  .product-item-title {
    display: inline-block;
    margin-top: 2em;
    padding-top: 1em;
    border-top: 1px solid gray;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .product-item-title a {
    color: black;
    transition: opacity 0.25s;
    opacity: 0.5;
    text-decoration: none;
  }

  .product-item-title a:hover {
    opacity: 1;
  }
`
