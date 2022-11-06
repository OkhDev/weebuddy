import { HiPlusSm } from 'react-icons/hi'
import toast, { Toaster } from 'react-hot-toast'

interface INewLogButton {
  isNewLog: boolean
  setIsNewLog: (e: boolean) => void
  large?: boolean
}

const NewLogButton = ({ isNewLog, setIsNewLog, large }: INewLogButton) => {
  const createLog = () => {
    if (!isNewLog) {
      setIsNewLog(true)
    } else {
      toast.error('Cannot create new log.', { id: 'newLogError' })
    }
  }

  return (
    <>
      <Toaster />
      <button
        onClick={createLog}
        className={`select-none inline-flex items-center px-4 py-2 font-medium text-white rounded-md bg-orange w-max ${
          large && 'text-lg'
        }`}
      >
        <HiPlusSm style={{ marginRight: 3 }} size={18} /> New Log
      </button>
    </>
  )
}

export default NewLogButton
