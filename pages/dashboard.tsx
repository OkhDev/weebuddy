import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  modalAllLogs,
  modalNewLog,
  modalSearchQuery,
  modalUpdateModal,
} from '../atoms/modalAtom'
import Logs from '../components/Logs/Log'
import NewLog from '../components/Logs/NewLog'
import NewLogButton from '../components/Logs/NewLogButton'
import UpdateLogModal from '../components/Logs/UpdateLog'
import SearchBar from '../components/SearchBar'
import { db } from '../firebase.config'

interface ISession {
  sessionSSR: Session | null
}

const Dashboard = ({ sessionSSR }: ISession): JSX.Element => {
  const sessionUserId = sessionSSR?.user?.id
  const sessionName = sessionSSR?.user?.name?.split(' ')[0]
  const sessionEmail = sessionSSR?.user?.email?.split('@')[0]
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

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, `${sessionUserId}`), orderBy('timestamp', 'desc')),
        (snapshot: QuerySnapshot<DocumentData>) => {
          setAllLogs(
            JSON.parse(
              JSON.stringify(
                snapshot.docs.map(
                  (doc: QueryDocumentSnapshot<DocumentData>) => ({
                    id: doc.id as string,
                    resultData: doc.data() as DocumentData,
                  })
                )
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
              <UpdateLogModal
                sessionUserId={sessionUserId}
                supportedFileTypes={supportedFileTypes}
              />
            )}

            {isNewLog && (
              <NewLog
                sessionUserId={sessionUserId}
                sessionName={sessionName}
                supportedFileTypes={supportedFileTypes}
              />
            )}

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
                    log.resultData.title.toLowerCase().includes(searchQuery) ||
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
                      sessionUserId={sessionUserId}
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
