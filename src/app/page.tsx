import { useArticleSummaries } from '@/features/hooks/useArticleSummaries'
import { useHomePage } from './useHomePage'
import HomePage from './HomePage'

const HomePageContainer = async () => {
  const articleSummaries = await useArticleSummaries()

  const { page, pageCount, buttonCount, pagedArticleSummaries, onPageChange } =
    await useHomePage(articleSummaries)

  return (
    <HomePage
      page={page}
      pageCount={pageCount}
      pagedArticleSummaries={pagedArticleSummaries}
      paginationButtonCount={buttonCount}
      onPageChange={onPageChange}
    />
  )
}

export default HomePageContainer
