import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'

interface IModalInputs {
  title: string
  body?: string
  image?: null | string
}

interface IUpdateLogModal extends IModalInputs {
  updateModalInputs: IModalInputs
  setUpdateModalInputs: (e: IModalInputs) => void
  updateImageLog: (e: any) => void
  updateLog: (e: React.MouseEvent) => void
  cancelUpdateLog: (e: React.MouseEvent) => void
}

const ImageHover = {
  close: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
}

export default function Modal({
  updateModalInputs,
  setUpdateModalInputs,
  updateImageLog,
  updateLog,
  cancelUpdateLog,
}: IUpdateLogModal) {
  const [imageHover, setImageHover] = useState<boolean>(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const titleInput: number = updateModalInputs.title.replace(/ /g, '').length

  const chooseImage = (e: React.MouseEvent) => {
    e.preventDefault()
    imageInputRef.current?.click()
  }

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setUpdateModalInputs({ ...updateModalInputs, image: null })
    setImageHover(false)
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center mx-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative flex flex-col w-full max-w-3xl gap-6 px-8 py-10 mx-auto bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none md:gap-8 md:px-12">
          <form className="relative flex flex-col justify-center w-full gap-8 bg-white rounded-xl min-h-max">
            <h4 className="text-xl font-bold md:text-2xl">Update Log</h4>
            <hr className="border-1 border-navy-light/30" />
            <div className="flex flex-col gap-2 md:flex-row md:gap-0">
              <p className="font-bold basis-1/5">Title</p>
              <input
                type="text"
                required
                autoFocus
                value={updateModalInputs.title}
                onChange={(e) =>
                  setUpdateModalInputs({
                    ...updateModalInputs,
                    title: e.target.value,
                  })
                }
                className="flex-1 w-full p-2 rounded-md outline-none basis-4/5 bg-slate-50 placeholder-navy-light focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-0">
              <p className="font-bold basis-1/5">Notes</p>
              <textarea
                rows={4}
                wrap="soft"
                value={updateModalInputs.body}
                onChange={(e) =>
                  setUpdateModalInputs({
                    ...updateModalInputs,
                    body: e.target.value,
                  })
                }
                className="flex-1 w-full p-2 rounded-md outline-none basis-4/5 bg-slate-50 placeholder-navy-light focus:outline-none"
              />
            </div>
            <div className="relative flex flex-col gap-2 md:flex-row md:gap-0">
              <p className="font-bold basis-1/5">Image</p>
              {updateModalInputs.image === null ? (
                <div className="items-center flex flex-col md:flex-row gap-6 w-full ml-0 md:ml-6">
                  <button
                    onClick={chooseImage}
                    className="bg-orange-lightest w-max px-6 py-2.5 font-medium text-orange rounded-full select-none outline-none focus:outline-none text-sm"
                  >
                    Choose Image
                  </button>
                  <input
                    ref={imageInputRef}
                    type="file"
                    onChange={updateImageLog}
                    className="hidden"
                  />
                  <small>PNG, JPG, JPEG, or HEIC &mdash; (10 MB max)</small>
                </div>
              ) : (
                <motion.div
                  onHoverStart={() => setImageHover(true)}
                  onHoverEnd={() => setImageHover(false)}
                  className="relative w-full rounded-md cursor-pointer overflow-hidden md:max-w-[40%]"
                  onClick={removeImage}
                >
                  <motion.div
                    variants={ImageHover}
                    initial={{ opacity: 0 }}
                    animate={imageHover ? 'open' : 'close'}
                    className="absolute inset-0 w-full h-full bg-red-400/30"
                  >
                    <span className="text-red-400 flex items-center justify-center h-full">
                      <RiCloseCircleFill size={56} />
                    </span>
                  </motion.div>
                  <img
                    src={updateModalInputs.image}
                    alt="newly selected image"
                    className="w-full max-h-96"
                  />
                </motion.div>
              )}
            </div>
          </form>
          <div className="flex items-center justify-center md:justify-end gap-4 md:gap-6">
            <button
              disabled={titleInput <= 5}
              className={`${
                titleInput <= 5
                  ? 'bg-orange-light cursor-not-allowed border-orange-light'
                  : 'bg-orange border-orange'
              } px-4 py-2 text-sm font-bold text-white uppercase border-2 rounded-md outline-none focus:outline-none select-none`}
              type="button"
              onClick={updateLog}
            >
              Update
            </button>
            <button
              className="px-4 py-2 text-sm font-bold uppercase border-2 rounded-md outline-none text-orange border-orange focus:outline-none select-none"
              type="button"
              onClick={cancelUpdateLog}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-lg"></div>
    </>
  )
}
