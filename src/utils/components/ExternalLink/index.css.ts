import { style } from '@vanilla-extract/css'
import { fontSize, fontWeight, lineHeight } from '@/utils/styles/text.css'

export const externalLink = style([
  fontSize.px14,
  fontWeight.normal,
  lineHeight.per150,
])
