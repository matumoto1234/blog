import { lineHeight } from 'utils/styles/text.css'
import { style } from '@vanilla-extract/css'

export const ul = style([
  lineHeight.per250,
  {
    listStyleType: 'disc',
    listStylePosition: 'inside',
    margin: '32px 0px',
    paddingInlineStart: '10px',
    selectors: {
      'li &': {
        margin: '0px',
        marginLeft: '2rem',
      },
    },
  },
])

export const li = style([
  lineHeight.per250,
  {
    margin: '24px 8px',
  },
])
