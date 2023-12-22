// Firebase cloud messaging config
// API keyが公開されているがサービス識別にしか使われないので問題ない
// 詳細: https://firebase.google.com/support/guides/security-checklist?hl=ja#understand_api_keys
export const fcmConfig: {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
} = {
  apiKey: "AIzaSyAev7knSpYctj3Gilm3cBvV7B-ATagsl5I",
  authDomain: "fcm-sandbox-9992d.firebaseapp.com",
  projectId: "fcm-sandbox-9992d",
  storageBucket: "fcm-sandbox-9992d.appspot.com",
  messagingSenderId: "392885897153",
  appId: "1:392885897153:web:34c50f90fa861363d01140",
  measurementId: "G-SCFC5JYRD5",
}

// VAPIDに使用する公開鍵
// 詳細: https://firebase.google.com/docs/reference/js/messaging_.gettokenoptions.md?hl=ja#gettokenoptionsvapidkey
export const vapidKey = "BDKP6UuiKI9mtcwYpCjaKDsBMTpCf2ayfhFJbA36LOB-o0GbjSY8JiUMtj7bhTm35rS-OmJwTBVwG7JQK07B2-I"
