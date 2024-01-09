"use client"

import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MegaContext } from '@/providers/megaProvider'
import Image from 'next/image'
import { useTranslation } from '@/app/i18n/client'

const CountryNav = ({ lng }) => {
    const [mega, setMega] = useContext(MegaContext)
    const [showCountryNav, setShowCountryNav] = useState(false)
    const { t } = useTranslation(lng, ['common', 'cities'])

    return (
        <div className="country-container">
            <div
                className="country-header"
                onClick={() => setShowCountryNav(!showCountryNav)}
            >
                <h3>{t('selectMegacity')}</h3>
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
                                    setMega(state => ({...state, megaIndex: index}))
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
                                <Image 
                                    src={`${mega.url}/flags/${city.flag}`} 
                                    alt={`${city.country} Flag`} 
                                    width={22}
                                    height={14}    
                                />
                                <p>{t(`${city.slug}.name`, {ns: 'cities'})}</p>
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