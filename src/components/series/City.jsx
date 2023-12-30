import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useWindowSize } from '@/helpers/useWindowSize'
import { getPopulation } from '@/helpers'
import * as Scroll from 'react-scroll'

import { useTranslation } from '@/app/i18n/client'

import { MegaContext } from '@/providers/megaProvider'

const City = ({
    megacity,
    cityWidth,
    cityHeight,
    even,
    lng
}) => {
    const [mega] = useContext(MegaContext)
    const [population, setPopulation] = useState('')
    const [overlayCity, setOverlayCity] = useState('')
    const size = useWindowSize()
    const router = useRouter()
    const { t } = useTranslation(lng, ['common','about', 'cities'])
    console.log("city: ", t('deutsche-stadt.munich', {ns: 'cities'}))

    useEffect(() => {
        setPopulation(getPopulation(megacity.cities))
    }, [megacity.cities])

    return (
        <div 
            className="city-container"
            style={{ 
                curser: megacity.completed ? "pointer" : "default",
                flexDirection: size.width < 768 ? 'column' : even ? 'row' : 'row-reverse'
            }}
        >
            <Scroll.Element name={megacity.slug} />
            {size.width < 769 && (
                <div className="city-header">
                    <div className="city-flag">
                        <Image 
                            src={`${mega.url}flags/${megacity.flag}`} 
                            alt={`${megacity.country} Flag`}
                            width={22}
                            height={14}
                        />
                    </div>
                    <h1>{megacity.name}</h1>
                </div>
            )}
            
            <div 
                className="city-image"
                style={{ 
                    width: cityWidth,
                    height: cityHeight
                }}
                onClick={() => {
                    router.push(`/${megacity.slug}`)
                }}
            >
                <Image
                    src={`${mega.url}${megacity.slug}/${megacity.slug}_lg.jpg`}
                    alt={`${megacity.name} Megacity`}
                    width={cityWidth}
                    height={cityHeight}
                />
            </div>

            <div className="city-infoContainer"
                style={{ height: size.height > 769 ? cityHeight : "auto" }}
            >
                <div className="city-info">
                    {size.width > 768 && (
                        <div className="city-header">
                            <div className="city-flag">
                                <Image 
                                    src={`${mega.url}flags/${megacity.flag}`} 
                                    alt={`${megacity.country} Flag`}
                                    width={22}
                                    height={14}
                                />
                            </div>
                            <h1>{megacity.name}</h1>
                        </div>
                    )}
                    
                    {megacity.cities.map(city => {
                        return (
                            <div className="city-cities" key={city.name}>
                                <div className="city-title" onClick={() => setOverlayCity(city.slug)}>
                                    <h3>{city.name}</h3>
                                    {city.name !== city.englishName ? <h5>{city.englishName}</h5> : null}
                                </div>
                                <h4>{city.population}</h4>
                            </div>
                        )
                    })}
                    <div className="city-line" />
                    <p className="city-population">{population}</p>
                </div>
                <div className="city-artInfo">
                    <div className="city-artText">
                        <p className="city-artSize">121cm x 169cm</p>
                        <div className="city-artLine" />
                        <p className="city-artSize">48&quot; x 69&quot;</p>
                        <p className="city-artYear">{megacity.year}</p>
                    </div>
                    <div className="city-enlarge">
                        <svg viewBox="0 0 58 59">
                            <path d="M30.353 14.646H42.28L25.789 31.136H0.0979919V33.591V43.413V51.6V58.4H6.89899H15.085H24.907H27.36V34.373L44.685 17.051V28.979H48.085V11.246H30.353V14.646ZM23.959 55H15.084H6.89799H3.49799V51.6V43.414V34.537H23.959V55Z" />
                            <path d="M42.914 55H33.092V58.4H42.914V55Z" />
                            <path d="M54.5 55H51.1V58.4H57.9V51.6H54.5V55Z" />
                            <path d="M57.9 33.592H54.5V43.414H57.9V33.592Z" />
                            <path d="M57.9 15.584H54.5V25.406H57.9V15.584Z" />
                            <path d="M51.1 3.99799H54.5V7.39599H57.9V0.597992H51.1V3.99799Z" />
                            <path d="M42.914 0.597992H33.092V3.99799H42.914V0.597992Z" />
                            <path d="M24.906 0.597992H15.084V3.99799H24.906V0.597992Z" />
                            <path d="M3.49799 3.99799H6.89799V0.597992H0.0979919V7.39599H3.49799V3.99799Z" />
                            <path d="M3.49799 15.582H0.0979919V25.404H3.49799V15.582Z" />
                        </svg>
                        <p>Enlarge Megacity</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default City