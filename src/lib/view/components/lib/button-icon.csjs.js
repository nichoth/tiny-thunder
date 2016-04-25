var csjs = require('csjs')
module.exports = csjs`
  .tt-btn-icon {
    width: 2em;
    height: 2em;
    display: inline-block;
    vertical-align: bottom;
  }

  .tt-btn-icon button {
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .tt-btn-icon button:hover {
    opacity: 0.5;
  }

  .tt-btn-icon svg {
    stroke: black;
    stroke-width: 5;
  }

  .tt-btn-icon a:hover {
    opacity: 0.5;
  }
`

