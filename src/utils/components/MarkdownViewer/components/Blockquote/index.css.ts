import { color } from 'utils/styles/variables.css'
import { style } from '@vanilla-extract/css'

export const blockquote = style({
  color: color.gray,
  padding: '0px 32px',
  margin: '1.5em 0',
  position: 'relative',

  '::before': {
    content: '""',
    top: 0,
    left: 0,
    height: '100%',
    width: '4px',
    position: 'absolute',
    display: 'inline-block',
    backgroundColor: color.grayThin,
    borderRadius: '4px',
  },
})
