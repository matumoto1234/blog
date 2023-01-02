import classNames from 'classnames'
import { anchor } from './index.css'

export const Anchor: React.FC<{
  children: React.ReactNode & React.ReactNode[]
  className?: string
  href?: string
}> = ({ children, className, href }) => {
  return (
    <a className={classNames(className, anchor)} href={href}>
      {children}
    </a>
  )
}
