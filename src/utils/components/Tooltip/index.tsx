import { useState } from 'react'
import { container, tooltip } from './index.css'

type TooltipProps = {
  children: React.ReactNode
  label: React.ReactNode
}

export const Tooltip: React.FC<TooltipProps> = ({ children, label }) => {
  return (
    <div className={container}>
      <div>{children}</div>
      <div className={tooltip}>{label}</div>
    </div>
  )
}
