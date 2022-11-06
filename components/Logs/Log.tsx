import { BsThreeDots } from 'react-icons/bs'
import { HiCalendar, HiClock } from 'react-icons/hi'
import toast, { Toaster } from 'react-hot-toast'
import { deleteDoc, doc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import {
  modalAllLogs,
  modalLoading,
  modalUpdateModal,
  modalInputs,
  modalNewLog,
} from '../../atoms/modalAtom'
import { storage, db } from '../../firebase.config'
import { modalLogIndex } from '../../atoms/modalAtom'
import { useState } from 'react'

interface ILogs {
  index: number
  title: string
  body?: string
  image?: string
  timestamp: any
  updatedAt?: any
  sessionUserId: string | undefined
}

const LogPosts = ({
  index,
  title,
  timestamp,
  updatedAt,
  body,
  image,
  sessionUserId,
}: ILogs): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allLogs, setAllLogs] = useRecoilState(modalAllLogs)
  const [loading, setLoading] = useRecoilState(modalLoading)
  const [, setIsUpdateModal] = useRecoilState(modalUpdateModal)
  const [, setInputs] = useRecoilState(modalInputs)
  const [, setIsNewLog] = useRecoilState(modalNewLog)
  const [, setLogIndex] = useRecoilState(modalLogIndex)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const createdDay = new Date(timestamp?.seconds * 1000).toLocaleDateString(
    undefined,
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  )
  const createdTime = new Date(timestamp?.seconds * 1000).toLocaleTimeString(
    [],
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  )
  const updatedDay = new Date(updatedAt?.seconds * 1000).toLocaleDateString(
    undefined,
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  )
  const updatedTime = new Date(updatedAt?.seconds * 1000).toLocaleTimeString(
    [],
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  )

  const updateLog = () => {
    setIsNewLog(false)
    setInputs({
      title: '',
      body: '',
      image: null,
    })
    setIsUpdateModal(true)
    setIsEdit(false)

    setInputs({
      title: allLogs[index].resultData.title,
      body: allLogs[index].resultData.body,
      image: allLogs[index].resultData.image,
    })
  }

  const deleteLog = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    if (loading) toast.error('Deletion in progress.', { id: 'delete' })
    setIsEdit(false)
    toast.loading('Deleting...', { id: 'delete' })

    const deleteLogId: string = allLogs[index].id
    const logImageRef = ref(storage, `${sessionUserId}/${deleteLogId}/image`)
    const checkImage = allLogs[index].resultData.image

    if (checkImage !== null) await deleteObject(logImageRef)
    await deleteDoc(doc(db, `${sessionUserId}`, deleteLogId))

    setLoading(false)
    toast.success('Deleted', { id: 'delete' })
  }

  const triggerEdit = () => {
    setLogIndex(index)
    setIsEdit((prev) => !prev)
  }

  return (
    <>
      <Toaster />
      <div className="relative flex flex-col w-full gap-6 p-10 bg-white md:p-14 md:gap-8 rounded-xl min-h-max drop-shadow-sm">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="relative flex flex-col gap-6">
            <h4 className="text-2xl font-bold break-normal md:text-3xl pr-10 md:pr-16">
              {title}
            </h4>
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 text-navy-light">
              <p className="inline-flex items-center gap-2">
                <HiCalendar size={16} /> {createdDay}
              </p>
              <p className="inline-flex items-center gap-2">
                <HiClock size={16} /> {createdTime}
              </p>
              {updatedAt && (
                <p className="inline-flex items-start flex-wrap">
                  <span className="italic font-medium w-max">
                    Last Updated:&nbsp;
                  </span>
                  <span className="italic w-max">
                    {createdDay !== updatedDay
                      ? `${updatedDay} at ${updatedTime}`
                      : `Today at ${updatedTime}`}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="z-50 fixed top-8 right-8 md:top-14 md:right-14">
            <span className="cursor-pointer select-none" onClick={triggerEdit}>
              <BsThreeDots size={24} />
            </span>

            {isEdit && (
              <>
                <div className="absolute -right-4 top-10 flex flex-row-reverse gap-10 select-none bg-slate-50 rounded-md p-6 w-max drop-shadow-sm">
                  <button
                    className="w-32 px-4 py-2 text-sm font-medium uppercase rounded-md outline-none select-none text-white bg-blue-400 focus:outline-none"
                    onClick={updateLog}
                  >
                    Update
                  </button>
                  <button
                    className="w-32 px-4 py-2 text-sm font-medium uppercase rounded-md outline-none select-none text-white bg-red-500 focus:outline-none"
                    onClick={deleteLog}
                  >
                    Delete
                  </button>
                </div>
                <span className="absolute w-6 h-6 rotate-45 bg-slate-50 select-none top-8 right-0"></span>
              </>
            )}
          </div>
        </div>
        {body !== '' && (
          <>
            <hr className="border-1 border-navy-light/30" />
            <div className="relative flex flex-col gap-2 md:gap-0 md:flex-row">
              <p className="font-bold leading-loose md:text-lg basis-1/6 text-navy-light">
                Notes
              </p>
              <p className="leading-loose basis-5/6 w-full break-normal">
                {body}
              </p>
            </div>
          </>
        )}
        {image !== null && (
          <div className="flex flex-col gap-2 md:gap-0 md:flex-row">
            <p className="font-bold leading-loose md:text-lg basis-1/6 text-navy-light">
              Image
            </p>
            <div className="flex basis-5/6">
              <img
                src={image}
                alt="image of pet"
                className="rounded-md max-h-96 md:max-w-[40%]"
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default LogPosts
