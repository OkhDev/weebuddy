import {
  collection,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import {
  modalNewLog,
  modalSearchQuery,
  modalUpdateModal,
} from '../atoms/modalAtom'
import Logs from '../components/Logs/Log'
import NewLog from '../components/Logs/NewLog'
import NewLogButton from '../components/Logs/NewLogButtons'
import UpdateLogModal from '../components/Logs/UpdateLog'
import SearchBar from '../components/SearchBar'
import { db } from '../lib/firebase.config'
import { modalAllLogs } from '../atoms/modalAtom'
import Loading from '../components/Loading'
import Error from '../components/Error'

const Dashboard = () => {
  const { data: session, status } = useSession()
  const sessionUserId = session?.user?.id
  const sessionName = session?.user?.name?.split(' ')[0]
  const sessionEmail = session?.user?.email?.split('@')[0]
  const supportedFileTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/heic',
  ]
  const [allLogs, setAllLogs] = useRecoilState(modalAllLogs)

  const isNewLog = useRecoilValue(modalNewLog)
  const isUpdateModal = useRecoilValue(modalUpdateModal)
  const searchQuery = useRecoilValue(modalSearchQuery)

  const [value, loading, error] = useCollection(
    collection(db, `${sessionUserId}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )
  console.log('Loading: ', loading)

  useEffect(() => {
    if (value) {
      const allData = JSON.parse(
        JSON.stringify(
          value?.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
            id: doc.id as string,
            resultData: doc.data() as DocumentData,
          }))
        )
      )
      setAllLogs(allData)
    }
  }, [value])

  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/auth/signin')
  }, [status])

  if (status === 'authenticated') {
    return (
      <>
        {error && <Error />}
        {loading && <Loading />}
        {value && (
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

              <SearchBar />

              <div className="flex flex-col gap-8 px-6 pb-8 md:px-12">
                <div className="flex items-center justify-between -mb-2">
                  <h3 className="text-2xl font-bold md:text-3xl">Wee Logs</h3>
                  {allLogs.length !== 0 && <NewLogButton />}
                </div>

                {isUpdateModal && (
                  <UpdateLogModal supportedFileTypes={supportedFileTypes} />
                )}

                {isNewLog && <NewLog supportedFileTypes={supportedFileTypes} />}

                {allLogs.length === 0 && !isNewLog && (
                  <div className="flex flex-col items-center justify-center gap-4 text-center bg-white rounded-md py-36 drop-shadow-sm md:gap-6">
                    <span className="text-lg font-medium md:text-xl">
                      Create your first log!
                    </span>
                    <NewLogButton large />
                  </div>
                )}

                <div className="flex flex-col gap-6 md:gap-8">
                  {allLogs
                    .filter(
                      (log: DocumentData) =>
                        log.resultData.title
                          .toLowerCase()
                          .includes(searchQuery) ||
                        log.resultData.body.toLowerCase().includes(searchQuery)
                    )
                    .map((log: DocumentData, index: number) => (
                      <div key={log.id}>
                        <Logs
                          index={index}
                          title={log.resultData.title}
                          timestamp={log.resultData.timestamp}
                          updatedAt={log.resultData.updatedAt}
                          body={log.resultData.body}
                          image={log.resultData.image}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    )
  }
}

export default Dashboard
