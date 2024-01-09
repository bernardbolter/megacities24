"use client"

import Link from 'next/link'
import { useTranslation } from '@/app/i18n/client'

import Insta from '@/svg/Insta'
import TikTok from '@/svg/TikTok'
import Snap from '@/svg/Snap'

const Logo = ({ lng }) => {
    const { t } = useTranslation(lng, 'common')

    return (
        <section className="logo">
            <Link 
                href="/"
                className="logo-title"
            >
                <h1>{t('megacities')}</h1>
                <h2>{t('compositeCountryPortaits')}</h2>
            </Link>
            <div className="socials">
                <a href="https://instagram.com">
                    <Insta />
                </a>
                <a href="http://tiktok.com">
                    <TikTok />
                </a>
                {/* <a href="https://snapchat.com">
                    <Snap />
                </a> */}
            </div>
        </section>
    )
}

export default Logo