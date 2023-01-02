import { fontSize, fontWeight, lineHeight } from '@/utils/styles/text.css'
import { color } from '@/utils/styles/variables.css'
import { style } from '@vanilla-extract/css'

export const copyRight = style([
  fontSize.px16,
  fontWeight.medium,
  lineHeight.per150,
  {
    color: color.gray,
  },
])
