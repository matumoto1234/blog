import { fontSize, fontWeight, lineHeight } from 'utils/styles/text.css'
import { color } from 'utils/styles/variables.css'
import { style } from '@vanilla-extract/css'

export const articleTitle = style([
  fontSize.px32,
  fontWeight.bold,
  lineHeight.per150,
  {
    selectors: {
      '&::first-line': {
        textAlign: 'center',
      },
    },
  },
])

export const articleTitlePlaceHolder = style([
  fontSize.px32,
  fontWeight.bold,
  lineHeight.per150,
  {
    color: color.grayThin,
    selectors: {
      '&::first-line': {
        textAlign: 'center',
      },
    },
  },
])
