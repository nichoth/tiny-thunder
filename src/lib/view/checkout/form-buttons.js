var bel = require('bel')
var button = require('../components/real-button')

function formButtons(content) {
  return bel`
    <div class="tt-form-buttons ${style['tt-form-buttons']}">
      ${button({ type: 'submit' }, content)}
    </div>
  `
}

