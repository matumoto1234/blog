import { RecipeVariants } from '@vanilla-extract/recipes'
import classNames from 'classnames'
import { hStack, vStack } from './index.css'

export const VStack: React.FC<{
  children: React.ReactNode
  style?: RecipeVariants<typeof vStack>
  className?: string
}> = ({ children, style, className }) => {
  return <div className={classNames(vStack(style), className)}>{children}</div>
}

export const HStack: React.FC<{
  children: React.ReactNode
  style?: RecipeVariants<typeof hStack>
  className?: string
}> = ({ children, style, className }) => {
  return <div className={classNames(hStack(style), className)}>{children}</div>
}
