import { style } from '@vanilla-extract/css'
import { fontWeight, lineHeight } from 'utils/styles/text.css'
import { color } from 'utils/styles/variables.css'

export const anchor = style([
  lineHeight.per150,
  fontWeight.semiBold,
  {
    color: color.primarySolid,
  },
])
