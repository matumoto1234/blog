import { ReactComponent as PinSvg } from '@/assets/pin.svg'
import { ReactComponent as FilledPinSvg } from '@/assets/filled-pin.svg'
import { ReactComponent as ChevronLeftSvg } from '@/assets/chevron-left.svg'
import { ReactComponent as ChevronRightSvg } from '@/assets/chevron-right.svg'
import { ReactComponent as EllipsisSvg } from '@/assets/ellipsis.svg'
import { ReactComponent as MatumotoSvg } from '@/assets/matumoto.svg'
import { ReactComponent as TwitterSvg } from '@/assets/twitter.svg'
import { ReactComponent as GithubSvg } from '@/assets/github.svg'
import { ReactComponent as SpeakerDeckSvg } from '@/assets/speaker-deck.svg'
import { ReactComponent as QiitaSvg } from '@/assets/qiita.svg'
import { ReactComponent as HatenaSvg } from '@/assets/hatena.svg'
import { ReactComponent as ConnpassSvg } from '@/assets/connpass.svg'
import { ReactComponent as ZennSvg } from '@/assets/zenn.svg'
import { ReactComponent as AtcoderSvg } from '@/assets/atcoder.svg'
import {
  chevronLeftIcon,
  chevronLeftIconDisabled,
  chevronRightIcon,
  chevronRightIconDisabled,
  connpassIcon,
  ellipsisIcon,
  githubIcon,
  hatenaIcon,
  matumotoIcon,
  pinIcon,
  qiitaIcon,
  speakerDeckIcon,
  twitterIcon,
  zennIcon,
  atcoderIcon,
} from './index.css'
import { color } from '@/utils/styles/variables.css'

export const PinIcon: React.FC<{
  enable: boolean
}> = ({ enable }) => {
  return (
    <div className={pinIcon}>
      {enable ? (
        <FilledPinSvg fill={color.navy} />
      ) : (
        <PinSvg fill={color.gray} />
      )}
    </div>
  )
}

export type ChevronIconProps = {
  disable: boolean
}

export const ChevronLeftIcon: React.FC<ChevronIconProps> = ({ disable }) => {
  if (disable) {
    return (
      <div className={chevronLeftIconDisabled}>
        <ChevronLeftSvg fill={color.blackA20} />
      </div>
    )
  }
  return (
    <div className={chevronLeftIcon}>
      <ChevronLeftSvg fill={color.navy} />
    </div>
  )
}

export const ChevronRightIcon: React.FC<ChevronIconProps> = ({ disable }) => {
  if (disable) {
    return (
      <div className={chevronRightIconDisabled}>
        <ChevronRightSvg fill={color.blackA20} />
      </div>
    )
  }
  return (
    <div className={chevronRightIcon}>
      <ChevronRightSvg fill={color.navy} />
    </div>
  )
}

export const EllipsisIcon: React.FC = () => {
  return (
    <div className={ellipsisIcon}>
      <EllipsisSvg />
    </div>
  )
}

export const MatumotoIcon: React.FC = () => {
  return (
    <div className={matumotoIcon}>
      <MatumotoSvg />
    </div>
  )
}

export const TwitterIcon: React.FC = () => {
  return (
    <div className={twitterIcon}>
      <TwitterSvg />
    </div>
  )
}

export const GithubIcon: React.FC = () => {
  return (
    <div className={githubIcon}>
      <GithubSvg />
    </div>
  )
}

export const SpeakerDeckIcon: React.FC = () => {
  return (
    <div className={speakerDeckIcon}>
      <SpeakerDeckSvg />
    </div>
  )
}

export const QiitaIcon: React.FC = () => {
  return (
    <div className={qiitaIcon}>
      <QiitaSvg />
    </div>
  )
}

export const HatenaIcon: React.FC = () => {
  return (
    <div className={hatenaIcon}>
      <HatenaSvg />
    </div>
  )
}

export const ConnpassIcon: React.FC = () => {
  return (
    <div className={connpassIcon}>
      <ConnpassSvg />
    </div>
  )
}

export const ZennIcon: React.FC = () => {
  return (
    <div className={zennIcon}>
      <ZennSvg />
    </div>
  )
}

export const AtcoderIcon: React.FC = () => {
  return (
    <div className={atcoderIcon}>
      <AtcoderSvg />
    </div>
  )
}
