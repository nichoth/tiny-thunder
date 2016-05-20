var csjs = require('csjs')
module.exports = csjs`
  .button {
    display: inline-block;
    font-weight: bold;
    box-shadow: 4px 4px 4px #ccc;
    text-transform: uppercase;
    border: 2px solid gray;
    padding: 0.6em 1em;
    letter-spacing: 0.1em;
    color: gray;
  }
  .button:hover {
    text-decoration: none;
    border: 2px solid black;
    color: black;
  }
`
