import Head from 'next/head'
const Loading = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
        <meta
          name="description"
          content="Loading is displayed when the dashboard is trying to load in user information."
        />
      </Head>
      <div className="fixed inset-0 z-50 flex items-center justify-center mx-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative flex flex-col w-full max-w-xl gap-6 px-8 py-10 mx-auto outline-none focus:outline-none md:gap-8 md:px-12 text-center">
          <span className="font-bold text-4xl">Loading...</span>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-sand"></div>
    </>
  )
}

export default Loading
