var input = require('./form-el')
var xtend = require('xtend')
var update = require('yo').update

module.exports = ccInput

function ccInput(h, props) {
  var attrs = xtend(props, {
    onkeyup: onChange
  }))

  var el = input(h, attrs)

  function onChange(ev) {
    var val = ccInput.parseValue(ev.target.value)
    if (val.length === 4 || val.length === 8 || val.length === 12) {
      update(el, ccInput(xtend(attrs, {
        value: val + ' - '
      })))
    }
    if (val.length ===
    if (props.onkeyup) props.onkeyup(ev)
  }

}

ccInput.parseValue = function(value) {
}
