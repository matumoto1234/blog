import { NavLink } from 'react-router-dom'
import { navigationLink, navigationLinkUnderLine } from './index.css'

export const NavigationLink: React.FC<{
  active?: boolean
  to: string
  children: string
  className?: string
}> = ({ active, to, children, className }) => {
  return (
    <div className={className}>
      <NavLink className={navigationLink} to={to}>
        {children}
      </NavLink>
      {active && <div className={navigationLinkUnderLine} />}
    </div>
  )
}
