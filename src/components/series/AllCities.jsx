"use client"

import { useEffect, useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import { useWindowSize } from '@/helpers/useWindowSize'
import { getCityMeasurements} from '@/helpers'

import City from './City'
import SkateCity from './SkateCity'
import Loader from '../common/Loader'

const AllCities = ({ lng }) => {
    const [mega, setMega] = useContext(MegaContext)
    const size = useWindowSize()

    useEffect(() => {
        const cityMeasurments = getCityMeasurements(size.width, size.height)
        setMega(state => ({ ...state, cityWidth: cityMeasurments[0], cityHeight:  cityMeasurments[1]}))
    }, [size.width, size.height])

    return (
        <>
            {mega.cityWidth !== 0 ? (
                <div className="series-megacities" >
                    {mega.megacities.map((megacity, i) => {
                        if (megacity.type === 'skateboarding') {
                            return <SkateCity 
                                        skateCity={megacity} 
                                        key={megacity.slug} 
                                        cityWidth={mega.cityWidth} 
                                        cityHeight={mega.cityHeight}
                                        even={i % 2 == 0}
                                        lng={lng}
                                    />
                        } else {
                            return <City 
                                        megacity={megacity} 
                                        key={megacity.slug} 
                                        cityWidth={mega.cityWidth}
                                        cityHeight={mega.cityHeight}
                                        even={i % 2 == 0}
                                        lng={lng}
                                    />
                        }
                    })}
                </div>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default AllCities