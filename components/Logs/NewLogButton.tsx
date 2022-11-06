import { HiPlusSm } from 'react-icons/hi'
import toast, { Toaster } from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { modalNewLog, modalInputs } from '../../atoms/modalAtom'

interface INewLogButton {
  large?: boolean
}

const NewLogButton = ({ large }: INewLogButton) => {
  const [, setInputs] = useRecoilState(modalInputs)
  const [isNewLog, setIsNewLog] = useRecoilState(modalNewLog)

  const createLog = () => {
    if (!isNewLog) {
      setInputs({
        title: '',
        body: '',
        image: null,
      })
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
