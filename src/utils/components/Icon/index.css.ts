import { color } from 'utils/styles/variables.css'
import { style } from '@vanilla-extract/css'

const iconBase = {
  height: '40px',
  width: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const notificationIcon = style({
  ...iconBase,
})

export const pinActiveIcon = style({
  ...iconBase,
  fill: color.navy,
})

export const pinOffIcon = style({
  ...iconBase,
  fill: color.gray,
})

export const chevronLeftIcon = style({
  ...iconBase,
})

export const chevronLeftIconDisabled = style({
  ...iconBase,
})

export const chevronRightIcon = style({
  ...iconBase,
})

export const chevronRightIconDisabled = style({
  ...iconBase,
})

export const ellipsisIcon = style({
  ...iconBase,
})

export const matumotoIcon = style({
  height: '200px',
  width: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const twitterIcon = style({
  ...iconBase,
})

export const githubIcon = style({
  ...iconBase,
})

export const speakerDeckIcon = style({
  ...iconBase,
})

export const qiitaIcon = style({
  ...iconBase,
})

export const hatenaIcon = style({
  ...iconBase,
})

export const connpassIcon = style({
  ...iconBase,
})

export const zennIcon = style({
  ...iconBase,
})

export const atcoderIcon = style({
  ...iconBase,
})
