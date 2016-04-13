var csjs = require('csjs')
module.exports = csjs`
  .diamond-item {
    z-index: 2;
    pointer-events: none;
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

  .sub-nav-wrapper extends .diamond-wrapper {
    z-index: 1;
    position: relative;
    bottom: 144px;
  }

  .sub-nav-wrapper .diamond-item {
    height: 120px;
  }

  .nav-text {
    pointer-events: initial;
    position: relative;
    top: 65px;
  }

  .nav-text a {
    font-family: Avenir Next;
    text-transform: uppercase;
    text-decoration: none;
    color: black;
    letter-spacing: 0.1em;
  }

  .nav-text a.active-link {
    font-weight: bold;
  }
`
