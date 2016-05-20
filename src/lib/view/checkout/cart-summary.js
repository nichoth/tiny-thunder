var bel = require('bel')
var xtend = require('xtend')
var renderCart = require('h-shopping-cart')
var style = require('./cart-summary.csjs')

module.exports = function(cartContents) {

  var rows = Object.keys(cartContents).map(function(rowId) {
    var row = cartContents[rowId]
    return {
      title: row.name,
      image: row.images[0].url.http,
      quantity: row.quantity,
      price: row.pricing.formatted.without_tax,
      priceTotal: row.totals.pre_discount.formatted.without_tax
    }
  })

  function cell(content, props) {
    var cl = ((props && props.className) || '') + ' ' + style.cell
    return bel`
      <span class="${cl}">
        ${content}
      </span>
    `
  }

  var el = bel`
    <ul class=${style['order-summary']}>
      ${rows.map(function(r) {
        return bel`
          <li>
            ${cell(bel`
              <img src="${r.image}">
            `, { className: style.image })}
            ${cell(r.title)}
            ${cell(r.quantity, { className: style.numeric })}
            ${cell(r.price, { className: style.numeric })}
            ${cell(r.priceTotal, { className: style.numeric })}
          </li>
        `
      })}
    </ul>
  `

  return el

}