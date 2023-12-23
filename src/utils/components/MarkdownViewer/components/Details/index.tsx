import classNames from 'classnames'
import { details } from './index.css'

export const Details: React.FC<{
  children: React.ReactNode & React.ReactNode[]
  className?: string
}> = ({ children, className }) => {
  return (
    <details className={classNames(className, details)}>{children}</details>
  )
}
