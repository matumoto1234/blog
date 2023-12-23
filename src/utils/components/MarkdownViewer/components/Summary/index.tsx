import classNames from 'classnames'
import { summary } from './index.css'

export const Summary: React.FC<{
  children: React.ReactNode & React.ReactNode[]
  className?: string
}> = ({ children, className }) => {
  return (
    <summary className={classNames(className, summary)}>{children}</summary>
  )
}
