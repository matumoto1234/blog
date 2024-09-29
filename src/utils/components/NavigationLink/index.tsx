import Link from 'next/link'
import { navigationLink, navigationLinkUnderLine } from './index.css'

export const NavigationLink: React.FC<{
  active?: boolean
  to: string
  children: string
  className?: string
}> = ({ active, to, children, className }) => {
  return (
    <div className={className}>
      <Link className={navigationLink} href={to}>
        {children}
      </Link>
      {active && <div className={navigationLinkUnderLine} />}
    </div>
  )
}
