var buttonStyle = require('h-buttons')
var csjs = require('csjs')

module.exports = csjs`
  .product-detail-page {
    text-align: left;
    max-width: 40em;
    margin: 0 auto;
    padding: 1em;
  }

  .product-gallery {
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
  }

  .product-nav {
    padding-bottom: 0.5em;
    border-bottom: 1px solid gray;
    text-align: right;
    margin-bottom: 1em;
  }

  .tt-button-del extends ${buttonStyle['h-button-delete']} {
    opacity: 0.6;
  }

  .tt-button-del:hover {
    opacity: 0.4 !important;
  }

  .tt-price {
    display: inline-block;
    float: right;
  }

  .tt-prod-buttons {
    text-align: right;
  }

`
