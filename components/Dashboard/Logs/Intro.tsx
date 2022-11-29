import { useRecoilState } from 'recoil'
import { modalAllLogs } from '../../../atoms/modalAtom'
import SearchBar from '../SearchBar'
import { motion } from 'framer-motion'

interface ISession {
  sessionName: string | undefined
  sessionEmail: string | undefined
}

const Intro = ({ sessionName, sessionEmail }: ISession) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allLogs, setAllLogs] = useRecoilState(modalAllLogs)

  return (
    <>
      <div className="px-6 space-y-2 md:px-12">
        <motion.h2 className="text-3xl font-bold md:text-4xl">
          Hey, {sessionName || sessionEmail || 'Member'}
          &nbsp; &#128075;
        </motion.h2>
        <p className="text-lg text-navy-light">
          {allLogs.length}{' '}
          {allLogs.length !== 1
            ? "wee's have been logged"
            : 'wee has been logged'}
        </p>
      </div>

      <SearchBar />
    </>
  )
}

export default Intro
