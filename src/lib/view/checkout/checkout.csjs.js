var csjs = require('csjs')
var focusColor = '#03A9F4'

module.exports = csjs`
  .tt-checkout {
    max-width: 35em;
    margin: 0 auto;
    text-align: left;
  }

  .tt-checkout input {
    margin-top: 0.2em;
    transition: border 0.25s;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid lightgray;
  }

  .tt-checkout input:focus {
    outline: none;
    border-bottom: 1px solid ${focusColor};
  }

  .tt-checkout label {
    min-width: 10em;
    color: gray;
    font-size: 0.8em;
    display: block;
    margin-bottom: 2em;
    flex: 1;
    margin-right: 1em;
  }

  .tt-checkout label:last-child {
    margin-right: 0;
  }

  .tt-checkout fieldset {
    padding-bottom: 0;
    margin-bottom: 2em;
    box-shadow: 1px 4px 12px gray;
    border: none;
  }

  .tt-checkout legend {
    background-color: white;
    padding: 0 1em;
  }

  .field-container {
    display: flex;
    flex-flow: row wrap;
  }

  .tt-form-buttons {
    //margin-top: 1em;
    text-align: right;
    padding-bottom: 1em;
  }

  .tt-form-buttons button {
    margin-right: 2em;
  }

  .tt-form-buttons button:last-child {
    margin-right: 0;
  }

  .tt-review .tt-form-buttons {
    flex: 1;
  }

  .tt-checkout input[type="checkbox"] {
    display: inline-block;
    width: auto;
  }

  .tt-checkout form {
    width: 100%;
    margin: 0 auto;
  }

  .tt-checkout input.hasFocused:invalid {
    background-color: blue;
  }

  .tt-checkout input:valid {
  }

  .tt-checkout.tt-review {
    max-width: initial;
  }

  .summary {
    display: flex;
    margin-left: -1em;
    padding: 0 2em;
    margin-bottom: 3em;
  }

  .tt-address-line {
    display: block;
  }

  .tt-review-section {
  }

  .error {
    color: red;
    margin-bottom: 1em;
    margin-left: 2em;
  }

`
