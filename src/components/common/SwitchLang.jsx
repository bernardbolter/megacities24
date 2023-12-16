"use client"

import { useState, useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import { usePathname, useRouter } from 'next/navigation'
import Lang from '@/svg/Lang'
import { languages } from '@/app/i18n/settings'

import { returnFlag } from '@/helpers'

const SwitchLang = ({ lng }) => {
    const [mega] = useContext(MegaContext)
    const { push } = useRouter()
    const pathname = usePathname()

    const [menuOpen, setMenuOpen] = useState(false)

    const handleChange = l => {
        const shortLink = pathname.substring(3)
        push(`/${l}/${shortLink}`)
        setMenuOpen(false)
    }

    return (
        <div className="switch-lang-container">
            <div 
                className="switch-lang-icon"
                onClick={() => setMenuOpen(!menuOpen)}    
            >
                <Lang />
            </div>
            {menuOpen && (
                <ul className="switch-menu">
                    {languages.map(lang => {
                        if (lang !== lng) {
                            return (
                                <li 
                                    key={lang}
                                    className='switch-menu-item'
                                    onClick={() => {
                                        console.log("change lang")
                                        handleChange(lang)
                                    }}    
                                >
                                    <img src={`${mega.url}${returnFlag(lang)}`} alt={`flag of ${lang}`} />
                                </li>
                            )
                        }
                    })}
                </ul>
            )}
        </div>
    )
}

export default SwitchLang