import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FaPaw } from 'react-icons/fa'
import Logo from '../Logo'
import SignedInNav from './SignedInNav'

const Navbar = (): JSX.Element => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/auth/signin')
  }

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 flex h-24 px-6 -mb-24 tracking-wide select-none md:px-12 bg-sand w-full">
        <div className="relative flex items-center justify-between w-full m-auto max-w-7xl">
          <Logo />

          {session ? (
            <SignedInNav />
          ) : (
            <div
              onClick={handleSignIn}
              className="inline-flex items-center rounded-full cursor-pointer"
            >
              <p className="mr-4 text-lg font-medium">Sign In</p>
              <button
                aria-label="sign in"
                className="p-2 font-bold text-white rounded-full bg-orange"
              >
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
