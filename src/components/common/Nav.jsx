"use client"

import { useState, useContext, useEffect } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { useWindowSize } from '@/helpers/useWindowSize'

import Link from 'next/link'

import Globe from '@/svg/Globe'
import Cancel from '@/svg/Cancel'

const Nav = ({ lng, isMegacity }) => {
    const [mega, setMega] = useContext(MegaContext)
    const size = useWindowSize()
    const [navOpen, setNavOpen] = useState(true)
    const [currentPath, setCurrentPath] = useState('')
    const pathname = usePathname()
    const { t } = useTranslation(lng, 'common')

    useEffect(() => {
        if (pathname.length < 4) {
            setCurrentPath('/')
        } else {
            setCurrentPath(pathname.substring(3))
        }
    }, [pathname])

    return (
        <div className="navigation-container">
            <div 
                className="nav-cancel" 
                onClick={() => setMega(state => ({ ...state, navOpen: !state.navOpen }))}
                style={{ display: isMegacity ? 'block' : size.width < 768 ? 'none' : 'block' }}    
            >
                <Cancel navOpen={mega.navOpen} />
            </div>
            <section className={
                    size.width < 769 && isMegacity && !mega.navOpen
                    ? 'navigation navigation-off'
                    : size.width < 769 && isMegacity 
                    ? 'navigation'
                    : size.width < 769 
                    ? 'navigation-mobile'
                    : !mega.navOpen ? 'navigation navigation-off' : 'navigation'
                }>
                {['series', 'prints', 'about'].map(link => (
                    <Link
                        key={link}
                        className={
                            size.width < 769 && isMegacity && !mega.navOpen
                            ? 'nav-link nav-link-off'
                            : size.width < 769 && isMegacity
                            ? 'nav-link'
                            : size.width < 769 && currentPath === `/${link}` 
                            ? 'nav-link-mobile nav-link-mobile-on' 
                            : size.width < 769
                            ? 'nav-link-mobile'
                            : !navOpen ? 'nav-link nav-link-off' : 'nav-link'
                        } 
                            href={`/${link}`}
                    >
                        {t(`${link}`)}
                    </Link>
                ))}
                <Link 
                    className={
                        size.width < 769 && isMegacity && !mega.navOpen
                        ? 'nav-link nav-link-off globe'
                        : size.width < 769 && isMegacity
                        ? 'nav-link globe'
                        : size.width < 769 && currentPath === `/` 
                        ? 'nav-link-mobile nav-link-mobile-on globe' 
                        : size.width < 769
                        ? 'nav-link-mobile globe'
                        : !navOpen ? 'nav-link nav-link-off globe' : 'nav-link globe'
                    }
                    href="/">
                    <Globe />
                </Link>
            </section>
            <div className={
                navOpen ? "nav-background-dark" 
                : "nav-background-dark nav-background-dark-off"
            }/>
        </div>
    )
}

export default Nav