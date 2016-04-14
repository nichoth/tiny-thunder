var csjs = require('csjs')
module.exports = csjs`
  .tt-btn {
    width: 2em;
    height: 2em;
    display: inline-block;
  }

  .tt-btn button {
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .tt-btn button:hover {
    opacity: 0.5;
  }

  .tt-btn svg {
    stroke: black;
    stroke-width: 5;
  }

  .tt-btn a:hover {
    opacity: 0.5;
  }
`
