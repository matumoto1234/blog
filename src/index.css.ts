import { globalStyle } from '@vanilla-extract/css'
import { color } from './utils/styles/variables.css'

globalStyle(':root', {
  background: color.primarySolidThinNormal,
  fontFamily: 'noto-sans-jp, sans-serif',
  color: color.navy,
  minHeight: '100vh'
})

globalStyle('body', {
  margin: 0,
})

globalStyle('a', {
  textDecoration: 'none',
})

globalStyle(':-webkit-any-link', {
  color: 'initial',
})
