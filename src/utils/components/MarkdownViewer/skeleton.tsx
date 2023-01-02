import { ContentLoaderWrapper } from '../ContentLoaderWrapper'

export const MarkdownViewerSkeleton: React.FC = () => {
  return (
    <ContentLoaderWrapper
      props={{
        height: 700,
        width: '100%',
      }}
    >
      <rect x="0" y="0" rx="4" ry="4" width="960" height="1000" />
    </ContentLoaderWrapper>
  )
}
