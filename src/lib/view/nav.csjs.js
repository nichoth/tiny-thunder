var csjs = require('csjs')

module.exports = csjs`
  .main-nav {
    text-align: center;
    border: 1px solid gray;
    list-style: none;
    padding: 0;
  }
  .main-nav li {
    display: inline-block;
    margin-right: 1em;
  }
  .active-link a {
    font-weight: bold;
  }

  .sub-links extends .main-nav {
  }
`
