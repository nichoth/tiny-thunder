var csjs = require('csjs')
module.exports = csjs`
  .checkout-nav {
    margin-bottom: 3em;

  }

  .checkout-nav ul {
    display: flex;
    padding: 0;
  }
  .checkout-nav li {
    border: 1px solid;
    text-align: center;
    flex: 1;
    display: inline-block;
    list-style: none;
  }

  .checkout-nav nav {
    max-width: 40em;
    margin: 0 auto;
  }

  .checkout-nav li.active {
    font-weight: bold;
    border: 2px solid;
  }
`
