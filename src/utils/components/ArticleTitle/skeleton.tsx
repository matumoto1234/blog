import { ContentLoaderWrapper } from '../ContentLoaderWrapper'

export const ArticleTitleSkeleton: React.FC = () => {
  return (
    <ContentLoaderWrapper
      props={{
        height: 80,
        width: '100%',
      }}
    >
      <rect x="0" y="0" rx="4" ry="4" width="100%" height="80" />
    </ContentLoaderWrapper>
  )
}
