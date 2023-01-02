import { getArticle } from '@/api/getArticle'
import { NavBar } from '@/utils/components/NavBar'
import { Article } from '@/models/Article'
import { ArticleTitle } from '@/utils/components/ArticleTitle'
import { ArticleTitleSkeleton } from '@/utils/components/ArticleTitle/skeleton'
import { Comments } from '@/utils/components/Comments'
import { CopyRight } from '@/utils/components/CopyRight'
import { Footer } from '@/utils/components/Footer'
import { MarkdownViewer } from '@/utils/components/MarkdownViewer'
import { MarkdownViewerSkeleton } from '@/utils/components/MarkdownViewer/skeleton'
import { Page } from '@/utils/components/Page'
import { Spacer } from '@/utils/components/Spacer'
import { VStack } from '@/utils/components/Stack'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { articleTag } from './index.css'
import { ErrorKind, ErrorWrapper, isErrorWrapper } from '@/api/errors'

const useArticlePage = (): {
  article: Article | undefined
  loading: boolean
  notFound: boolean
} => {
  const [article, setArticle] = useState<Article>()
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const { articleId } = useParams()

  useEffect(() => {
    const fetcher = async (articleId: string): Promise<void> => {
      setLoading(true)
      const res = await getArticle(articleId)
      if (isErrorWrapper(res)) {
        switch (res.kind) {
          case ErrorKind.NotFound:
            setArticle({
              title: 'お探しの記事は見つかりませんでした',
              date: new Date(),
              markdownText: '## 内容がないよう；；',
            })
            setNotFound(true)
        }
      } else {
        setArticle(res)
      }
      setLoading(false)
    }

    if (articleId) {
      fetcher(articleId).catch((e) => console.error(e))
    }
  }, [articleId])

  return {
    article,
    loading,
    notFound,
  }
}

export const ArticlePage: React.FC = () => {
  const { article, loading } = useArticlePage()

  if (loading || !article) {
    return (
      <div>
        <NavBar />
        <Page title="loading">
          <main>
            <VStack style={{ alignItems: 'center' }}>
              <Spacer size={64} />
              <ArticleTitleSkeleton />
              <Spacer size={64} />
              <MarkdownViewerSkeleton />
              <Spacer size={80} />
            </VStack>
          </main>
        </Page>
        <Footer>
          <CopyRight />
        </Footer>
      </div>
    )
  }

  return (
    <div>
      <NavBar />
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
            <Comments />
          </VStack>
        </main>
      </Page>
      <Footer>
        <CopyRight />
      </Footer>
    </div>
  )
}
