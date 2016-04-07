var bel = require('bel')

module.exports = function(data) {
  console.log(data)

  function head() {
    return bel`<h1>head part</h1>`
  }

  return bel`
    <div>product detail page</div>
  `
}
