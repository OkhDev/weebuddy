import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs'
import { FaCloud, FaDog, FaEye, FaLock, FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export const heroDesc =
  "Pets are our family members and they're important to us. They deserve to have their needs met just as much as we want to meet ours."

export const socialIcons = [
  {
    Icon: BsFacebook,
    aria: 'facebook',
  },
  {
    Icon: BsTwitter,
    aria: 'twitter',
  },
  {
    Icon: BsInstagram,
    aria: 'instagram',
  },
]

export const supportedFileTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/heic',
]

export const serviceInfo = [
  {
    Icon: FaLock,
    title: 'Secure',
    color: 'bg-blue-400',
  },
  {
    Icon: FaCloud,
    title: 'Cloud Storage',
    color: 'bg-red-400',
  },
  {
    Icon: FaEye,
    title: 'Accessible',
    color: 'bg-emerald-400',
  },
  {
    Icon: FaDog,
    title: 'Pet Friendly',
    color: 'bg-yellow-400',
  },
]

export const serviceText =
  "WeeBuddy is used to monitor and track your pets' bathroom habits. The easy-to-use interface allows you to log when you feed them, clean their cages, let them out into the yard, or take them out on walks. You can also add notes and images about any concerns or problems they might be having. Even better, just upload an image of how happy your pet is!"

export const allProviders = [
  {
    id: 'github',
    name: 'GitHub',
    Icon: FaGithub,
  },
  {
    id: 'google',
    name: 'Google',
    Icon: FcGoogle,
  },
]
