import classNames from 'classnames'
import { paragraph } from './index.css'

export const Paragraph: React.FC<{
  children: React.ReactNode & React.ReactNode[]
  className?: string
}> = ({ children, className }) => {
  return <p className={classNames(className, paragraph)}>{children}</p>
}
