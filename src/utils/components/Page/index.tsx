import { Helmet } from 'react-helmet-async'
import { page, pageInner } from './index.css'
import { getOrigin, getPathName } from '@/Router'
import urlJoin from 'url-join'

export const Page: React.FC<{
  children: React.ReactNode
  title: string
}> = ({ children, title }) => {
  return (
    <div className={page}>
      <Helmet
        title={title}
      />
      <div className={pageInner}>{children}</div>
    </div>
  )
}
