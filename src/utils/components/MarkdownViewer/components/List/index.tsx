import classNames from 'classnames'
import { li, ul } from './index.css'

export const Ul: React.FC<{
  children: React.ReactNode & React.ReactNode[]
  className?: string
}> = ({ children, className }) => {
  return <ul className={classNames(className, ul)}>{children}</ul>
}

export const Li: React.FC<{
  children: React.ReactNode & React.ReactNode[]
  className?: string
}> = ({ children, className }) => {
  return <li className={classNames(className, li)}>{children}</li>
}
