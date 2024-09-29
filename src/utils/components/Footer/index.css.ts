import { color } from 'utils/styles/variables.css'
import { style } from '@vanilla-extract/css'

export const footer = style({
  height: '120px',
  background: color.white,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
