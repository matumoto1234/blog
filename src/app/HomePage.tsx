import { ArticleCardList } from '@/features/components/ArticleCard'
import { NavBar } from 'utils/components/NavBar'
import { CopyRight } from 'utils/components/CopyRight'
import { Footer } from 'utils/components/Footer'
import { Page } from 'utils/components/Page'
import { Pagination } from 'utils/components/Pagination'
import { Spacer } from 'utils/components/Spacer'
import { VStack } from 'utils/components/Stack'
import { ArticleSummary } from '@/models/ArticleSummary'

type HomePageProps = {
  page: number;
  pageCount: number;
  pagedArticleSummaries: ArticleSummary[];
  paginationButtonCount: number;
  onPageChange: (page: number) => void
}

const HomePage: React.FC<HomePageProps> = async ({
  page,
  pageCount,
  pagedArticleSummaries,
  paginationButtonCount,
  onPageChange,
}) => {

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
      <Footer>
        <CopyRight />
      </Footer>
    </div>
  )
}

export default HomePage
