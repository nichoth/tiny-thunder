var csjs = require('csjs')
var focusColor = '#03A9F4'

module.exports = csjs`
  .tt-checkout {
    text-align: left;
  }

  .tt-checkout input {
    margin-top: 0.2em;
    transition: border 0.25s;
    display: block;
    width: 100%;
    font-size: 1em;
    border: none;
    border-bottom: 1px solid lightgray;
  }

  .tt-checkout input:focus {
    outline: none;
    border-bottom: 1px solid ${focusColor};
  }

  .tt-checkout label {
    color: gray;
    font-size: 0.8em;
    display: block;
    margin-bottom: 2em;
  }

  .tt-checkout input[type="checkbox"] {
    display: inline-block;
    width: auto;
  }

  .tt-checkout form {
    width: 100%;
    max-width: 30em;
    margin: 0 auto;
  }

  .tt-checkout input.hasFocused:invalid {
    background-color: blue;
  }

  .tt-checkout input:valid {
  }
`
