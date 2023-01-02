import { ArticleSummary } from '@/models/ArticleSummary'
import { VStack } from '@/utils/components/Stack'
import { Link } from 'react-router-dom'
import {
  articleCard,
  articleCardEmpty,
  articleCardList,
  body,
  date,
  title,
} from './index.css'

const dateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth()
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
  articleList: ArticleSummary[]
}> = ({ articleList }) => {
  return (
    <VStack className={articleCardList} style={{ gap: 32 }}>
      {articleList.map((article, i) => {
        if (article.isEmpty) {
          return <div className={articleCardEmpty} key={i} />
        }
        return (
          <Link to={`/article/${article.articleId}`} key={i}>
            <ArticleCard article={article} />
          </Link>
        )
      })}
    </VStack>
  )
}
