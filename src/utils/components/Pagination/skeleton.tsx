import { ContentLoaderWrapper } from '../ContentLoaderWrapper'
import { HStack } from '../Stack'

const PaginationButtonSkeleton: React.FC = () => {
  return (
    <ContentLoaderWrapper
      props={{
        width: 48,
        height: 48,
      }}
    >
      <rect rx="4" ry="4" width="48" height="48" />
    </ContentLoaderWrapper>
  )
}

export const PaginationSkeleton: React.FC = () => {
  return (
    <HStack style={{ gap: 24 }}>
      <PaginationButtonSkeleton />
      <PaginationButtonSkeleton />
      <PaginationButtonSkeleton />
    </HStack>
  )
}
