import { fontSize, fontWeight, lineHeight } from 'utils/styles/text.css'
import { color } from 'utils/styles/variables.css'
import { style } from '@vanilla-extract/css'

const paginationButtonBase = [
  fontSize.px32,
  fontWeight.medium,
  lineHeight.per150,
  {
    fontFamily: 'roboto, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '4px',
  },
]

export const paginationButton = style([
  {
    background: color.white,
    selectors: {
      '&:hover': {
        outline: `1px solid ${color.primarySolid}`,
      },
    },
  },
  ...paginationButtonBase,
])

export const paginationButtonSelected = style([
  {
    background: color.primarySolid,
    color: color.white,
  },
  ...paginationButtonBase,
])

export const paginationButtonDisabled = style([
  {
    fill: color.primarySolid,
    background: color.grayThin,
  },
  ...paginationButtonBase,
])

export const paginationButtonEllipsis = style([
  {
    fill: color.navy,
    background: color.white,
  },
  ...paginationButtonBase,
])
