var bel = require('bel')

module.exports = {
  diamond: bel`
    <svg class="diamond" width="0" height="0">
      <defs>
        <clipPath id="clippy-diamond" clipPathUnits="objectBoundingBox">
          <polygon points="0.5 0, 1 0.5, 0.5 1, 0 0.5" />
        </clipPath>
      </defs>
    </svg>
  `
}
