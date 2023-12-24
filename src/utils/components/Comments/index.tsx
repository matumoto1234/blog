import { DiscussionEmbed } from 'disqus-react'
import { useParams } from 'react-router-dom'

type CommentsProps = {
  title: string
}

export const Comments: React.FC<CommentsProps> = ({ title }) => {
  const { articleId } = useParams()

  const disqusConfig = {
    url: window.location.href,
    title,
    identifier: articleId,
  }

  return (
    <>
      <DiscussionEmbed shortname="matumoto1234-com" config={disqusConfig} />
      <noscript>
        Please enable JavaScript to view the
        <a href="https://disqus.com/?ref_noscript">
          comments powered by Disqus.
        </a>
      </noscript>
    </>
  )
}
