import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'

interface IInputs {
  title: string
  body?: string
  image?: null | string
}

export const modalLoading = atom<boolean>({
  key: 'loading',
  default: false,
})

export const modalNewLog = atom<boolean>({
  key: 'newLog',
  default: false,
})

export const modalUpdateModal = atom<boolean>({
  key: 'updateModal',
  default: false,
})

export const modalImage = atom<any>({
  key: 'image',
  default: null,
})

export const modalSearchQuery = atom<string>({
  key: 'search',
  default: '',
})

export const modalInputs = atom<IInputs>({
  key: 'inputs',
  default: {
    title: '',
    body: '',
    image: null,
  },
})

export const modalLogIndex = atom<number>({
  key: 'index',
  default: -1,
})

export const modalAllLogs = atom<Array<DocumentData>>({
  key: 'allLogs',
  default: [],
})
