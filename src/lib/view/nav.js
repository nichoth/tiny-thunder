var style = require('./nav.csjs')
var bel = require('bel')

module.exports = function renderNav(links) {

  return bel`
    <ul class="nav">
      ${links.map(function(page) {
        var activeClass = page.activeLink ? 'active-link' : ''
        return bel`
        <li class="${style[activeClass]}">
          <a href="${page.url}">${page.text}</a>
        </li>
        `
      })}
    </ul>
  `
}
