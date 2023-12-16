import Link from 'next/link'

import Insta from '@/svg/Insta'
import TikTok from '@/svg/TikTok'
import Snap from '@/svg/Snap'

const Logo = ({ title, tagline }) => {

    return (
        <section className="logo">
            <Link 
                href="/"
                className="logo-title"
            >
                <h1>{title}</h1>
                <h2>{tagline}</h2>
            </Link>
            <div className="socials">
                <a href="https://instagram.com">
                    <Insta />
                </a>
                <a href="http://tiktok.com">
                    <TikTok />
                </a>
                <a href="https://snapchat.com">
                    <Snap />
                </a>
            </div>
        </section>
    )
}

export default Logo