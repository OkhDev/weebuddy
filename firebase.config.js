import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAzZQ_pnbSu6JIV_HCEIN_YSrMT2kw6PeQ',
  authDomain: process.env.FIREBASE_API_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_API_PROJECT_ID,
  storageBucket: process.env.FIREBASE_API_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_API_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_API_ID,
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { db, app, storage }
