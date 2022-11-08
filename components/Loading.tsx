const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center mx-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative flex flex-col w-full max-w-xl gap-6 px-8 py-10 mx-auto bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none md:gap-8 md:px-12 text-center">
          <span className="font-bold text-3xl">Loading...</span>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-lg"></div>
    </>
  )
}

export default Loading
