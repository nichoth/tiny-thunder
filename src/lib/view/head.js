var logo = require('./logo')
var cartIcon = require('./cart-icon')
var headStyle = require('./head-style.csjs')
var style = require('./fancy-nav.csjs')
var bel = require('bel')

var dHeight = 90
//var dFilter = 'url(#dropshadow)'
var dFilter = ''

function halfDiamondL() {
  return bel`
    <div class="half-diamond-item ${style['half-diamond-item']}">
      <span class="nav-text ${style['nav-text-left']}">
        home
      </span>
      <svg class="test" width="100%" height="100%" viewBox="0 0 100 100"
        preserveAspectRatio="none">
        <polyline fill="white" stroke-width="0.75" stroke="transparent"
          points="0,0 0,${dHeight} 100,0" />
        <polyline fill="white" stroke-width="0.75" stroke="black"
          points="0,${dHeight} 100,0" />
      </svg>
    </div>
  `
}

function halfDiamondR() {
  return bel`
    <div class="half-diamond-item ${style['half-diamond-item']} ${style['half-diamond-r']}">
      <span class="nav-text ${style['nav-text-right']}">
        ${cartIcon()}
      </span>
      <svg class="test" width="100%" height="100%" viewBox="0 0 100 100"
        preserveAspectRatio="none">
        <polyline fill="white" stroke-width=".75" stroke="transparent"
          points="0,0 100,${dHeight} 100,0" />
        <polyline stroke-width=".75" stroke="black" points="0,0 100,${dHeight}" />
      </svg>
    </div>
  `
}

function diamond(link) {
  return bel`
    <div class="diamond-item ${style['diamond-item']}">
      <span class="nav-text ${style['nav-text']}">
        ${link}
      </span>
      <svg class="test" width="100%" height="100%" viewBox="0 0 100 100"
        preserveAspectRatio="none" filter="${dFilter}">
        <polyline fill="white" stroke-width="0.5" stroke="black"
          points="0,0 50,${dHeight} 100,0" />
      </svg>
    </div>
  `
}

module.exports = function render (data) {
  var links = data.links

  var subNav = links.subNav.length ?
    bel`<div class="sub-nav-wrapper ${style['sub-nav-wrapper']}">
      ${links.subNav.map(function(link) {
        return diamond(link)
      })}
    </div>` :
    ''

  return bel`
    <header>
      <div class="logo-wrapper ${headStyle['logo-wrapper']}">
        <h1 class="site-name">Tiny Thunder</h1>
      </div>

      <nav class="main-nav">
        <div class="diamond-wrapper ${style['diamond-wrapper']}">
          ${halfDiamondL()}
          ${links.nav.map(diamond)}
          ${halfDiamondR()}
        </div>
          ${subNav}
      </nav>

      <svg width="0" height="0">
        <filter id="dropshadow" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

    </header>
  `
}
