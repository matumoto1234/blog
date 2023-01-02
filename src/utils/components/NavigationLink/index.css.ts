import { style } from '@vanilla-extract/css'
import { fontSize, fontWeight, lineHeight } from '../../styles/text.css'
import { color } from '../../styles/variables.css'

export const navigationLink = style([
  fontSize.px20,
  fontWeight.bold,
  lineHeight.per150,
  {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '0 16px',
    textDecorationLine: 'none',
    color: color.navy,
    selectors: {
      '&:hover': {
        color: color.primarySolid,
      },
    },
    transition: 'all 0.2s',
  },
])

export const navigationLinkUnderLine = style({
  width: '100%',
  height: '3px',
  background: color.primarySolid,
  borderRadius: '0.75px',
})
