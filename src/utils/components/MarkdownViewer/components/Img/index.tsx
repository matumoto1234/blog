import classNames from 'classnames'
import { HTMLAttributeReferrerPolicy } from 'react'
import { img } from './index.css'

// TODO: ImgのpropsをコピペではなくReact.ImgHTMLAttributesを使うようにする
export const Img: React.FC<{
  className?: string
  alt?: string | undefined
  crossOrigin?: 'anonymous' | 'use-credentials' | '' | undefined
  decoding?: 'async' | 'auto' | 'sync' | undefined
  height?: number | string | undefined
  loading?: 'eager' | 'lazy' | undefined
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined
  sizes?: string | undefined
  src?: string | undefined
  srcSet?: string | undefined
  useMap?: string | undefined
  width?: number | string | undefined
}> = ({
  className,
  alt,
  crossOrigin,
  decoding,
  height,
  loading,
  referrerPolicy,
  sizes,
  src,
  srcSet,
  useMap,
  width,
}) => {
  return (
    <img
      className={classNames(className, img)}
      alt={alt}
      crossOrigin={crossOrigin}
      decoding={decoding}
      height={height}
      loading={loading}
      referrerPolicy={referrerPolicy}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
      useMap={useMap}
      width={width}
    />
  )
}
