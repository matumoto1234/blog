import { getArticle } from '@/api/getArticle'
import { NavBar } from '@/utils/components/NavBar'
import { CopyRight } from '@/utils/components/CopyRight'
import { Footer } from '@/utils/components/Footer'
import { MatumotoIcon } from '@/utils/components/Icon'
import { MarkdownViewer } from '@/utils/components/MarkdownViewer'
import { Page } from '@/utils/components/Page'
import { SNSLinkList } from '@/utils/components/SNSLinkList'
import { Spacer } from '@/utils/components/Spacer'
import { VStack } from '@/utils/components/Stack'
import { useEffect, useState } from 'react'
import { articleTag, name } from './index.css'
import { MarkdownViewerSkeleton } from '@/utils/components/MarkdownViewer/skeleton'
import { ErrorKind, isErrorWrapper } from '@/api/errors'

const useAboutPage = (): {
  markdownText: string | undefined
  loading: boolean
} => {
  const [markdownText, setMarkdownText] = useState<string>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetcher = async (): Promise<void> => {
      setLoading(true)
      const res = await getArticle('about')
      if (isErrorWrapper(res)) {
        switch (res.kind) {
          case ErrorKind.NotFound:
            setMarkdownText(
              '**自己紹介ファイルがなかったので自己紹介はありません!代わりにSNSとかを見てね!**'
            )
        }
      } else {
        setMarkdownText(res.markdownText)
      }
      setLoading(false)
    }

    fetcher().catch((e) => console.log(e))
  }, [])

  return {
    markdownText,
    loading,
  }
}

export const AboutPage: React.FC = () => {
  const { markdownText } = useAboutPage()

  if (!markdownText) {
    return (
      <div>
        <NavBar />
        <Page title="About">
          <main>
            <VStack style={{ alignItems: 'center' }}>
              <Spacer size={80} />
              <MatumotoIcon />
              <div className={name}>matumoto</div>
              <Spacer size={24} />
              <SNSLinkList />
              <Spacer size={64} />
              <article className={articleTag}>
                <MarkdownViewerSkeleton />
              </article>
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
      <Page title="About">
        <main>
          <VStack style={{ alignItems: 'center' }}>
            <Spacer size={80} />
            <MatumotoIcon />
            <div className={name}>matumoto</div>
            <Spacer size={24} />
            <SNSLinkList />
            <Spacer size={64} />
            <article className={articleTag}>
              <MarkdownViewer markdownText={markdownText} />
            </article>
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
