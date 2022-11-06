import { GetServerSideProps } from 'next'
import { getProviders, getSession, signIn } from 'next-auth/react'

const signin = ({ providers }: any) => {
  return (
    <section className="flex flex-col items-start flex-1 w-full mx-auto max-w-7xl mt-28">
      <div className="w-full pt-2">
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button
              className=""
              onClick={() => signIn(provider.id, { callbackUrl: '/dashboard' })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </section>
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
