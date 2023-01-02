import classNames from 'classnames'
import { del } from './index.css'

export const Del: React.FC<{
  children: React.ReactNode & React.ReactNode[]
  className?: string
}> = ({ children, className }) => {
  return <del className={classNames(className, del)}>{children}</del>
}
