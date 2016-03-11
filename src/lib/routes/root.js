var head = require('./templates/head');

module.exports = function(bel, data) {
  return bel`<div class="root">${head(bel)}</div>`
}
