import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer'
import Hero from '../components/Home/Hero'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>WeeBuddy</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="WeeBuddy is a web application that stores wee logs for when your pet goes for a bathroom break."
        />
      </Head>
      <Hero />
      <Footer />
    </>
  )
}

export default Home
