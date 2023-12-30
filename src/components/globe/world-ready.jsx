"use client"

import { useContext } from "react"
import { MegaContext } from "@/providers/megaProvider"
import { useTranslation } from '@/app/i18n/client'
import Switch from "@/svg/Switch"

const WorldReady = ({lng }) => {
    const [ mega, setMega] = useContext(MegaContext)
    const { t } = useTranslation(lng, 'common')

    return (
        <>
        {mega.worldReady && (
            <div className="index-slogan">
                <p>{mega.megaGlobe ? t('weAreTheWorld') : t('weSkateTheWorld')}</p>
            </div>
            )}

            {mega.worldReady && (
            <div 
                className="index-chose-mega"
                onClick={() => setMega(state => ({ ...state, megaGlobe: !state.megaGlobe }))}
            >
                <Switch />
                <p>{mega.megaGlobe ? t('skateWorld') : t('megacities')}</p>
            </div>
        )}
        </>
    )
}

export default WorldReady