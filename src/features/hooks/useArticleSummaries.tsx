import { ArticleSummary } from '@/models/ArticleSummary'
import {
  Decoder,
  array,
  object,
  string,
  number,
} from '@mojotech/json-type-validation'

export const useArticleSummaries = async (): Promise<ArticleSummary[]> => {
  const res = await fetch('https://matumoto1234.com/articles/list.json')

  const articleSummariesDecoder: Decoder<ArticleSummary[]> = array(
    object({
      title: string(),
      date: number().map((x) => new Date(x)),
      summaryBody: string(),
      articleId: string(),
    })
  )

  const articleSummaries = await articleSummariesDecoder.runPromise(await res.json())
  return articleSummaries
}
