import classNames from 'classnames'
import { anchor } from './index.css'

export const Anchor: React.FC<{
  children: React.ReactNode & React.ReactNode[]
  className?: string
  href?: string
  id?: string
}> = ({ children, className, href, id }) => {
  return (
    <a className={classNames(className, anchor)} href={href} id={id}>
      {children}
    </a>
  )
}
