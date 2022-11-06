import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useLockedBody } from 'usehooks-ts'
import SearchBar from '../components/Dashboard/SearchBar'
import Logs from '../components/Logs/LogPosts'
import NewLogButton from '../components/Logs/NewLogButton'
import UpdateLogModal from '../components/Modals/UpdateLogModal'
import NewLog from '../components/NewLog'
import { db, storage } from '../firebase.config'

interface IInputs {
  title: string
  body?: string
  image?: null | string
}

interface IModalInputs {
  title: string
  body?: string
  image?: null | string
}

interface IUpdateLogData {
  logIndex: number
  updateLogId: string
}

interface ISession {
  sessionSSR: Session | null
}

const Dashboard = ({ sessionSSR }: ISession): JSX.Element => {
  const sessionUserId = sessionSSR?.user?.id
  const sessionName = sessionSSR?.user?.name?.split(' ')[0]
  const sessionEmail = sessionSSR?.user?.email?.split('@')[0]
  const [loading, setLoading] = useState<boolean>(false)
  const [, setLocked] = useLockedBody(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isNewLog, setIsNewLog] = useState<boolean>(false)
  const [allLogs, setAllLogs] = useState<DocumentData>([])
  const [inputs, setInputs] = useState<IInputs>({
    title: '',
    body: '',
    image: null,
  })
  const [imageFile, setImageFile] = useState<any>()

  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false)
  const [updateModalInputs, setUpdateModalInputs] = useState<IModalInputs>({
    title: '',
    body: '',
    image: null,
  })
  const [updateLogData, setUpdateLogData] = useState<IUpdateLogData>({
    logIndex: -1,
    updateLogId: '',
  })

  const triggerUpdateModal = (e: any) => {
    setIsUpdateModal(true)
    setLocked(true)

    const logIndex: number = e.target.id
    const updateLogId: string = allLogs[logIndex].id

    setUpdateLogData({
      logIndex: logIndex,
      updateLogId: updateLogId,
    })
    setUpdateModalInputs({
      title: allLogs[logIndex].resultData.title,
      body: allLogs[logIndex].resultData.body,
      image: allLogs[logIndex].resultData.image,
    })
  }

  const updateImageLog = (e: any) => {
    const reader: FileReader = new FileReader()
    const supportedFileTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/heic',
    ]
    const image = e.target.files[0]
    setImageFile(image)
    const imageSize = image.size
    const imageType = image.type

    if (imageSize > 10485760) {
      toast.error('File size too large.')
      setInputs({ ...inputs, image: null })
      return
    }
    if (supportedFileTypes.indexOf(imageType) === -1) {
      toast.error('File type is not allowed.')
      setInputs({ ...inputs, image: null })
      return
    }
    if (image && imageSize <= 10485760) {
      reader.readAsDataURL(image)
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        const imageSrc = readerEvent.target?.result as string
        setUpdateModalInputs({ ...updateModalInputs, image: imageSrc })
      }
    }
  }

  const updateLog = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    setLocked(false)
    setIsUpdateModal(false)
    toast.loading('Updating...', { id: 'update' })

    await updateDoc(doc(db, `${sessionUserId}`, updateLogData.updateLogId), {
      title: updateModalInputs.title,
      body: updateModalInputs.body,
      updatedAt: serverTimestamp(),
    })

    const imageRef = ref(
      storage,
      `${sessionUserId}/${updateLogData.updateLogId}/image`
    )
    if (updateModalInputs.image !== null) {
      toast.loading('Updating image...', { id: 'update' })
      const checkOldImage = allLogs[updateLogData.logIndex].resultData.image
      if (checkOldImage !== null) await deleteObject(imageRef)

      uploadBytes(imageRef, imageFile).then(async () => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(
          doc(db, `${sessionUserId}`, updateLogData.updateLogId),
          {
            image: downloadURL,
          }
        )
      })
    }

    if (updateModalInputs.image === null) {
      await updateDoc(doc(db, `${sessionUserId}`, updateLogData.updateLogId), {
        image: null,
      })
    }

    setLoading(false)
    toast.success('Updated!', { id: 'update' })
  }

  const cancelUpdateLog = (e: React.MouseEvent) => {
    e.preventDefault()
    setLocked(false)
    setIsUpdateModal(false)
    setUpdateLogData({
      logIndex: -1,
      updateLogId: '',
    })
    setUpdateModalInputs({
      title: '',
      body: '',
      image: null,
    })
  }

  const deleteLog = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    if (loading) return
    toast.loading('Deleting...', { id: 'delete' })

    const logIndex: number = e.target.id
    const deleteLogId: string = allLogs[logIndex].id
    const logImageRef = ref(storage, `${sessionUserId}/${deleteLogId}/image`)
    const checkImage = allLogs[logIndex].resultData.image

    if (checkImage !== null) await deleteObject(logImageRef)
    await deleteDoc(doc(db, `${sessionUserId}`, deleteLogId))

    setLoading(false)
    toast.success('Deleted', { id: 'delete' })
  }

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, `${sessionUserId}`), orderBy('timestamp', 'desc')),
        (snapshot: QuerySnapshot<DocumentData>) => {
          setAllLogs(
            JSON.parse(
              JSON.stringify(
                snapshot.docs.map((doc) => ({
                  id: doc.id as string,
                  resultData: doc.data() as DocumentData,
                }))
              )
            )
          )
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [db]
  )

  return (
    <>
      <Toaster />
      <section className="flex flex-col items-start flex-1 w-full mx-auto max-w-7xl mt-28">
        <div className="w-full pt-2">
          <div className="px-6 space-y-2 md:px-12">
            <h2 className="text-3xl font-bold md:text-4xl">
              Hey, {sessionName || sessionEmail || 'Member'}
              &nbsp;&nbsp;&#128075;
            </h2>
            <p className="text-lg text-navy-light">
              {allLogs.length}{' '}
              {allLogs.length !== 1
                ? "wee's have been logged"
                : 'wee has been logged'}
            </p>
          </div>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <div className="flex flex-col gap-8 px-6 pb-8 md:px-12">
            <div className="flex items-center justify-between -mb-2">
              <h3 className="text-2xl font-bold md:text-3xl">Wee Logs</h3>
              {allLogs.length !== 0 && (
                <NewLogButton isNewLog={isNewLog} setIsNewLog={setIsNewLog} />
              )}
            </div>

            {isUpdateModal && (
              <UpdateLogModal
                updateModalInputs={updateModalInputs}
                setUpdateModalInputs={setUpdateModalInputs}
                updateImageLog={updateImageLog}
                updateLog={updateLog}
                cancelUpdateLog={cancelUpdateLog}
                title={inputs.title}
              />
            )}

            {isNewLog && (
              <NewLog
                title={inputs.title}
                inputs={inputs}
                setInputs={setInputs}
                setIsNewLog={setIsNewLog}
                imageFile={imageFile}
                setImageFile={setImageFile}
                sessionSSR={sessionSSR}
                sessionUserId={sessionUserId}
                sessionName={sessionName}
              />
            )}

            {allLogs.length === 0 && !isNewLog && (
              <div className="flex flex-col items-center justify-center gap-4 text-center bg-white rounded-md py-36 drop-shadow-sm md:gap-6">
                <span className="text-lg font-medium md:text-xl">
                  Create your first log!
                </span>
                <NewLogButton
                  isNewLog={isNewLog}
                  setIsNewLog={setIsNewLog}
                  large
                />
              </div>
            )}

            <div className="flex flex-col gap-6 md:gap-8">
              {allLogs
                .filter(
                  (log: any) =>
                    log.resultData.title.toLowerCase().includes(searchQuery) ||
                    log.resultData.body.toLowerCase().includes(searchQuery)
                )
                .map((log: any, index: number) => (
                  <div key={log.id}>
                    <Logs
                      index={index}
                      title={log.resultData.title}
                      timestamp={log.resultData.timestamp}
                      updatedAt={log.resultData.updatedAt}
                      body={log.resultData.body}
                      image={log.resultData.image}
                      triggerUpdateModal={(e) => triggerUpdateModal(e)}
                      deleteLog={deleteLog}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      sessionSSR: session,
    },
  }
}
