import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import { Anchor } from './components/Anchor'
import { Code } from './components/Code'
import { Del } from './components/Del'
import { Em } from './components/Em'
import { H1, H2, H3, H4, H5, H6 } from './components/Heading'
import { Li, Ul } from './components/List'
import { Paragraph } from './components/Paragraph'
import { Pre } from './components/Pre'
import { Table, Td, Th } from './components/Table'
import { markdownViewer } from './index.css'
import { Img } from './components/Img'
import rehypeRaw from 'rehype-raw'
import { Blockquote } from './components/Blockquote'
import { Details } from './components/Details'
import { Summary } from './components/Summary'

export const MarkdownViewer: React.FC<{
  markdownText: string
}> = ({ markdownText }) => {
  return (
    <ReactMarkdown
      className={markdownViewer}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        p: Paragraph,
        pre: Pre,
        code: Code,
        em: Em,
        del: Del,
        li: Li,
        ul: Ul,
        a: Anchor,
        table: Table,
        th: Th,
        td: Td,
        img: Img,
        blockquote: Blockquote,
        details: Details,
        summary: Summary,
      }}
    >
      {markdownText}
    </ReactMarkdown>
  )
}
