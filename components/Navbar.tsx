import { motion } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
// import { CgMenuRightAlt } from 'react-icons/cg'
import { FaPaw } from 'react-icons/fa'
// import { useMediaQuery } from 'react-responsive'
// import { useLockedBody } from 'usehooks-ts'
import Avatar from './Avatar'
// import { deviceSize } from '../responsive'
import toast, { Toaster } from 'react-hot-toast'

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

const Navbar = (): JSX.Element => {
  const { status } = useSession()
  const router = useRouter()

  const [hover, setHover] = useState<boolean>(false)
  // const [locked, setLocked] = useLockedBody(false)
  // const isMobile = useMediaQuery({ maxWidth: deviceSize.mobile })

  const handleSignOut = async () => {
    try {
      const data = await signOut({ redirect: false, callbackUrl: '/' })
      router.push(data.url)
    } catch (e) {
      toast.error(`Error occurred.\n${e}`)
    }
  }

  const handleSignIn = async () => {
    router.push('/auth/signin')
  }

  return (
    <>
      <Toaster />
      <nav className="sticky top-0 left-0 z-40 flex h-24 px-6 -mb-24 tracking-wide select-none md:px-12 bg-sand">
        <div className="relative flex items-center justify-between w-full m-auto max-w-7xl">
          <div>
            <div onClick={() => router.push('/')}>
              <h1 className="text-3xl font-extrabold cursor-pointer">
                Wee<span className="text-orange">Buddy</span>
              </h1>
            </div>
          </div>
          {status === 'authenticated' ? (
            <>
              <motion.div
                onHoverStart={() => setHover(true)}
                onHoverEnd={() => setHover(false)}
                className="absolute top-0 right-0"
              >
                <Avatar navbar />
                <motion.div
                  variants={MenuHover}
                  initial={{ opacity: 0 }}
                  animate={hover ? 'open' : 'close'}
                  className={`${
                    !hover && 'pointer-events-none'
                  } absolute right-0 z-50 flex flex-col items-center justify-center gap-6 text-center p-10 bg-white rounded-md top-16 drop-shadow-sm`}
                >
                  <p
                    onClick={() => router.push('/dashboard')}
                    className="cursor-pointer"
                  >
                    Dashboard
                  </p>

                  <button
                    className="px-5 py-2.5 font-medium text-white bg-orange rounded-md w-max inline-flex items-center"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                  <span className="absolute w-6 h-6 rotate-45 bg-white select-none -top-1 right-4"></span>
                </motion.div>
              </motion.div>

              {/* {isMobile && (
              <div className="relative">
                <span className="cursor-pointer">
                  <CgMenuRightAlt size={36} />
                </span>
              </div>
            )} */}
            </>
          ) : (
            <div
              onClick={handleSignIn}
              className="inline-flex items-center rounded-full cursor-pointer"
            >
              <p className="mr-4 text-lg font-medium">Sign In</p>
              <button className="p-2 font-bold text-white rounded-full bg-orange">
                <FaPaw size={24} />
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
