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

`
