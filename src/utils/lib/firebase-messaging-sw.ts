import { fcmConfig } from '@/utils/lib/fcm'
import { initializeApp } from 'firebase/app'
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'

declare let self: any

const app = initializeApp(fcmConfig)

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = getMessaging(app)

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.
// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options
onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )

  // Customize notification here
  const notificationTitle = payload.notification?.title || 'title'
  const notificationOptions = {
    body: payload.notification?.body,
    icon: '/matumoto.svg',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
