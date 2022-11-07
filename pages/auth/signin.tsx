import { GetServerSideProps } from 'next'
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  signIn,
} from 'next-auth/react'

interface IProviders {
  providers: { [s: string]: ClientSafeProvider } | ArrayLike<ClientSafeProvider>
}

const signin = ({ providers }: IProviders) => {
  return (
    <>
      <section className="flex flex-col items-start flex-1 w-full m-auto min-h-[calc(100vh-7rem)] max-w-7xl">
        <div className="flex flex-col justify-center m-auto bg-white rounded-2xl px-36 py-24 drop-shadow-sm">
          <p className="text-bold text-3xl md:text-4xl font-bold text-center pb-12">
            Sign In
          </p>
          <div className="flex flex-col gap-6 text-center w-full">
            {Object.values(providers).map((provider: ClientSafeProvider) => (
              <div key={provider.name}>
                <button
                  type="button"
                  className="bg-orange text-white text-lg font-medium px-4 py-3 rounded-xl outline-none focus:outline-none select-none w-32"
                  onClick={() =>
                    signIn(provider.id, { callbackUrl: '/dashboard' })
                  }
                >
                  {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default signin

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context)
  const providers = await getProviders()

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
      providers,
    },
  }
}
