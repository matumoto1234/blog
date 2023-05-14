import { ArticleTitle } from '@/utils/components/ArticleTitle'
import { CopyRight } from '@/utils/components/CopyRight'
import { Footer } from '@/utils/components/Footer'
import { MarkdownEditor } from '@/utils/components/MarkdownEditor'
import { NavBar } from '@/utils/components/NavBar'
import { Page } from '@/utils/components/Page'
import { Spacer } from '@/utils/components/Spacer'
import { VStack } from '@/utils/components/Stack'
import { useState } from 'react'

export const EditorPage = () => {
  const [articleTitle, setArticleTitle] = useState('')

  return (
    <div>
      <NavBar />
      <Page title="Editor">
        <main>
          <VStack style={{ alignItems: 'center' }}>
            <Spacer size={64} />
            <input
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
            />
            <ArticleTitle placeholder='ここにタイトルを入力'>{articleTitle}</ArticleTitle>
            <Spacer size={64} />
            <MarkdownEditor />
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
