var csjs = require('csjs')
var style = require('./button.csjs')

module.exports = csjs`
  .real-button extends ${style['button']} {
    background-color: white;
    font-size: 1em;
    cursor: pointer;
  }
`
