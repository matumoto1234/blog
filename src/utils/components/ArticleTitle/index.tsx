import { articleTitle } from "./index.css"

export const ArticleTitle: React.FC<{
  children: string
}> = ({ children }) => {
  return (
    <div className={articleTitle}>
      {children}
    </div>
  )
}