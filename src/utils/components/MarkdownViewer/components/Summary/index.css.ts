import { style } from '@vanilla-extract/css'
import { details } from '../Details/index.css'
import { color } from 'utils/styles/variables.css'

export const summary = style({
  padding: '8px 16px',

  selectors: {
    [`${details}[open] &`]: {
      borderRadius: '4px 4px 0 0',
      background: color.primarySolidThinNormal,
      borderBottom: `1px solid ${color.grayThin}`
    },
  },
})
