import { lineHeight } from 'utils/styles/text.css'
import { color } from 'utils/styles/variables.css'
import { style } from '@vanilla-extract/css'

export const markdownViewer = style({
  minHeight: '700px',
  background: color.white,
  padding: '32px',
  borderRadius: 12,
  lineBreak: 'normal',
})
