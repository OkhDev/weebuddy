import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import { FirebaseStorage, getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAzZQ_pnbSu6JIV_HCEIN_YSrMT2kw6PeQ',
  authDomain: 'wee-buddy.firebaseapp.com',
  projectId: 'wee-buddy',
  storageBucket: 'wee-buddy.appspot.com',
  messagingSenderId: '1017441395003',
  appId: '1:1017441395003:web:6217a700acf76fef4ed71e',
}

const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp()
const db: Firestore = getFirestore()
const storage: FirebaseStorage = getStorage()

export { db, app, storage }
