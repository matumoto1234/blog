import { fcmConfig } from '@/utils/lib/fcm'
import { initializeApp } from 'firebase/app'
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'

declare let self: ServiceWorkerGlobalScope

const app = initializeApp(fcmConfig)

const messaging = getMessaging(app)

onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )

  const notificationTitle = payload.notification?.title || 'title'
  const notificationOptions = {
    body: payload.notification?.body,
    icon: '/matumoto.svg',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
