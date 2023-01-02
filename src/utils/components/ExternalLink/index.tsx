import { ReactNode } from 'react'
import { externalLink } from './index.css'

export const ExternalLink: React.FC<{
  children: ReactNode
  to: string
}> = ({ children, to }) => {
  return (
    <a className={externalLink} href={to}>
      {children}
    </a>
  )
}
