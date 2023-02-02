import { CopyRight } from '@/utils/components/CopyRight'
import { Footer } from '@/utils/components/Footer'
import { NavBar } from '@/utils/components/NavBar'
import { Page } from '@/utils/components/Page'

export const NotFoundPage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Page title="404 Not Found">
        <h1>404 Not Found</h1>
      </Page>
      <Footer>
        <CopyRight />
      </Footer>
    </div>
  )
}
