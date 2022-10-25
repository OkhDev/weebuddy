import type { NextPage } from 'next'
import Hero from '../components/Hero'
import { NextSeo } from 'next-seo'

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Webpage Title" description="A short description here." />

      <Hero />
    </>
  )
}

export default Home
