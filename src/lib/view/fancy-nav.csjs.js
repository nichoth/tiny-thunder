var csjs = require('csjs')
module.exports = csjs`
  .diamond-item {
    flex: 1;
    width: 22em;
    height: 150px;
  }

  .half-diamond-item extends .diamond-item {
    flex: 0.5;
    position: relative;
    top: 1.2em;
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
