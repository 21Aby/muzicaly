import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from '../components/Songs'

const bgColors = [
  'from-red-500',
  'from-purple-500',
  'from-green-500',
  'from-blue-500',
  'from-indigo-500',
  'from-yellow-500',
]

function Main() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()

  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  const [bgColor, setBgColor] = useState(null)

  useEffect(() => {
    setBgColor(shuffle(bgColors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => console.error(err))
  }, [spotifyApi, playlistId])

  return (
    <div className="scrollbar-hide h-screen flex-grow overflow-y-scroll">
      <header className="absolute top-5 right-8">
        <div
          className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-70"
          onClick={signOut}
        >
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b p-8 ${bgColor} to-black text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>
            <p>PLAYLIST</p>
            <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
              {playlist?.name}
            </h1>
          </p>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Main
