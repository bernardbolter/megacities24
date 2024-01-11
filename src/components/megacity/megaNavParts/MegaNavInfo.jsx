import { useContext } from'react'
import { MegaContext } from '@/providers/megaProvider'

import MegaVideo from './MegaVideo'

import YouTube from '@/svg/YouTube'
import Close from '@/svg/Close'
import EyeOpen from '@/svg/EyeOpen'
import EyeClosed from '@/svg/EyeClosed'

const MegaNavInfo = ({ megacity }) => {
    const [mega, setMega] = useContext(MegaContext)
    console.log(mega.megaNavInfoData)
    
    return (
        <div 
            className="mega-mav-info"
            style={{ width: mega.megaNavWidth }}
        >
            {mega.megaNavVideoOpen ? (
                    <MegaVideo />
                ) : (
                <>
                    <div className="mega-link-left">
                        {megacity.type === 'skateboarding' ? (
                            <h1 className="skate-name">{mega.megaNavInfoData.name}</h1>
                        ) : (
                            <h1><span className="no-break">{mega.megaNavInfoData.name}</span> {mega.megaNavInfoData.englishName ? <span className="english-name">{mega.megaNavInfoData.englishName}</span> : null}</h1>
                        )}
                        {mega.megaNavInfoData.video !== undefined && mega.megaNavInfoData.video.length !== 0 ? (
                            <div 
                                className="mega-nav-info-video"
                                onClick={() => {
                                    setMega(state => ({ ...state, megaNavVideoOpen: false}))
                                }}
                            >
                                <YouTube />
                                <p>video</p>
                            </div>
                        ) : null}
                    </div>
                    <div className="mega-nav-info-right">
                        <div 
                            className="mega-nav-info-close"
                            onClick={() => {
                                console.log("close info")
                                setMega(state => ({ ...state, megaNavInfoData: {}, megaNavInfoOpen: false }))
                            }}    
                        >
                            <p>close</p>
                            <Close />
                        </div>
                        {megacity.type === 'skateboarding' ? (
                            <div className="mega-nav-info-right-data">
                                <h3>{mega.megaNavInfoData.city}</h3>
                                <h4>{mega.megaNavInfoData.state}</h4>
                            </div>
                        ) : (
                            <div className="mega-nav-info-right-data">
                                <h5>population</h5>
                                <h2>{mega.megaNavInfoData.population}</h2>
                            </div>
                        )}
                        <div 
                            className="mega-nav-info-eye"
                            onClick={() => console.log('mega nav info eye')}
                        >
                            {mega.megaNavInfoData.visible ? <EyeOpen /> : <EyeClosed />}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MegaNavInfo