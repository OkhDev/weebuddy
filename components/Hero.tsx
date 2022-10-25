import { motion } from 'framer-motion'
import styled from 'styled-components'
import tw from 'twin.macro'

const HelloWorld = styled(motion.div)`
  ${tw`flex items-center justify-center w-screen h-screen text-3xl font-bold`}
`

function Hero() {
  return (
    <HelloWorld
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 2 }}
      transition={{ duration: 2 }}
    >
      Hello World!
    </HelloWorld>
  )
}

export default Hero
