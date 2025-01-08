'use strict'

const spaceProps = {
  inline: Boolean,
  wrap: Boolean,
  size: {
    type: String,
    values: ['x-small', 'small', 'medium', 'large', 'x-large'],
    default: 'medium',
  },
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
  justify: {
    type: String,
    values: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    default: 'start',
  },
  align: {
    type: String,
    values: ['start', 'end', 'center', 'baseline', 'stretch'],
    default: 'start',
  },
}

exports.spaceProps = spaceProps
// # sourceMappingURL=space.cjs.map
