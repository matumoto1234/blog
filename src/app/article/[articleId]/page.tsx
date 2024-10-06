import { ArticleTitle } from 'utils/components/ArticleTitle'
import { Comments } from 'utils/components/Comments'
import { MarkdownViewer } from 'utils/components/MarkdownViewer'
import { Page } from 'utils/components/Page'
import { Spacer } from 'utils/components/Spacer'
import { VStack } from 'utils/components/Stack'
import { articleTag } from './page.css'
import { useArticle } from '@/features/hooks/useArticle'
import { Article } from '@/models/Article'
import { useArticleSummaries } from '@/features/hooks/useArticleSummaries'

const useArticlePage = async (articleId: string): Promise<Article> => {
  return useArticle(articleId)
}

type ArticlePageProps = {
  params: Params
}

const ArticlePage: React.FC<ArticlePageProps> = async ({
  params: { articleId },
}) => {
  const article = await useArticlePage(articleId)

  return (
    <div>
      <Page title={article.title}>
        <main>
          <VStack style={{ alignItems: 'center' }}>
            <Spacer size={64} />
            <ArticleTitle>{article.title}</ArticleTitle>
            <Spacer size={64} />
            <article className={articleTag}>
              <MarkdownViewer markdownText={article.markdownText} />
            </article>
            <Spacer size={80} />
          </VStack>
        </main>
        <Comments title={article.title} articleId={articleId} />
      </Page>
    </div>
  )
}

export default ArticlePage

type Params = {
  articleId: string
}

export const generateStaticParams = async (): Promise<Params[]> => {
  const articleSummaries = await useArticleSummaries()

  return articleSummaries.map((summary) => {
    return {
      articleId: summary.articleId,
    }
  })
}
