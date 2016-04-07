var logo = require('./logo')
var bel = require('bel')

module.exports = function render (content) {
  return bel`
    <header>
      <h1 style="text-align: center" class="site-name">tiny thunder</h1>
      <div class="logo-wrapper">
        ${logo()}
      </div>
      ${content}
    </header>
  `
}
