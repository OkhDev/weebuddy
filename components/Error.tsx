import { TfiReload } from 'react-icons/tfi'

const Error = () => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center mx-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative flex flex-col w-full max-w-xl gap-4 px-8 py-10 mx-auto bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none md:gap-6 md:px-12 text-center">
          <span className="font-bold text-4xl text-red-500">Error</span>
          <span className="">
            Please restart your browser and make sure you are connected to the
            internet.
          </span>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex bg-red-400 text-white font-medium items-center w-max rounded-lg px-4 py-2 uppercase text-sm m-auto"
          >
            <TfiReload
              size={18}
              style={{ marginRight: 12, strokeWidth: 0.5 }}
            />{' '}
            Reload
          </button>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-lg"></div>
    </>
  )
}

export default Error
