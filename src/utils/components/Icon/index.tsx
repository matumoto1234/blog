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
  notificationIcon,
} from './index.css'
import { color } from 'utils/styles/variables.css'
import Image from 'next/image'

export const NotificationIcon: React.FC<{
  active: boolean
}> = ({ active }) => {
  return (
    <div className={notificationIcon}>
      {active ? (
        <Image
          src="/icons/notification-active.svg"
          alt="notification active icon"
          width={32}
          height={32}
        />
      ) : (
        <Image
          src="/icons/notification-off.svg"
          alt="notification off icon"
          width={24}
          height={24}
        />
      )}
    </div>
  )
}

export const PinIcon: React.FC<{
  enable: boolean
}> = ({ enable }) => {
  return (
    <div className={pinIcon}>
      {enable ? (
        <Image
          src="/icons/pin.svg"
          alt="pin active icon"
          width={24}
          height={24}
        />
      ) : (
        <Image src="/icons/pin.svg" alt="pin off icon" width={24} height={24} />
      )}
    </div>
  )
}

// export type ChevronIconProps = {
//   disable: boolean
// }

// export const ChevronLeftIcon: React.FC<ChevronIconProps> = ({ disable }) => {
//   if (disable) {
//     return (
//       <div className={chevronLeftIconDisabled}>
//         <ChevronLeftSvg fill={color.blackA20} />
//       </div>
//     )
//   }
//   return (
//     <div className={chevronLeftIcon}>
//       <ChevronLeftSvg fill={color.navy} />
//     </div>
//   )
// }

// export const ChevronRightIcon: React.FC<ChevronIconProps> = ({ disable }) => {
//   if (disable) {
//     return (
//       <div className={chevronRightIconDisabled}>
//         <ChevronRightSvg fill={color.blackA20} />
//       </div>
//     )
//   }
//   return (
//     <div className={chevronRightIcon}>
//       <ChevronRightSvg fill={color.navy} />
//     </div>
//   )
// }

// export const EllipsisIcon: React.FC = () => {
//   return (
//     <div className={ellipsisIcon}>
//       <EllipsisSvg />
//     </div>
//   )
// }

// export const MatumotoIcon: React.FC = () => {
//   return (
//     <div className={matumotoIcon}>
//       <MatumotoSvg />
//     </div>
//   )
// }

// export const TwitterIcon: React.FC = () => {
//   return (
//     <div className={twitterIcon}>
//       <TwitterSvg />
//     </div>
//   )
// }

// export const GithubIcon: React.FC = () => {
//   return (
//     <div className={githubIcon}>
//       <GithubSvg />
//     </div>
//   )
// }

// export const SpeakerDeckIcon: React.FC = () => {
//   return (
//     <div className={speakerDeckIcon}>
//       <SpeakerDeckSvg />
//     </div>
//   )
// }

// export const QiitaIcon: React.FC = () => {
//   return (
//     <div className={qiitaIcon}>
//       <QiitaSvg />
//     </div>
//   )
// }

// export const HatenaIcon: React.FC = () => {
//   return (
//     <div className={hatenaIcon}>
//       <HatenaSvg />
//     </div>
//   )
// }

// export const ConnpassIcon: React.FC = () => {
//   return (
//     <div className={connpassIcon}>
//       <ConnpassSvg />
//     </div>
//   )
// }

// export const ZennIcon: React.FC = () => {
//   return (
//     <div className={zennIcon}>
//       <ZennSvg />
//     </div>
//   )
// }

// export const AtcoderIcon: React.FC = () => {
//   return (
//     <div className={atcoderIcon}>
//       <AtcoderSvg />
//     </div>
//   )
// }
