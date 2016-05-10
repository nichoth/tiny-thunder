var csjs = require('csjs')
module.exports = csjs`
  .order-summary {
    list-style: none;
    padding: 0;
    padding-bottom: 1em;
    border-bottom: 1px solid gray;
    margin-bottom: 0;
  }

  .order-summary li {
    align-items: center;
    display: flex;
    margin-bottom: 0.5em;
  }

  .image {
    width: 6em;
    height: 6em;
  }

  .cell {
    display: inline-block;
    flex: 1;
  }

  .numeric {
    text-align: right;
  }

`
