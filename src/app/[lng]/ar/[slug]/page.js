"use client"

import { useEffect, useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import megacities from '@/data/megacities/megacities.json'
import { languages } from '@/app/i18n/settings'
import { useWindowSize } from '@/helpers/useWindowSize'

const Megacity = ({ params: { lng, slug } }) => {
    const [mega, setMega] = useContext(MegaContext)
    const megacity = megacities.find(city => city.slug === slug)
    const size = useWindowSize()

    return (
        <div 
            className="megacity-container"
            style={{
                width: size.width,
                height: size.height
            }}    
        >
            <h1>{megacity.name} in AR</h1>
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
    }
  }