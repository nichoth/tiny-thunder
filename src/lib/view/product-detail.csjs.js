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
    text-align: right;
    margin-bottom: 1em;
  }

`
