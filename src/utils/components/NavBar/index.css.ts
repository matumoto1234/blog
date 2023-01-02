import { color } from '@/utils/styles/variables.css'
import { style } from '@vanilla-extract/css'

export const navBar = style({
  height: '64px',
  width: '100%',
  background: color.white,
})

export const stickyNavBar = style({
  height: '64px',
  width: '100%',
  background: color.white,
  position: 'sticky',
  top: '0',
})

export const navBarItemContainer = style({
  height: '100%',
})

export const navLinkList = style({
  height: '100%',
})

export const navLink = style({
  height: '100%',
})

export const pinIconButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0',
})
