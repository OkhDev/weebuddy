import { domAnimation, LazyMotion, motion } from 'framer-motion'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Avatar from './Avatar'

const MenuHover = {
  close: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
}

function SignedInNav() {
  const [hover, setHover] = useState<boolean>(false)
  const router = useRouter()

  const menuClick = () => {
    if (hover) {
      setHover(false)
    } else {
      setHover(true)
    }
  }

  const handleDashboard = () => {
    router.push('/dashboard')
  }

  const handleSignOut = async () => {
    signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onClick={menuClick}
        className="absolute top-0 right-0"
      >
        <Avatar navbar />
        <motion.div
          variants={MenuHover}
          initial={{ opacity: 0 }}
          animate={hover ? 'open' : 'close'}
          className={`${
            !hover ? 'pointer-events-none' : 'cursor-pointer'
          } absolute right-0 z-50 flex flex-col items-center justify-center gap-6 text-center p-10 bg-white rounded-md top-16 drop-shadow-sm`}
        >
          <p onClick={handleDashboard} className="cursor-pointer">
            Dashboard
          </p>

          <button
            aria-label="sign out"
            className="px-5 py-2.5 font-medium text-white bg-orange rounded-md w-max inline-flex items-center"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
          <span className="absolute w-6 h-6 rotate-45 bg-white select-none -top-1 right-4"></span>
        </motion.div>
      </motion.div>
    </LazyMotion>
  )
}

export default SignedInNav
