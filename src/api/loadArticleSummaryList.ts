import { ArticleSummary } from 'models/ArticleSummary'

import {
  Decoder,
  array,
  object,
  string,
  number,
} from '@mojotech/json-type-validation'

const articleListDecoder: Decoder<ArticleSummary[]> = array(
  object({
    title: string(),
    date: number().map((x) => new Date(x)),
    summaryBody: string(),
    articleId: string(),
  })
)

export const loadArticleSummaryList = async (): Promise<ArticleSummary[]> => {
  // TODO: 本当はAPIを叩く
  const res = await fetch('/articles/list.json')
  const data = await articleListDecoder.runPromise(await res.json())

  return data
}
