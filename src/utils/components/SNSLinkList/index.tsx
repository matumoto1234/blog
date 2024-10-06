import { ExternalLink } from '../ExternalLink'
import {
  AtcoderIcon,
  ConnpassIcon,
  GithubIcon,
  HatenaIcon,
  QiitaIcon,
  SpeakerDeckIcon,
  TwitterIcon,
  ZennIcon,
} from '../Icon'
import { HStack, VStack } from '../Stack'
import { snsLinkList } from './index.css'

export const SNSLinkList: React.FC = () => {
  return (
    <VStack style={{ gap: 24 }}>
      <HStack style={{ gap: 16 }} className={snsLinkList}>
        <ExternalLink to="https://twitter.com/matumoto_1234">
          <TwitterIcon />
        </ExternalLink>
        <ExternalLink to="https://github.com/matumoto1234">
          <GithubIcon />
        </ExternalLink>
        <ExternalLink to="https://speakerdeck.com/matumoto">
          <SpeakerDeckIcon />
        </ExternalLink>
        <ExternalLink to="https://qiita.com/matumoto2">
          <QiitaIcon />
        </ExternalLink>
      </HStack>
      <HStack>
        <ExternalLink to="https://matumoto-h.hatenablog.com/archive">
          <HatenaIcon />
        </ExternalLink>
        <ExternalLink to="https://connpass.com/user/matumoto1234/">
          <ConnpassIcon />
        </ExternalLink>
        <ExternalLink to="https://zenn.dev/matumoto">
          <ZennIcon />
        </ExternalLink>
        <ExternalLink to="https://atcoder.jp/users/matumoto">
          <AtcoderIcon />
        </ExternalLink>
      </HStack>
    </VStack>
  )
}
