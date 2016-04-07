var csjs = require('csjs')
var grid = require('./grid.csjs')

module.exports = csjs`
  .product-container extends ${grid.row} {
    justify-content: space-around;
    list-style: none;
    padding: 0;
  }

  .product-list-item extends ${grid.cell} {
    margin-bottom: 2em;
    border: 1px solid black;
  }

  .product-list-item .product-image-wrapper {
    margin: 0 auto;
    background-repeat: no-repeat;
    height: 300px;
    width: 300px;
    background-size: contain;
    -webkit-clip-path: url("#clippy-diamond");
    clip-path: url("#clippy-diamond");
  }

  .product-item-title {
    display: inline-block;
    margin-top: 0.5em;
    padding-top: 1em;
    border-top: 1px solid gray;
    text-transform: uppercase;
    color: gray;
    letter-spacing: 0.1em;
  }
`
