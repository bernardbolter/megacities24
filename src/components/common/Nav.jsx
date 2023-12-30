"use client"

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'

import Link from 'next/link'

import Globe from '@/svg/Globe'
import Cancel from '@/svg/Cancel'

const Nav = ({ lng }) => {
    const [navOpen, setNavOpen] = useState(true)
    const pathname = usePathname().substring(3)
    const { t } = useTranslation(lng, 'common')

    return (
        <div className="navigation-container">
            <div className="nav-cancel" onClick={() => setNavOpen(!navOpen)}>
                <Cancel navOpen={navOpen} />
            </div>
            <section className={navOpen ? "navigation" : "navigation navigation-off"} >
                <Link 
                    className={pathname === '/series' 
                        ? 'nav-link nav-link-on' 
                        : !navOpen 
                        ? 'nav-link nav-link-off'
                        : 'nav-link'} 
                        href="/series"
                >
                    {t('series')}
                </Link>
                <Link 
                    className={pathname === '/prints' 
                    ? 'nav-link nav-link-on' 
                    : !navOpen 
                    ? 'nav-link nav-link-off'
                    : 'nav-link'} 
                    href="/prints-list"
                >
                    {t('prints')}
                </Link>
                <Link 
                    className={pathname === '/about' 
                    ? 'nav-link nav-link-on' 
                    : !navOpen 
                    ? 'nav-link nav-link-off'
                    : 'nav-link'} 
                    href="/about"
                >
                    {t('about')}
                </Link>
                <Link 
                    className={pathname === '/contact' 
                    ? 'nav-link nav-link-on' 
                    : !navOpen 
                    ? 'nav-link nav-link-off'
                    : 'nav-link'} 
                    href="/contact"
                >
                    {t('contact')}
                </Link>
                <Link 
                    className={pathname === '/' 
                    ? 'link globe nav-link-on' 
                    : !navOpen 
                    ? 'link globe nav-link-off'
                    : 'link globe'}
                    href="/">
                    <Globe />
                </Link>
            </section>
            <div className={navOpen ? "nav-background-dark" : "nav-background-dark nav-background-dark-off"} />
        </div>
    )
}

export default Nav