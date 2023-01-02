import classNames from 'classnames'
import { header } from './index.css'

export const Header: React.FC<{
  children: React.ReactNode
  className: string
}> = ({ children, className }) => {
  return <header className={classNames(header, className)}>{children}</header>
}
