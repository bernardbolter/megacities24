import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useWindowSize } from '@/helpers/useWindowSize'
import { getPopulation } from '@/helpers'
import { decideCityLanguage } from '@/helpers'

import { useTranslation } from '@/app/i18n/client'

import { MegaContext } from '@/providers/megaProvider'

import ARsvg from '@/svg/AR'
import Enlarge from '@/svg/Enlarge'

const City = ({
    megacity,
    cityWidth,
    cityHeight,
    lng
}) => {
    const [mega] = useContext(MegaContext)
    const [population, setPopulation] = useState('')
    const [overlayCity, setOverlayCity] = useState('')
    const size = useWindowSize()
    const router = useRouter()
    const { t } = useTranslation(lng, ['common','about', 'cities'])

    useEffect(() => {
        setPopulation(getPopulation(megacity.cities))
    }, [megacity.cities])

    return (
        <div 
            className="city-container"
            style={{ 
                curser: megacity.completed ? "pointer" : "default",
                flexDirection: size.width < 769 ? 'column' : 'row'
            }}
        >
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
                    <h1>{t(`${megacity.slug}.name`, {ns: 'cities'})}</h1>
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
                {overlayCity.length !== 0 && (
                    <>
                        <Image
                            src={`${mega.url}${megacity.slug}/${overlayCity}/${overlayCity}_lg.gif`}
                            className="city-image-overlay"
                            alt={`overlay of ${overlayCity}`}
                            width={cityWidth}
                            height={cityHeight}
                            onClick={() => setOverlayCity('')}
                        />
                        <div
                            className="city-image-overlay-grey"
                            style={{ width: cityWidth, height: cityHeight }}
                        />
                    </>
                )}
                <Image
                    src={`${mega.url}${megacity.slug}/${megacity.slug}_lg.jpg`}
                    alt={`${megacity.name} Megacity`}
                    width={cityWidth}
                    height={cityHeight}
                />
            </div>

            <div className="city-infoContainer"
                style={{ height: size.width > 769 ? cityHeight : "unset" }}
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
                            <h1>{t(`${megacity.slug}.name`, {ns: 'cities'})}</h1>
                        </div>
                    )}
                    
                    <p className="city-info-population">{t('population')}</p>
                    
                    {megacity.cities.map(city => {
                        return (
                            <div className="city-cities" key={city.name}>
                                <div className="city-title" onClick={() => {
                                    if (overlayCity === city.slug) {
                                        setOverlayCity('')
                                    } else {
                                        setOverlayCity(city.slug)}
                                    }
                                }>
                                    <h3>{t(`${megacity.slug}.${city.slug}`, { ns: 'cities' })}</h3>
                                    <h5>{decideCityLanguage(city, lng, megacity, t)}</h5>
                                </div>
                                <h4>{t('formatedPop', { count: parseFloat(city.population.replace(/,/g, '')) })}</h4>
                            </div>
                        )
                    })}
                    <div className="city-line" />
                    <p className="city-population">{t('formatedPop', { count: parseFloat(population.replace(/,/g, '')) })}</p>
                </div>
                <div className="city-artInfo">
                    <div className="city-artText">
                        <p className="city-artSize">121{t('cm')} x 169{t('cm')}</p>
                        <div className="city-artLine" />
                        <p className="city-artSize">48{t('inch')} x 69{t('inch')}</p>
                        <p className="city-editionText">* {t('editionOf4')}</p>
                        <p className="city-artYear">{megacity.year}</p>
                    </div>

                    <div className="city-actions">
                        {size.width < 769 && (
                            <>
                                <Link
                                    className="city-ar"
                                    href={`/${lng}/ar/${megacity.slug}`}
                                >
                                    <h3>{t('viewInAR')}</h3>
                                    <ARsvg />
                                    <p>{t('ifYoureInfrontOfAPrint')}</p>
                                </Link>
                                <div className="city-actions-line" />
                            </>
                        )}

                        <Link 
                            className="city-enlarge"
                            href={`/${lng}/${megacity.slug}`}
                        >
                            <Enlarge />
                            <p>{t('enlargeMegacity')}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default City