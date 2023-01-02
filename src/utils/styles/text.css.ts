import { style } from '@vanilla-extract/css'

export const fontSize = {
  px8: style({
    fontSize: '8px',
  }),
  px10: style({
    fontSize: '10px',
  }),
  px12: style({
    fontSize: '12px',
  }),
  px14: style({
    fontSize: '14px',
  }),
  px16: style({
    fontSize: '16px',
  }),
  px20: style({
    fontSize: '20px',
  }),
  px24: style({
    fontSize: '24px',
  }),
  px32: style({
    fontSize: '32px',
  }),
  px40: style({
    fontSize: '40px',
  }),
}

export const lineHeight = {
  per150: style({
    lineHeight: '150%',
  }),
  per175: style({
    lineHeight: '175%',
  }),
  per200: style({
    lineHeight: '200%',
  }),
  per250: style({
    lineHeight: '250%',
  }),
}

// これに基づいた命名 : https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_mapping
export const fontWeight = {
  normal: style({
    fontWeight: 400,
  }),
  medium: style({
    fontWeight: 500,
  }),
  semiBold: style({
    fontWeight: 600,
  }),
  bold: style({
    fontWeight: 700,
  }),
}

export const fontFamily = {
  normal: style({
    fontFamily: 'sans-serif',
  }),
  monospace: style({
    fontFamily: 'monospace',
  }),
}
