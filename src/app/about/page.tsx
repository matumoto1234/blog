import { MarkdownViewer } from 'utils/components/MarkdownViewer'
import { Page } from 'utils/components/Page'
// import { SNSLinkList } from '@/utils/components/SNSLinkList'
import { Spacer } from 'utils/components/Spacer'
import { VStack } from 'utils/components/Stack'
import { articleTag, name } from './page.css'
import Image from 'next/image'
import { useArticle } from '@/features/hooks/useArticle'

const useAboutPage = async (): Promise<string> => {
  const article = await useArticle('about')
  return article.markdownText
}

const AboutPage: React.FC = async () => {
  const markdownText = await useAboutPage()

  return (
    <div>
      <Page title="About">
        <main>
          <VStack style={{ alignItems: 'center' }}>
            <Spacer size={80} />
            <Image
              src="/icons/matumoto.svg"
              alt="matumoto icon"
              width={200}
              height={200}
            />
            <Spacer size={80} />
            <div className={name}>matumoto</div>
            <Spacer size={24} />
            {/* <SNSLinkList /> */}
            <Spacer size={64} />
            <article className={articleTag}>
              <MarkdownViewer markdownText={markdownText} />
            </article>
            <Spacer size={80} />
          </VStack>
        </main>
      </Page>
    </div>
  )
}

export default AboutPage
