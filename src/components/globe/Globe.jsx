import { useState, useEffect, useRef, useContext, useMemo } from 'react'
import Globe from 'react-globe.gl'
import { useRouter } from 'next/navigation'
import { useWindowSize } from '@/helpers/useWindowSize'
import { useTranslation } from '@/app/i18n/client'

import WorldGeo from '../../data/world/allWorld.json'
import SkateGeo from '../../data/world/skateWorld.json'
import { MegaContext } from '@/providers/megaProvider'

const MegaGlobe = ({ lng }) => {
    const globeEl = useRef()
    const [mega, setMega] = useContext(MegaContext)
    const [hoverD, setHoverD] = useState('noHover')
    const [firstLoad, setFirstLoad] = useState(true)
    const [allMegas, setAllMegas] = useState([])
    const [skateMegas, setSkateMegas] = useState([])
    const size = useWindowSize()
    const { push } = useRouter()
    const { t } = useTranslation(lng, 'common')

    const nightSky = "https://digitalcityseries.com/art/megacities/web/night-sky.png"
    const megaGlobe = "https://digitalcityseries.com/art/megacities/web/mega-globe.jpg"
    const skateGlobe = "https://digitalcityseries.com/art/megacities/web/skate-globe.jpg"

    useEffect(() => {
        var onlyCities = mega.megacities.filter(mega => mega.slug !== 'skate-city')
        var onlySkate = mega.megacities.filter(skate => skate.type === 'skateboarding')
        setAllMegas([])
        setSkateMegas([])
        onlyCities.map(city => {
          var megaObject = mega.megacities.filter(mega => mega.slug === city.slug)
          var countryObject = WorldGeo.filter(geo => geo.slug === city.slug)
          var combined = {...megaObject[0], ...countryObject[0]}
          
          return setAllMegas(prevArray => [...prevArray, combined])
        })
        onlySkate.map(skate => {
            var skateObject = mega.megacities.filter(skateMega => skateMega.slug === skate.slug)
            var skateSpotObject = SkateGeo.filter(skateGeo => skateGeo.slug === skate.slug)
            var skateCombined = {...skateObject[0], ...skateSpotObject[0]}

            return setSkateMegas(prevArray => [...prevArray, skateCombined])
        })
      }, [mega.megacities])

    useEffect(() => {
        if (globeEl.current !== undefined && size.width !==0) {
            var alt = size.width < 600 ? 3.5 : 2.5
            if (hoverD === 'noHover') {
                globeEl.current.controls().autoRotate = true
                globeEl.current.controls().autoRotateSpeed = 0.5
                if (firstLoad) {
                    globeEl.current.pointOfView({ lat: 39.6, lng: -98.5, altitude: alt })
                    setFirstLoad(false)
                } 
            } else {
                globeEl.current.controls().autoRotate = false
            }
        }
    }, [globeEl.current, hoverD, size.width]);

    const globeImage = useMemo(() => {
        if (mega.megaGlobe) {
            return megaGlobe
        } else {
            return skateGlobe
        }
    }, [mega.megaGlobe])

    const globeGeo = useMemo(() => {
        if (mega.megaGlobe) {
            return allMegas
        } else {
            return skateMegas
        }
    })

    const makePop = (cities) => {
        var totalPopulation = 0
        cities.map(city => {
            return totalPopulation = totalPopulation + parseInt(city.population.replace(/,/g, ''), 10)
        })
        return totalPopulation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return (
        <Globe
            ref={globeEl}
            width={size.width}
            height={size.height}
            onGlobeReady={() => {
                console.log('globe fired')
                setMega(state => ({ ...state, worldReady: true }))}
            }
            globeImageUrl={globeImage}
            backgroundImageUrl={nightSky}
            lineHoverPrecision={0}
            labelLabel={() => "the one"}
            pointOfView={{ lat: 39.6, lng: -98.5, altitude: 1 }}
            polygonsData={globeGeo}
            polygonAltitude={0.01}
            polygonCapColor={() => 'transparent'}
            polygonSideColor={() => 'rgba(255, 255, 255, 0.1)'}
            polygonStrokeColor={() => 'transparent'}
            polygonLabel={({ name, cities, spots, type }) => {
                if (type === 'skateboarding') {
                    return (`
                    <div class="globe-label">
                        <h5>${name}</h5>
                        <p>${t('skateSpots')}:</p>
                        <h4>${spots.length}</h4>
                    </div>
                    `)
                } else {
                    return (`
                        <div class="globe-label">
                            <h5>${name}</h5>
                            <p>${t('population')}</p>
                            <h4>${makePop(cities)}</h4>
                        </div>
                    `)
                }
            }}
            onPolygonHover={p => {
                p === null ? setHoverD('noHover') : setHoverD(p)
            }}
            onPolygonClick={({ slug }) => {
                console.log(slug)
                setMega(state => ({ ...state, megaIndexSlug: slug }))
                push(`/${lng}/series`)
            }}
        />
    )
}

export default MegaGlobe;