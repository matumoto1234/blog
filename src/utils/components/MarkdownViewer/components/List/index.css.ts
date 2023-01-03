import { style } from '@vanilla-extract/css'

export const ul = style({
  listStyleType: 'disc',
  listStylePosition: 'inside',
  margin: '20px 0px',
  paddingInlineStart: '10px',
  selectors: {
    'li &': {
      margin: '0px',
      marginLeft: '2rem',
    },
  },
})

export const li = style({
  margin: '8px',
})
