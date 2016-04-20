var bel = require('bel')

module.exports = {
  back: function() {
    return bel`
      <svg class="back-btn" width="100%" height="100%" viewBox="0 0 100 100"
        preserveAspectRatio="none">
        <path d="M50 5 L 5 50 L 50 95" fill="none" stroke-linejoin="miter" />
      </svg>
    `
  },
  del: function() {
    return bel`
      <svg class="del-btn" width="100%" height="100%" viewBox="0 0 100 100"
        preserveAspectRatio="none">
        <path d="M5 5 L 95 95" fill="none" />
        <path d="M5 95 L 95 5" fill="none" />
      </svg>
    `
  }
}
