import { useArticleSummaries } from '@/features/hooks/useArticleSummaries'
import HomePage from './HomePage'

const HomePageContainer = async () => {
  const articleSummaries = await useArticleSummaries()

  return <HomePage articleSummaries={articleSummaries} />
}

export default HomePageContainer
