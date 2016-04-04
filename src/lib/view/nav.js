var style = require('./nav.csjs')

module.exports = function renderNav(bel) {
  var links = [
    { url: '/cart', text: 'cart' },
    { url: '/shop', text: 'shop' },
    { url: '/', text: 'home' }
  ]

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
