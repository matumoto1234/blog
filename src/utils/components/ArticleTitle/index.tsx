import { articleTitle, articleTitlePlaceHolder } from './index.css'

export const ArticleTitle: React.FC<{
  children: string
  placeholder?: string
}> = ({ children, placeholder }) => {
  if (children === '' && placeholder) {
    return <div className={articleTitlePlaceHolder}>{placeholder}</div>
  }
  return <div className={articleTitle}>{children}</div>
}
