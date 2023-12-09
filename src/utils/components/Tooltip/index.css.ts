import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from '@/utils/styles/text.css'
import { color } from '@/utils/styles/variables.css'
import { style } from '@vanilla-extract/css'

export const container = style({
  position: 'relative',
  width: 'fit-content',
})

export const tooltip = style([
  fontSize.px16,
  fontWeight.medium,
  lineHeight.per150,
  {
    opacity: 0,
    visibility: 'hidden',

    position: 'absolute',
    zIndex: 1,
    color: color.white,
    background: color.navy,
    padding: '4px 8px',
    borderRadius: '4px',
    width: 'max-content',
    top: 'calc(100% + 4px)',
    left: '50%',
    transform: 'translateX(-50%)',
    transition: '0.3s ease-in',

    selectors: {
      /* containerがホバーされたときに表示 */
      [`${container}:hover &`]: {
        opacity: 1,
        visibility: 'visible',
      },
    },
  },
])
