var buttonStyle = require('h-buttons')
var loadingStyle = require('./components/spinner.csjs')
var csjs = require('csjs')

module.exports = csjs`

  .product-detail-page {
    padding: 1em;
    padding-top: 6em;
    text-align: left;
    margin: 0 auto;
    display: flex;
  }

  .product-description {
    flex: 4;
    margin-left: 2em;
  }

  .product-gallery {
    max-width: 30em;
    flex: 8;
  }

  .product-gallery .main-image {
  }

  .product-gallery .main-image img {
    width: 100%;
  }

  .product-detail-page .product-title {
    color: gray;
    text-transform: uppercase;
    font-weight: 100;
    letter-spacing: 0.1em;
    margin-top: 0;
  }

  .product-nav {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5em;
    border-bottom: 1px solid gray;
    margin-bottom: 1em;
  }

  .tt-price {
    display: inline-block;
    float: right;
  }

  .tt-prod-buttons {
    text-align: right;
  }

  .tt-prod-buttons ${loadingStyle['loader']} {
    margin: 2em 8em;
  }

  .tt-prod-buttons button:disabled {
    color: lightgray;
    border-color: lightgray;
  }

  .tt-prod-buttons button:disabled:hover {
    cursor: initial;
    color: lightgray;
    border-color: lightgray;
  }

`
