import { isInAbout, isInHome } from '@/Router'
import { Header } from '@/utils/components/Header'
import { PinIcon } from '@/utils/components/Icon'
import { NavigationLink } from '@/utils/components/NavigationLink'
import { Spacer, StretchSpacer } from '@/utils/components/Spacer'
import { HStack } from '@/utils/components/Stack'
import { useState } from 'react'
import {
  navBar,
  navBarItemContainer,
  navLink,
  navLinkList,
  pinIconButton,
  stickyNavBar,
} from './index.css'

const useNavBar = (): {
  sticky: boolean
  toggleSticky: () => void
} => {
  const [sticky, setSticky] = useState(false)

  const toggleSticky = () => {
    setSticky(!sticky)
  }

  return {
    sticky,
    toggleSticky,
  }
}

export const NavBar: React.FC = () => {
  const { sticky, toggleSticky } = useNavBar()

  return (
    <Header className={sticky ? stickyNavBar : navBar}>
      <HStack
        style={{
          justifyContent: 'between',
          alignItems: 'center',
        }}
        className={navBarItemContainer}
      >
        <Spacer size={32} />
        <nav className={navLinkList}>
          <HStack
            style={{ gap: 16, alignItems: 'center' }}
            className={navLinkList}
          >
            <NavigationLink className={navLink} to="/home" active={isInHome()}>
              Home
            </NavigationLink>
            <NavigationLink
              className={navLink}
              to="/about"
              active={isInAbout()}
            >
              About
            </NavigationLink>
          </HStack>
        </nav>
        <StretchSpacer />
        <button className={pinIconButton} onClick={toggleSticky}>
          <PinIcon enable={sticky} />
        </button>
        <Spacer size={32} />
      </HStack>
    </Header>
  )
}
