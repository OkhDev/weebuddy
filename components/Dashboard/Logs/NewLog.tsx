import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { RiCloseCircleFill } from 'react-icons/ri'
import { useRecoilState } from 'recoil'
import {
  modalImage,
  modalInputs,
  modalLoading,
  modalNewLog,
} from '../../../atoms/modalAtom'
import { supportedFileTypes } from '../../../constants'
import { db, storage } from '../../../lib/firebase.config'

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

const NewLog = (): JSX.Element => {
  const { data: session } = useSession()
  const sessionName = session?.user?.name?.split(' ')[0]
  const sessionUserId = session?.user?.id
  const [inputs, setInputs] = useRecoilState(modalInputs)
  const [, setIsNewLog] = useRecoilState(modalNewLog)
  const [loading, setLoading] = useRecoilState(modalLoading)
  const [imageFile, setImageFile] = useRecoilState(modalImage)

  const [imageHover, setImageHover] = useState<boolean>(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const titleInput: number = inputs.title.replace(/\s /g, '').length

  const addImageToLog = (e: any) => {
    const reader: FileReader = new FileReader()
    const image = e.target?.files[0]
    setImageFile(image)
    const imageSize: number = image.size
    const imageType: string = image.type

    if (imageSize > 10485760) {
      toast.error('File size too large.')
      setInputs({ ...inputs, image: null })
      return
    }
    if (supportedFileTypes.indexOf(imageType) === -1) {
      toast.error('File type is not allowed.')
      setInputs({ ...inputs, image: null })
      return
    }
    try {
      if (image && imageSize <= 10485760) {
        reader.readAsDataURL(image)
        reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
          const imageSrc = readerEvent.target?.result as string
          setInputs({ ...inputs, image: imageSrc })
        }
      }
    } catch (e) {
      toast.error(`Error occurred.\n${e}`, { id: 'loading' })
    }
  }

  const uploadLog = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (loading) toast.error('Upload in progress.', { id: 'loading' })

    setLoading(true)
    setIsNewLog(false)
    toast.loading('Finalizing...', { id: 'loading' })
    try {
      const docRef = await addDoc(collection(db, `${sessionUserId}`), {
        uid: sessionUserId,
        user: sessionName,
        title: inputs.title,
        body: inputs.body,
        image: null,
        timestamp: serverTimestamp(),
      })

      if (inputs.image !== null) {
        const logImageRef = ref(storage, `${sessionUserId}/${docRef.id}/image`)
        uploadBytes(logImageRef, imageFile).then(async () => {
          const downloadURL = await getDownloadURL(logImageRef).catch((e) =>
            toast.error(`Error occurred.\n${e}`)
          )
          await updateDoc(doc(db, `${sessionUserId}`, docRef.id), {
            image: downloadURL,
          }).catch((e) => toast.error(`Error occurred.\n${e}`))
        })
      }

      setLoading(false)
      setInputs({
        title: '',
        body: '',
        image: null,
      })
      toast.success('Complete!', { id: 'loading' })
    } catch (e) {
      setLoading(false)
      toast.error(`Error occurred.\n${e}`, { id: 'loading' })
    }
  }

  const cancelLog = () => {
    setInputs({
      ...inputs,
      title: '',
      body: '',
      image: null,
    })
    setIsNewLog(false)
  }

  const chooseImage = (e: React.MouseEvent) => {
    e.preventDefault()
    imageInputRef.current?.click()
  }

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setInputs({ ...inputs, image: null })
    setImageHover(false)
  }

  return (
    <>
      <Toaster />
      <div className="relative flex flex-col justify-center w-full gap-8 px-6 py-8 bg-white md:px-10 rounded-xl min-h-max">
        <h4 className="text-xl font-bold md:text-2xl">New Log</h4>
        <hr className="border-1 border-navy-light/30" />
        <div className="flex flex-col gap-2 md:flex-row md:gap-0">
          <p className="basis-1/5 flex-col flex">
            <span className="font-bold">Title *</span>
          </p>
          <input
            type="text"
            autoFocus
            required
            value={inputs.title}
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            className="flex-1 w-full p-2 rounded-md outline-none basis-4/5 bg-slate-50 placeholder-navy-light focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-0">
          <p className="font-bold basis-1/5">Notes</p>
          <textarea
            rows={4}
            wrap="soft"
            value={inputs.body}
            onChange={(e) => setInputs({ ...inputs, body: e.target.value })}
            className="flex-1 w-full p-2 rounded-md outline-none basis-4/5 bg-slate-50 placeholder-navy-light focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-0">
          <p className="font-bold basis-1/5">Image</p>
          {inputs.image === null ? (
            <div className="items-center flex flex-col md:flex-row gap-6 w-full ml-0 md:ml-10">
              <button
                aria-label="choose image"
                onClick={chooseImage}
                className="bg-orange-lightest w-max px-6 py-2.5 font-medium text-orange rounded-full select-none outline-none focus:outline-none text-sm"
              >
                Choose Image
              </button>
              <input
                ref={imageInputRef}
                type="file"
                onChange={addImageToLog}
                className="hidden"
              />
              <small>PNG, JPG, JPEG, or HEIC &mdash; (10 MB max)</small>
            </div>
          ) : (
            <motion.div
              onHoverStart={() => setImageHover(true)}
              onHoverEnd={() => setImageHover(false)}
              className="relative rounded-md cursor-pointer overflow-hidden w-full md:max-w-[40%]"
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
                src={inputs.image}
                alt="selected image"
                className="w-full h-full"
              />
            </motion.div>
          )}
        </div>

        <div className="flex items-center justify-center md:justify-end gap-6 mt-4">
          <button
            aria-label="create log"
            disabled={titleInput <= 5}
            className={`${
              titleInput <= 5
                ? 'bg-orange-light cursor-not-allowed border-orange-light'
                : 'bg-orange border-orange'
            } w-32 px-4 py-2 font-medium text-white rounded-md select-none outline-none focus:outline-none uppercase text-sm border-2`}
            onClick={uploadLog}
          >
            Create Log
          </button>
          <button
            aria-label="cancel"
            className="w-32 px-4 py-2 text-sm font-medium uppercase border-2 rounded-md outline-none select-none border-orange text-orange focus:outline-none"
            onClick={cancelLog}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default NewLog
