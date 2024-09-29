import { ArticleSummary } from 'models/ArticleSummary'
import { VStack } from 'utils/components/Stack'
import {
  articleCard,
  articleCardEmpty,
  articleCardList,
  body,
  date,
  title,
} from './index.css'
import Link from 'next/link'

const dateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 0-indexed to 1-indexed
  const day = date.getDate()
  return `${year}/${month}/${day}`
}

const ArticleCard: React.FC<{
  article: ArticleSummary
}> = ({ article }) => {
  return (
    <section className={articleCard}>
      <VStack style={{ gap: 12 }}>
        <VStack>
          <div className={title}>{article.title}</div>
          <div className={date}>{dateToString(article.date)}</div>
        </VStack>
        <div className={body}>{article.summaryBody}</div>
      </VStack>
    </section>
  )
}

export const ArticleCardList: React.FC<{
  articleSummaries: ArticleSummary[]
}> = ({ articleSummaries: articleList }) => {
  return (
    <VStack className={articleCardList} style={{ gap: 32 }}>
      {articleList.map((article, i) => {
        if (article.isEmpty) {
          return <div className={articleCardEmpty} key={i} />
        }
        return (
          <Link href={`/article/${article.articleId}`} key={i}>
            <ArticleCard article={article} />
          </Link>
        )
      })}
    </VStack>
  )
}
