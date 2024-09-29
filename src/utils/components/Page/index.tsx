import { page, pageInner } from './index.css'

export const Page: React.FC<{
  children: React.ReactNode
  title: string
}> = ({ children, title }) => {
  return (
    <div className={page}>
      <div className={pageInner}>{children}</div>
    </div>
  )
}
