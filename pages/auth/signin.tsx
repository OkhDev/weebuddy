import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const signin = () => {
  const allProviders = [
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

  return (
    <>
      <section className="flex flex-col items-start flex-1 w-full m-auto min-h-[calc(100vh-2rem)] max-w-7xl">
        <div className="flex flex-col justify-center m-auto bg-white rounded-2xl w-80 h-80 drop-shadow-sm">
          <p className="text-bold text-3xl md:text-4xl font-bold text-center pb-12">
            Sign In
          </p>
          <div className="flex flex-col gap-6 text-center w-full">
            {allProviders.map((provider, index) => {
              const { id, name, Icon } = provider
              return (
                <div key={index}>
                  <button
                    className="inline-flex items-center w-max px-5 py-3 rounded-lg bg-slate-100 gap-4"
                    onClick={() => signIn(id, { callbackUrl: '/dashboard' })}
                  >
                    <Icon size={24} />
                    {name}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default signin
