import { domAnimation, LazyMotion, motion } from 'framer-motion'
import Image from 'next/image'
import { heroDesc, socialIcons } from '../../constants'

function Header() {
  return (
    <div className="relative flex flex-col md:flex-row w-full px-6 md:px-12 max-w-7xl gap-12 pt-16 md:pt-32 mb-0 md:pb-32">
      <div className="z-10 my-auto flex flex-col md:basis-3/5 gap-8">
        <h1 className="font-extrabold text-[3.5rem] md:text-7xl leading-[1.2]">
          Pets go <span className="text-orange">wee-wee</span> on their schedule
        </h1>
        <p className="leading-[1.75] text-lg md:pr-20">{heroDesc}</p>
        <div className="flex gap-6">
          <LazyMotion features={domAnimation}>
            {socialIcons.map((social, index) => {
              const { Icon, aria } = social
              return (
                <motion.button
                  key={index}
                  aria-label={aria}
                  whileHover={{ scale: 1.1, y: -6 }}
                  className="uppercase px-5 py-3 rounded-md bg-sand w-max drop-shadow-sm text-orange"
                >
                  <Icon size={24} />
                </motion.button>
              )
            })}
          </LazyMotion>
        </div>
        <small>* Social buttons are just placeholders</small>
      </div>

      <div className="md:absolute md:bottom-0 md:right-6 z-0 flex justify-center pointer-events-none select-none">
        <Image
          src={'/images/dog.png'}
          alt={'image of dog'}
          height={392}
          width={384}
          priority
        />
      </div>
    </div>
  )
}

export default Header
