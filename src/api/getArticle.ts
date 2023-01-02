import { Article } from '@/models/Article'
import { extractMetaData, getBody } from '@/utils/lib/markdown'
import { ErrorKind, ErrorWrapper } from './errors'

export const getArticle = async (
  articleId: string
): Promise<Article | ErrorWrapper> => {
  // TODO: 本当はAPIを叩く
  const res = await fetch(`/articles/${articleId}/index.md`)

  switch (res.status) {
    case 404:
      return {
        error: new Error('Not Found'),
        kind: ErrorKind.NotFound,
      }
  }

  const text = await res.text()
  const metaData = await extractMetaData(text)
  const markdownText = getBody(text)

  return {
    title: metaData.title,
    date: metaData.date,
    markdownText,
  }
}
