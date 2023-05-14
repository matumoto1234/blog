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
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content={urlJoin(getOrigin(), getPathName())} />
        <meta property="og:site_name" content="matumoto's blog" />
        <meta property="og:description" content="matumotoのブログ" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <div className={pageInner}>{children}</div>
    </div>
  )
}
