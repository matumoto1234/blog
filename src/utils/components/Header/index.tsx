import classNames from 'classnames'
import { header } from './index.css'

type Props = {
  children: React.ReactNode
  className: string
}

export const Header = ({ children, className }: Props) => {
  return <header className={classNames(header, className)}>{children}</header>
}
