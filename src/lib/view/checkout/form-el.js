var xtend = require('xtend')
var slugify = function(str) {
  return require('slug')(str, {
    lower: true,
    replacement: '_'
  })
}

module.exports = formEl

function formEl(h, props) {
    props = typeof props === 'string' ? { name: props } : props

    var attrs = xtend({
      type: 'text',
      required: 'required'
    }, props, {
      name: slugify(props.name)
    })

    if (props.required === false) {
      delete attrs.required
    }

    return h('label', props.className ? { className: props.className } : {}, [
      props.name, h('input', attrs)
    ])

  }

