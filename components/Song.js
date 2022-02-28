import { useRecoilState } from 'recoil'
import useSpotify from '../hooks/useSpotify'
import { convertMsToMinsAndSecs } from '../lib/convert-time'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'

function Song({ track, order }) {
  const TRACK = track.track
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(TRACK.id)
    setIsPlaying(true)
    spotifyApi.play({
      uris: [TRACK.uri],
    })
  }

  return (
    <div
      className="grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={TRACK.album.images[0].url} alt="" />
        <div>
          <p className="w-36 truncate text-white lg:w-64">{TRACK.name}</p>
          <p className="w-40">{TRACK.artists[0].name}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{TRACK.album.name}</p>
        {/* <p>{TRACK.duration_ms}</p> */}
        <p>{convertMsToMinsAndSecs(TRACK.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
