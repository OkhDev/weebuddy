import { signIn } from 'next-auth/react'
import { allProviders } from '../../constants'

function Providers() {
  return (
    <div className="flex flex-col gap-6 text-center w-full">
      {allProviders.map((provider, index) => {
        const { id, name, Icon } = provider
        return (
          <div key={index}>
            <button
              aria-label="sign in"
              className="inline-flex items-center w-max px-5 py-3 rounded-lg bg-slate-100 gap-4"
              onClick={(e) => {
                e.preventDefault()
                signIn(id, { callbackUrl: '/dashboard' })
              }}
            >
              <Icon size={24} />
              {name}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Providers
