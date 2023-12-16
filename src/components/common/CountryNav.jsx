"use client"

import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MegaContext } from '@/providers/megaProvider'
import Image from 'next/image'
import * as Scroll from 'react-scroll'

const CountryNav = () => {
    const [mega] = useContext(MegaContext)
    const [showCountryNav, setShowCountryNav] = useState(false)

    return (
        <div className="country-container">
            <div
                className="country-header"
                onClick={() => setShowCountryNav(!showCountryNav)}
            >
                <h3>Select Megacity</h3>
            </div>
            <AnimatePresence>
                {showCountryNav && (
                <motion.div 
                    className="country-list"
                    animate = {{
                        transition: {
                            staggerChildren: 0.05,
                            staggerDirection: 1
                        }
                    }}
                    exit = {{
                        transition: {
                            staggerChildren: 0.05,
                            staggerDirection: -1
                        }
                    }}
                >
                    {mega.shuffledMegacities.map((city, index) => {
                        return (
                            <motion.div
                                key={index} 
                                className="country-city"
                                onClick={() => {
                                    setShowCountryNav(false)
                                }}
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }}
                                exit={{
                                    opacity: 0
                                }}
                            >
                                <Scroll.Link 
                                    to={city.slug} 
                                    smooth={true} 
                                    offset={-40}
                                    className="country-nav-link" 
                                    onClick={() => {
                                        setShowCountryNav(false)
                                    }}  
                                >
                                    <Image 
                                        src={`${mega.url}/flags/${city.flag}`} 
                                        alt={`${city.country} Flag`} 
                                        width={22}
                                        height={14}    
                                    />
                                    <p>{city.name}</p>
                                </Scroll.Link>
                            </motion.div>
                        )
                    })}
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CountryNav