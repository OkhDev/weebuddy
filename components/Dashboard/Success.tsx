import {
  collection,
  DocumentData,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import Intro from './Logs/Intro'
import Logs from './Logs/Log'
import NewLog from './Logs/NewLog'
import NewLogButton from './Logs/NewLogButtons'
import UpdateLogModal from './Logs/UpdateLog'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  modalAllLogs,
  modalNewLog,
  modalUpdateModal,
  modalSearchQuery,
} from '../../atoms/modalAtom'
import { db } from '../../lib/firebase.config'

function Success({ sessionUserId, sessionName, sessionEmail }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allLogs, setAllLogs] = useRecoilState(modalAllLogs)
  const isNewLog = useRecoilValue(modalNewLog)
  const isUpdateModal = useRecoilValue(modalUpdateModal)
  const searchQuery = useRecoilValue(modalSearchQuery)

  const [value] = useCollection(
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

  return (
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
                (log) =>
                  log.resultData.title.toLowerCase().includes(searchQuery) ||
                  log.resultData.body.toLowerCase().includes(searchQuery)
              )
              .map((log, index: number) => (
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
  )
}

export default Success
