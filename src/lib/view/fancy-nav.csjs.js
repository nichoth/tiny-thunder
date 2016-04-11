var csjs = require('csjs')
module.exports = csjs`
  .diamond-item {
    flex: 1;
    width: 22em;
    height: 150px;
  }

  .diamond-wrapper {
    display: flex;
    flex-flow: row wrap;
  }

  .nav-text {
    position: relative;
    top: 65px;
  }
`
