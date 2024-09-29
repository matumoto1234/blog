import { style } from '@vanilla-extract/css'
import { fontWeight } from 'utils/styles/text.css'
import { color } from 'utils/styles/variables.css'

export const table = style({
  borderCollapse: 'collapse',
})

export const th = style([
  fontWeight.bold,
  {
    border: '1px solid',
    borderColor: color.navy,
    padding: '8px 12px',
  },
])

export const td = style({
  border: '1px solid',
  borderColor: color.navy,
  padding: '4px 12px',
})
