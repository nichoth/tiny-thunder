var csjs = require('csjs')
var grid = require('./grid.csjs')

module.exports = csjs`
  .product-container extends ${grid.row} {
    justify-content: space-around;
    list-style: none;
    padding: 0;
  }

  .product-list-item extends ${grid.cell} {
    min-width: 15em;
    max-width: 15em;
    margin: 0 1em;
    margin-bottom: 2em;
    padding: 1em;
    border: 1px solid black;
  }
`
