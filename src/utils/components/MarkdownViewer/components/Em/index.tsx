import classNames from 'classnames'
import { em } from './index.css'

export const Em: React.FC<{
  children: React.ReactNode & React.ReactNode[]
  className?: string
}> = ({ className, children }) => {
  return <em className={classNames(className, em)}>{children}</em>
}
