import { fontSize, fontWeight, lineHeight } from '@/utils/styles/text.css'
import { color } from '@/utils/styles/variables.css'
import { style } from '@vanilla-extract/css'

const articleCardHeight = '180px'

export const articleCard = style({
  height: articleCardHeight,
  boxSizing: 'border-box',
  padding: '20px 40px',
  background: color.white,
  borderRadius: '12px',
  overflow: 'hidden',
  wordBreak: 'break-all',
  selectors: {
    '&:hover': {
      outline: `1px solid ${color.primarySolid}`,
    }
  },
})

export const articleCardEmpty = style({
  height: articleCardHeight,
})

export const title = style([
  fontSize.px20,
  fontWeight.bold,
  lineHeight.per150,
  {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
])

export const date = style([
  fontSize.px12,
  fontWeight.normal,
  lineHeight.per150,
  {
    color: color.gray,
  },
])

export const body = style([
  fontSize.px14,
  fontWeight.medium,
  lineHeight.per200,
  {
    maxHeight: '80px',
    overflow: 'hidden',
    lineBreak: 'anywhere',
    textOverflow: 'ellipsis',
  },
])

export const articleCardList = style({
  width: '100%',
})
