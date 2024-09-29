import { style } from '@vanilla-extract/css'
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from 'utils/styles/text.css'
import { color } from 'utils/styles/variables.css'

export const inlineCode = style([
  fontSize.px14,
  fontFamily.monospace,
  fontWeight.normal,
  lineHeight.per150,
  {
    padding: '1px 8px',
    color: color.red,
    borderRadius: '4px',
    background: '#f4f4f4',
  },
])
