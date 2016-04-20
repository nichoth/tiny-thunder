var bel = require('bel')

module.exports = function(btns) {
  return bel`
    <div class="${style['bottom-controls']}">
      ${btns}
    </div>
  `
}
