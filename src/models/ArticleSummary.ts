export type ArticleSummary = {
  title: string
  date: Date
  summaryBody: string
  articleId: string
  isEmpty?: boolean
}

export const createEmptyArticleSummary = (): ArticleSummary => {
  return {
    title: '',
    date: new Date(),
    summaryBody: '',
    articleId: '',
    isEmpty: true,
  }
}
