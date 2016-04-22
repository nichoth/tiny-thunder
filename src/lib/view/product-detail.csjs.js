var buttonStyle = require('h-buttons')
var csjs = require('csjs')

module.exports = csjs`

  .tt-cart-icon {
    width: 3em;
    height: 3em;
    margin-bottom: -1em;
  }

  .tt-cart-icon:hover {
    text-decoration: none;
    opacity: 0.6;
  }

  .tt-cart-icon svg {
    position: relative;
    bottom: 1.4em;
  }

  .tt-cart-qty {
    color: darkslategray;
    position: relative;
    left: 1.5em;
    font-weight: bold;
  }

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
