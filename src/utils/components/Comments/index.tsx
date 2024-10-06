'use client'

import { DiscussionEmbed } from 'disqus-react'

type CommentsProps = {
  title: string
  articleId: string
}

export const Comments: React.FC<CommentsProps> = ({ title, articleId }) => {
  const disqusConfig = {
    url: `https://matumoto1234.com/article/${articleId}`,
    title,
    identifier: articleId,
  }

  return <DiscussionEmbed shortname="matumoto1234-com" config={disqusConfig} />
}
