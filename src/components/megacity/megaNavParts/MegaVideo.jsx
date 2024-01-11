import { useContext} from 'react'
import ReactPlayer from 'react-player'
import { MegaContext } from '@/providers/megaProvider'

import Close from '@/svg/Close'

const MegaVideo = () => {
    const [mega, setMega] = useContext(MegaContext)
    const { video, artist, title, start } = mega.megaNavInfoData

    return (
        <div className="mega-video-container">
            <ReactPlayer
                url={video}
                height={mega.megaNavWidth * .6}
                width={mega.megaNavWidth}
                config={{
                    youtube: {
                        playerVars: {
                            autoplay: true,
                            origin: 'http://localhost:3000',
                            start: start !== undefined ? start : 0
                        }
                    }
                }}
            />
            <div className="mega-video-bottom">
                <h1>{artist}</h1>
                <h2>{title}</h2>
                <div 
                    className="mega-video-close"
                    onClick={() => {
                        setMega(state => ({ ...state, megaNavVideoOpen: false}))
                    }}
                >
                    <Close />
                    <p>close</p>
                    
                </div>
            </div>
        </div>
    )
}

export default MegaVideo