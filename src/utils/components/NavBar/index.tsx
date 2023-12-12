import { isInAbout, isInHome } from '@/Router'
import { Header } from '@/utils/components/Header'
import { NotificationIcon, PinIcon } from '@/utils/components/Icon'
import { NavigationLink } from '@/utils/components/NavigationLink'
import { Spacer, StretchSpacer } from '@/utils/components/Spacer'
import { HStack } from '@/utils/components/Stack'
import { useState } from 'react'
import {
  navBar,
  navBarItemContainer,
  navLink,
  navLinkList,
  notificationIconButton,
  pinIconButton,
  stickyNavBar,
} from './index.css'
import { Tooltip } from '../Tooltip'
import { initializeApp } from 'firebase/app'
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'
import { getToken, isSupported, onMessage } from 'firebase/messaging'
import { fcmConfig } from '@/utils/lib/fcm'

const useNavBar = (): {
  sticky: boolean
  toggleSticky: () => void
  notificationActive: boolean
  toggleNotificationActive: () => void
} => {
  const [sticky, setSticky] = useState(false)

  const toggleSticky = () => {
    setSticky(!sticky)
  }

  const [notificationActive, setNotificationActive] = useState(
    Notification.permission === 'granted'
  )

  const toggleNotificationActive = () => {
    if (Notification.permission === 'granted') {
      setNotificationActive(!notificationActive)
    } else {
      isSupported().then(() => {
        window.navigator.serviceWorker
          .register('/firebase-messaging-sw.js')
          .then((sw) => {
            const app = initializeApp(fcmConfig)
            const messaging = getMessaging(app)
            getToken(messaging, {
              serviceWorkerRegistration: sw,
            })
              .then((_) => {
                if (Notification.permission === 'granted') {
                  setNotificationActive(true)
                } else {
                  setNotificationActive(false)
                }
              })
              .catch((err) => {
                console.error(err)
              })
          })
          .catch((err) => {
            console.error(err)
          })
      })
    }
  }

  return {
    sticky,
    toggleSticky,
    notificationActive,
    toggleNotificationActive,
  }
}

export const NavBar: React.FC = () => {
  const { sticky, toggleSticky, notificationActive, toggleNotificationActive } =
    useNavBar()

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
        <Tooltip
          label={notificationActive ? 'Currently active' : 'Currently off'}
        >
          <button
            className={notificationIconButton}
            onClick={toggleNotificationActive}
          >
            <NotificationIcon active={notificationActive} />
          </button>
        </Tooltip>
        <Spacer size={16} />
        <button className={pinIconButton} onClick={toggleSticky}>
          <PinIcon enable={sticky} />
        </button>
        <Spacer size={32} />
      </HStack>
    </Header>
  )
}
