import classNames from 'classnames'
import { blockquote } from './index.css'

export const Blockquote: React.FC<{
  children: React.ReactNode & React.ReactNode[]
  className?: string
}> = ({ children, className }) => {
  return (
    <blockquote className={classNames(className, blockquote)}>
      {children}
    </blockquote>
  )
}
