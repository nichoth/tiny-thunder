var style = require('./nav.csjs')

module.exports = function renderNav(bel, links) {

  return bel`
    <nav>
      <ul class="${style['main-nav']}">
        ${links.map(function(page) {
          return bel`
            <li>
              <a href="${page.url}">${page.text}</a>
            </li>
          `
        })}
      </ul>
    </nav>
  `
}
