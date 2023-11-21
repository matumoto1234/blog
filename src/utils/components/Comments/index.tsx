import { DiscussionEmbed } from 'disqus-react'

type CommentsProps = {
  title: string
}

export const Comments: React.FC<CommentsProps> = ({ title }) => {
  const crumbs = window.location.pathname.split('/')

  const disqusConfig = {
    url: window.location.href,
    title,
    identifier: crumbs[crumbs.length - 1],
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
