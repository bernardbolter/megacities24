"use client"

import { useState, useEffect, useContext, useRef, useLayoutEffect, useCallback, useMemo } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import { useWindowSize } from '@/helpers/useWindowSize'

import City from './City'
import SkateCity from './SkateCity'
import Loader from '../common/Loader'
import Arrow from '@/svg/Arrow'
import Horoscroll from '@/svg/Horoscroll'

const AllCities = ({ lng }) => {
    const [mega, setMega] = useContext(MegaContext)
    const size = useWindowSize()
    const [cityWidth, setCityWidth] = useState(0)
    const [megaWidth, setMegaWidth] = useState(0)
    const [ alignCenter, setAlignCenter] = useState(false)
    const [ cityHeight, setCityHeight] = useState(0)
    const [showHoroScroll, setShowHoroScroll] = useState(true)
    const [showScrollLeft, setShowScrollLeft] = useState(false)
    const [showScrollRight, setShowScrollRight] = useState(false)
    const [viewScrollNavigation, setViewScrollNavigation] = useState(true)
    const megaRef = useRef(null)

    const showScrollNavigation = deltaY => {
        if (viewScrollNavigation) {
            setViewScrollNavigation(false)
            if (deltaY < 0) {
                if (mega.megaIndex !== mega.megacities.length - 1) {
                    setShowScrollRight(true)
                    setTimeout(() => {
                        setShowScrollRight(false)
                    }, 2000)
                }
                setViewScrollNavigation(true)
            } else {
                if (mega.megaIndex !== 0) {
                    setShowScrollLeft(true)
                    setTimeout(() => {
                        setShowScrollLeft(false)
                    }, 2000)
                }
                setViewScrollNavigation(true)
            }
        }
    }

    useEffect(() => {
        if (size.height !== 0) {
            var getCityWidth = Math.round((size.height - 100) * 0.714285143)
            if (getCityWidth > (size.width * .9)) {
                setCityWidth(size.width * .9)
                setCityHeight((size.width * .9) * 1.39875)
                setAlignCenter(true)
            } else {
                setCityWidth(getCityWidth)
                setCityHeight(getCityWidth * 1.39875)
                setAlignCenter(false)
            }
            var getMegaWidth
            if (alignCenter) {
                getMegaWidth = Math.round((mega.megacities.length * getCityWidth) + ((mega.megacities.length * 170) + 60))
            } else {
                getMegaWidth = Math.round((mega.megacities.length * getCityWidth) + ((mega.megacities.length * 285) + 300))
            }
            setMegaWidth(getMegaWidth)
        }

        return () => {
            getCityWidth = 0
            getMegaWidth = 0
        }
    }, [mega.megacities, size, alignCenter])

    useEffect(() => {
        var megaMeasurement = cityWidth + 290
        window.scrollTo({
            left: mega.megaIndex * megaMeasurement,
            behavior: 'smooth'
        })

        return () => null
    }, [mega.megaIndex, mega.megacities, cityWidth])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log('hide')
            setShowHoroScroll(false)
        }, 4000);
    
        return () => clearTimeout(timeoutId);
      }, []);

    return (
        <>
            {showHoroScroll && (
                <div 
                    className="horoscroll-container"
                    onClick={() => setMega(state => ({ ...state, megaIndex: state.megaIndex - 1 }))}
                >
                    <Horoscroll />
                </div>
            )}
            {showScrollLeft && (
                <div className="megaseries-scrollleft-container">
                    <Arrow />
                </div>
            )}
            {cityWidth !== 0 && megaWidth !== 0 ? (
                <div
                    className="series-megacities" 
                    style={{ height: cityHeight }}
                    ref={megaRef}
                    onWheel={(e) => showScrollNavigation(e.deltaY)}
                >
                        {mega.megacities.map(megacity => {
                            if (megacity.type === 'skateboarding') {
                                return <SkateCity 
                                            skateCity={megacity} 
                                            key={megacity.slug} 
                                            cityWidth={cityWidth} 
                                            cityHeight={cityHeight}
                                            lng={lng}
                                        />
                            } else {
                                return <City 
                                            megacity={megacity} 
                                            key={megacity.slug} 
                                            cityWidth={cityWidth}
                                            cityHeight={cityHeight}
                                            lng={lng}
                                        />
                            }
                        })}
                        <div className="city-extra" style={{ height: cityHeight, width: cityWidth }} />
                </div>
            ) : (
                <Loader />
            )}
            {showScrollRight && (
                <div 
                    className="megaseries-scrollright-container"
                    onClick={() => setMega(state => ({ ...state, megaIndex: state.megaIndex + 1 }))}    
                >
                    <Arrow />
                </div>
            )}
            {size.width > 769 && (
                <div className="series-bottom">
                    <div className={mega.megaIndex > 0 ? "series-bottomLeft" : "series-bottomLeftDisabled"}
                        onClick={() => mega.megaIndex > 0 ? setMega(state => ({ ...state, megaIndex: state.megaIndex - 1})) : null}
                        onKeyDown={(ev) => {
                            if (ev.keyCode === 13 && mega.megaIndex > 0) {
                                setMega(state => ({ ...state, megaIndex: state.megaIndex - 1}))
                            }
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        {mega.megaIndex > 0 && (
                            <>
                                <div className="series-arrowsLeft">
                                    <Arrow />
                                    <Arrow />
                                    <Arrow />
                                </div>
                                <div className="series-lineLeft" />
                            </>
                        )}
                        
                    </div>
                    <div 
                        className={mega.megaIndex !== mega.megacities.length - 1 ? "series-bottomRight" : "series-bottomRightDisabled"}
                        onClick={() => {
                            mega.megaIndex !== mega.megacities.length -1 ? setMega(state => ({ ...state, megaIndex: state.megaIndex + 1})) : null 
                        }}
                        onKeyDown={(ev) => {
                            if (ev.keyCode === 14 && mega.megaIndex !== mega.megacities.length -1) {
                                setMega(state => ({ ...state, megaIndex: state.megaIndex + 1})) 
                            }
                        }}
                        role="button"
                        tabIndex={-1}
                    >
                    {mega.megaIndex !== mega.megacities.length - 1 && (
                        <>
                            <div className="series-lineRight" />
                            <div className="series-arrowsRight">
                                <Arrow />
                                <Arrow />
                                <Arrow />
                            </div>
                        </>
                    )}
                    </div>
                    <p 
                        className="series-scrollRight"
                        style={{
                            left: (size.width / 2) + 30
                        }}
                    >scroll right</p>
                </div>
            )}
        </>
    )
}

export default AllCities