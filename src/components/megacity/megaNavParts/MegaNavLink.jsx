import { useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'

import EyeOpen from '@/svg/EyeOpen'
import EyeClosed from '@/svg/EyeClosed'

const MegaNavLink = ({ 
    cityInfo, 
    linkIndex, 
    megaNavWidth,
    skateboarding
}) => {
    // console.log(cityInfo)

    const [mega, setMega] = useContext(MegaContext)
    const background = (linkIndex % 2 === 0) ? "mega-nav-link even" : "mega-nav-link odd";

    return (
        <div 
            className={background} 
            style={{ 
                width: megaNavWidth,
                height: skateboarding ? 34 : 39
            }}
            onClick={() => {
                var newCities = [...mega.megaNavCities]
                var newViewOverlay
                if (newCities[linkIndex].visible === true) {
                    console.log('its true')
                    newCities.forEach(city => {
                        return city.visible = false
                    })
                    newViewOverlay = false
                } else {
                    newCities.forEach(city => {
                        return city.visible = false
                    })
                    newCities[linkIndex].visible = true
                    newViewOverlay = true
                }
                setMega(state => ({ 
                    ...state, 
                    megaNavInfoData: cityInfo,
                    megaNavInfoOpen: true,
                    megaNavVideoOpen: true,
                    overlaySlug: cityInfo.slug,
                    viewOverlay: newViewOverlay,
                    megaNavCities: newCities,
                    megaNavInfoData: cityInfo
                }))
            }}
        >
            <div 
                className="mega-link-text"
                style={{ justifyContent: skateboarding ? 'space-between' : 'flex-start'}}
            >   
                {skateboarding ? (
                    <>
                        <h3>{cityInfo.name}</h3>
                        <h4>{cityInfo.city}</h4>
                    </>
                ) : (
                    <>
                        <h1>{cityInfo.name} {cityInfo.englishName ? <span>{cityInfo.englishName}</span> : null}</h1>
                        <h2>{cityInfo.population}</h2>
                    </>
                )}
                
            </div>
            <div 
                className="mega-link-eye"
                style={{
                    height: skateboarding ? 34 : 39
                }}
            >
                {cityInfo.visible ? <EyeOpen /> : <EyeClosed />}
            </div>
        </div>
    )
}

export default MegaNavLink