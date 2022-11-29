import {
  collection,
  DocumentData,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  modalAllLogs,
  modalNewLog,
  modalSearchQuery,
  modalUpdateModal,
} from '../atoms/modalAtom'

import Error from '../components/Dashboard/Error'
import Loading from '../components/Dashboard/Loading'
import Intro from '../components/Dashboard/Logs/Intro'
import Logs from '../components/Dashboard/Logs/Log'
import NewLog from '../components/Dashboard/Logs/NewLog'
import NewLogButton from '../components/Dashboard/Logs/NewLogButtons'
import UpdateLogModal from '../components/Dashboard/Logs/UpdateLog'
import { db } from '../lib/firebase.config'

const Dashboard = () => {
  const { data: session, status } = useSession()
  const sessionUserId = session?.user?.id
  const sessionName = session?.user?.name?.split(' ')[0]
  const sessionEmail = session?.user?.email?.split('@')[0]
  const [allLogs, setAllLogs] = useRecoilState(modalAllLogs)

  const isNewLog = useRecoilValue(modalNewLog)
  const isUpdateModal = useRecoilValue(modalUpdateModal)
  const searchQuery = useRecoilValue(modalSearchQuery)

  const [value, loading, error] = useCollection(
    query(collection(db, `${sessionUserId}`), orderBy('timestamp', 'desc')),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/auth/signin')
  }, [status])

  if (status === 'authenticated') {
    return (
      <>
        <Head>
          <title>Dashboard</title>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta
            name="description"
            content="User's log information is displayed on this page while having communication with Google's Firebase."
          />
        </Head>
        {error && <Error />}
        {loading && <Loading />}
        {value && (
          <section className="flex flex-col items-start flex-grow w-full mx-auto max-w-7xl mt-32">
            <div className="w-full pb-24">
              <Intro sessionName={sessionName} sessionEmail={sessionEmail} />

              <div className="flex flex-col gap-8 px-6 pb-8 md:px-12">
                <div className="flex items-center justify-between -mb-2">
                  <h3 className="text-2xl font-bold md:text-3xl">Wee Logs</h3>
                  {allLogs.length !== 0 && <NewLogButton />}
                </div>

                {isUpdateModal && <UpdateLogModal />}

                {isNewLog && <NewLog />}

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
