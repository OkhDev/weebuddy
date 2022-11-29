import Image from 'next/image'
import Router from 'next/router'
import { domAnimation, LazyMotion, motion } from 'framer-motion'

function StartLogging() {
  const handleSignIn = async () => {
    Router.push('/auth/signin')
  }
  return (
    <div className="relative flex flex-col w-full justify-center">
      <div className="z-20 absolute bottom-0 left-8 hidden md:inline-block">
        <Image
          className="pointer-events-none select-none"
          src={'/images/cat.png'}
          alt={'image of cat'}
          height={256}
          width={192}
        />
      </div>
      <div className="relative z-10 flex flex-col my-auto p-12 text-center justify-center gap-4 rounded-2xl overflow-hidden">
        <div className="font-bold text-2xl md:px-44">
          Start logging your pets&apos;{' '}
          <span className="text-orange">wee&apos;s</span> today!
        </div>
        <LazyMotion features={domAnimation}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            aria-label="sign in"
            onClick={handleSignIn}
            className="uppercase px-5 py-3 rounded-md bg-sand font-medium w-max drop-shadow-sm mx-auto"
          >
            Sign In
          </motion.button>
        </LazyMotion>
        <img
          className="absolute left-0 top-0 w-full -z-10 object-center object-cover pointer-events-none"
          src="/images/circles.svg"
          alt="background of polka dots"
        />
      </div>
    </div>
  )
}

export default StartLogging
