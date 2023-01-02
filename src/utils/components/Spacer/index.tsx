import { spacer, SpacingSize, stretchSpacer } from './index.css'

export const Spacer: React.FC<{
  size: SpacingSize
}> = ({ size }) => {
  return <div className={spacer({ size })}></div>
}

export const StretchSpacer: React.FC = () => {
  return <div className={stretchSpacer}></div>
}
