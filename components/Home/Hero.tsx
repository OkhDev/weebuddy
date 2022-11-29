import dynamic from 'next/dynamic'
import Header from './Header'

const DynamicLogging = dynamic(() => import('./StartLogging'), { ssr: true })
const DynamicServices = dynamic(() => import('./Services'), { ssr: true })

const Hero = (): JSX.Element => {
  return (
    <>
      <section className="relative w-full flex mt-24 justify-center">
        <img
          className="absolute left-0 top-0 -z-20 object-center object-cover pointer-events-none select-none w-full h-full"
          src="/images/circles.svg"
          alt="background of polka dots"
        />
        <Header />
      </section>
      <section className="z-10 bg-sand flex w-full justify-center">
        <div className="relative flex flex-col w-full px-6 md:px-12 max-w-7xl py-24 md:py-36 gap-24 md:gap-36">
          <DynamicServices />

          <DynamicLogging />
        </div>
      </section>
    </>
  )
}

export default Hero
