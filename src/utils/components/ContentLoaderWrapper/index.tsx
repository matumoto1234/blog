import { color } from '@/utils/styles/variables.css'
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

export const ContentLoaderWrapper: React.FC<{
  props?: IContentLoaderProps
  children: React.ReactNode
}> = ({ props, children }) => {
  return (
    <ContentLoader
      backgroundColor={color.grayThin}
      foregroundColor={color.blackA20}
      {...props}
    >
      {children}
    </ContentLoader>
  )
}
