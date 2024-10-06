import { Article } from '@/models/Article'
import { extractMetaData, getBody } from '@/utils/lib/markdown'

export const useArticle = async (articleId: string): Promise<Article> => {
  const res = await fetch(`https://matumoto1234.com/articles/${articleId}/index.md`)

  const text = await res.text()
  const metaData = await extractMetaData(text)
  const markdownText = getBody(text)

  return {
    title: metaData.title,
    date: metaData.date,
    markdownText,
  }
}
