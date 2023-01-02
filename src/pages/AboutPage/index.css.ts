import { fontSize, fontWeight, lineHeight } from '@/utils/styles/text.css'
import { color } from '@/utils/styles/variables.css'
import { style } from '@vanilla-extract/css'

export const name = style([fontSize.px40, fontWeight.bold, lineHeight.per150])

export const articleTag = style({
  width: '100%',
})
