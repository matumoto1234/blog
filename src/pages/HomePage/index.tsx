import { getArticleSummaryList } from '@/api/getArticleSummaryList'
import { ArticleCardList } from '@/components/ArticleCard'
import { NavBar } from '@/utils/components/NavBar'
import {
  ArticleSummary,
  createEmptyArticleSummary,
} from '@/models/ArticleSummary'
import { CopyRight } from '@/utils/components/CopyRight'
import { Footer } from '@/utils/components/Footer'
import { Page } from '@/utils/components/Page'
import { Pagination } from '@/utils/components/Pagination'
import { Spacer } from '@/utils/components/Spacer'
import { VStack } from '@/utils/components/Stack'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { articleListVStack } from './index.css'
import { ArticleCardListSkeleton } from '@/components/ArticleCard/skeleton'
import { PaginationSkeleton } from '@/utils/components/Pagination/skeleton'

const useHomePage = (): {
  articleList?: ArticleSummary[]
  loading: boolean
} => {
  const [articleList, setArticleList] = useState<ArticleSummary[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetcher = async (): Promise<void> => {
      setLoading(true)
      setArticleList(await getArticleSummaryList())
      setLoading(false)
    }

    fetcher().catch((e) => console.log(e))
  }, [])

  return {
    articleList,
    loading,
  }
}

export const HomePage: React.FC = () => {
  const { articleList } = useHomePage()

  const params = new URLSearchParams(useLocation().search)
  const [currentPage, setCurrentPage] = useState(
    parseInt(params.get('page') || '1')
  )

  if (!articleList) {
    return (
      <div>
        <NavBar />
        <Page title="Home">
          <main>
            <VStack style={{ alignItems: 'center' }}>
              <Spacer size={64} />
              <ArticleCardListSkeleton />
              <Spacer size={64} />
              <PaginationSkeleton />
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

  const perPage = 4 // article per page
  const pageCount = Math.ceil(articleList.length / perPage)

  // 記事要素の数がページングによって変化しないように
  // perPageの倍数になるまでダミー要素を追加する
  const paddedArticleList = articleList.concat(
    new Array(perPage - (articleList.length % perPage)).fill(
      createEmptyArticleSummary()
    )
  )

  const pagedArticleList = paddedArticleList.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  const buttonCount = 7 // 短すぎず長すぎない奇数のボタン数

  const onPageChange = (page: number): void => {
    setCurrentPage(page)
  }

  return (
    <div>
      <NavBar />
      <Page title="Home">
        <main>
          <VStack style={{ alignItems: 'center' }}>
            <Spacer size={64} />
            <ArticleCardList articleList={pagedArticleList} />
            <Spacer size={64} />
            <Pagination
              current={currentPage}
              pageCount={pageCount}
              buttonCount={buttonCount}
              onPageChange={onPageChange}
            />
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
