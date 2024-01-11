"use client"
import { useEffect, useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import megacities from '../../../data/megacities/megacities.json'
import { languages } from '@/app/i18n/settings'
import { getCityMeasurements } from '@/helpers'
import { useWindowSize } from '@/helpers/useWindowSize'

import Logo from '@/components/common/Logo'
import Nav from '@/components/common/Nav'
import SwitchLang from '@/components/common/SwitchLang'

import MegaNav from '@/components/megacity/MegaNav'
import MegaImage from '@/components/megacity/MegaImage'
import ImageNav from '@/components/megacity/ImageNav'
import ZoomMap from '@/components/megacity/ZoomMap'

const Megacity = ({ params: { lng, slug } }) => {
    const [mega, setMega] = useContext(MegaContext)
    const megacity = megacities.find(city => city.slug === slug)
    const size = useWindowSize()
    
    useEffect(() => {
        const cityMeasurments = getCityMeasurements(size.width, size.height)
        setMega(state => ({ ...state, cityWidth: cityMeasurments[0], cityHeight:  cityMeasurments[1]}))
    }, [size.width, size.height])

    useEffect(() => {
        let newMegaNavCities = []
        if (megacity.type === 'skateboarding') {
            megacity.spots.map(spot => {
                newMegaNavCities.push({...spot, visible: false})
            })
        } else {
            megacity.cities.map(city => {
                newMegaNavCities.push({...city, visible: false})
            })
        }
        
        console.log(newMegaNavCities)
        setMega(state => ({ ...state, megaNavCities: newMegaNavCities }))
    }, [])

    return (
        <div 
            className="megacity-container"
            style={{
                width: size.width,
                height: size.height
            }}    
        >
            {/* <Logo lng={lng} /> */}
            <Nav lng={lng} isMegacity={true} />
            <SwitchLang lng={lng} />
            <MegaNav megacity={megacity} />
            <MegaImage slug={slug} name={megacity.name} />
            <ImageNav />
            <ZoomMap 
                winWidth={size.width} 
                winHeight={size.height}
                slug={slug}
            />
        </div>
    )
}

export default Megacity

export const getStaticPaths = async () => {
    const paths = megacities.map(city =>
        languages.map(lng => ({
          params: { slug: city.slug, lng }
        }))
      )
      .flat(); // to avoid nested arrays
  
    return {
      paths,
      fallback: false,
    };
  };