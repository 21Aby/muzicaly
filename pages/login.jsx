import { getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">

      <div className="text-white p-5">
      © MUZICALY
      </div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className="bg-[#18D860] rounded-full p-5 text-white"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
