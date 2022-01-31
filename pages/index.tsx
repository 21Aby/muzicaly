import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Muzicaly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <Sidebar />
        <Main />
      </main>
    </div>
  )
}
