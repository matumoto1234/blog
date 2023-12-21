import { fcmConfig } from '@/utils/lib/fcm'
import { initializeApp } from 'firebase/app'
import { isSupported, getMessaging, getToken } from 'firebase/messaging'
import { useState } from 'react'
import { NotificationIcon } from '../Icon'
import { notificationIconButton } from './index.css'
import { Tooltip } from '../Tooltip'

const supportsNotification = (): boolean => {
  // https://developer.mozilla.org/ja/docs/Web/API/Notifications_API/Using_the_Notifications_API
  return 'Notification' in window
}

export const useNotificationButton = () => {
  const [active, setActive] = useState(
    supportsNotification() && Notification.permission === 'granted'
  )

  const subscribe = () => {
    window.navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((sw) => {
        const app = initializeApp(fcmConfig)
        const messaging = getMessaging(app)

        // messagingインスタンスをプッシュ通知にサブスクライブ
        // 通知権限がdefaultの場合は許可を求めてくれる
        // https://firebase.google.com/docs/reference/js/messaging_?hl=ja#gettoken
        getToken(messaging, {
          serviceWorkerRegistration: sw,
        })
          .then((_) => {
            if (Notification.permission === 'granted') {
              setActive(true)
            }
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const toggleActive = () => {
    if (!supportsNotification()) {
      return
    }

    switch (Notification.permission) {
      case 'default':
        isSupported().then((ok) => {
          if (ok) {
            subscribe()
          }
        })
        break
      case 'denied':
        alert('通知権限が許可されていません')
        break
      case 'granted':
        setActive(!active)
        break
    }
  }

  return {
    active,
    toggleActive,
  }
}

type NotificationButtonProps = {
  active: boolean
  toggleActive: () => void
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({
  active,
  toggleActive,
}) => {
  return (
    <Tooltip label={active ? 'Currently active' : 'Currently off'}>
      <button className={notificationIconButton} onClick={toggleActive}>
        <NotificationIcon active={active} />
      </button>
    </Tooltip>
  )
}
