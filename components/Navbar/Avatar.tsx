import React from 'react'
import { useSession } from 'next-auth/react'

type Props = {
  small?: boolean
  large?: boolean
  navbar?: boolean
}

const Avatar = ({ small, large, navbar }: Props): JSX.Element => {
  const { data: session } = useSession()

  return (
    <div
      className={`overflow-hidden w-24 h-24 bg-orange-lightest cursor-pointer rounded-xl ${
        large && 'h-28 w-28'
      } ${small && 'h-8 w-8'} ${navbar && 'h-12 w-12 ml-2 mb-4'}`}
    >
      <img
        src={
          session
            ? `${session?.user?.image}`
            : `https://avatars.dicebear.com/api/open-peeps/${'rando'}.svg`
        }
        alt={`${session?.user?.name || ''} profile image`}
      />
    </div>
  )
}

export default Avatar
