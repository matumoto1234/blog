'use client'
import { ArticleCardList } from '@/features/components/ArticleCard'
import { CopyRight } from 'utils/components/CopyRight'
import { Footer } from 'utils/components/Footer'
import { Page } from 'utils/components/Page'
import { Pagination } from 'utils/components/Pagination'
import { Spacer } from 'utils/components/Spacer'
import { VStack } from 'utils/components/Stack'
import {
  ArticleSummary,
  createEmptyArticleSummary,
} from '@/models/ArticleSummary'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const useHomePage = (articleSummaries: ArticleSummary[]) => {
  const params: ReadonlyURLSearchParams =
    useSearchParams() ?? new ReadonlyURLSearchParams()

  const page = parseInt(params.get('page') ?? '1')
  const perPage = parseInt(params.get('per_page') ?? '6')
  const pageCount = Math.ceil(articleSummaries.length / perPage)

  // 記事要素の数がページングによって変化しないように
  // perPageの倍数になるまでダミー要素を追加する
  const paddedArticleSummaries = articleSummaries.concat(
    new Array(perPage - (articleSummaries.length % perPage)).fill(
      createEmptyArticleSummary()
    )
  )

  const pagedArticleSummaries = paddedArticleSummaries.slice(
    (page - 1) * perPage,
    page * perPage
  )

  const buttonCount = 7 // 短すぎず長すぎない奇数のボタン数

  const router = useRouter()

  const onPageChange = (newPage: number): void => {
    router.push(`/?page=${newPage}&per_page=${perPage}`)
  }

  return {
    page,
    pageCount,
    buttonCount,
    pagedArticleSummaries,
    onPageChange,
  }
}

type HomePageProps = {
  articleSummaries: ArticleSummary[]
}

const HomePage: React.FC<HomePageProps> =({ articleSummaries }) => {
  const {
    page,
    pageCount,
    buttonCount: paginationButtonCount,
    pagedArticleSummaries,
    onPageChange,
  } = useHomePage(articleSummaries)

  return (
    <div>
      <Page title="Home">
        <main>
          <VStack style={{ alignItems: 'center' }}>
            <Spacer size={64} />
            <ArticleCardList articleSummaries={pagedArticleSummaries} />
            <Spacer size={64} />
            <Pagination
              current={page}
              pageCount={pageCount}
              buttonCount={paginationButtonCount}
              onPageChange={onPageChange}
            />
            <Spacer size={80} />
          </VStack>
        </main>
      </Page>
    </div>
  )
}

export default HomePage
