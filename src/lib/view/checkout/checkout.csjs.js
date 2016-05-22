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

  .field-container {
    display: flex;
    flex-flow: row wrap;
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

  .tt-form-buttons {
    box-shadow: 0px -10px 15px white;
    text-align: right;
    padding-bottom: 1em;
    padding-top: 1em;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    border-top: 1px solid;
  }

  .tt-form-buttons button {
    margin-right: 2em;
  }

  .tt-checkout input[type="checkbox"] {
    display: inline-block;
    width: auto;
  }


  .tt-checkout.tt-review {
    max-width: initial;
    padding: 1em;
  }

  .error {
    color: red;
    margin-bottom: 1em;
    margin-left: 2em;
  }

  .tt-checkout form {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    margin-left: -1em;
  }

  .form-section {
    flex: 1;
    padding-left: 1em;
  }

  .tt-checkout h2 {
    text-transform: uppercase;
    font-weight: normal;
    font-size: 1em;
    border-bottom: 1px solid gray;
    color: gray;
  }

  .invalid.has-focused {
    color: red;
  }

  .invalid.has-focused input {
    border-bottom: 1px solid red;
  }

  .half, .third {}

  label.expiration {
  }

  .success-page h1 {
    line-height: 1;
    border-bottom: 3px solid;
    color: goldenrod;
    font-family: Playfair Display, sans-serif;
    text-transform: uppercase;
    letter-spacing: -0.05em;
    font-size: 13vw;
    margin: 0;
    display: inline-block;
  }

`
