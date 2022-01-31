import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'

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

  const [bgColor, setBgColor] = useState(null)
  useEffect(() => {
    setBgColor(shuffle(bgColors).pop())
  }, [])

  return (
    <div className="flex-grow ">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-gray-300 bg-black p-1 pr-2 opacity-90 hover:opacity-70">
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
        className={`padding-8 flex h-80 items-end space-x-7 bg-gradient-to-b ${bgColor} to-black text-white`}
      >
        {/* <img src=""/> */}
      </section>
    </div>
  )
}

export default Main
