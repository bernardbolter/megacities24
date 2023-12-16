"use client"

import { useContext } from "react"
import { MegaContext } from "@/providers/megaProvider"
import Switch from "@/svg/Switch"

const WorldReady = ({
    weAreTheWorld,
    weSkateTheWorld,
    skateWorld,
    megacities
}) => {
    const [ mega, setMega] = useContext(MegaContext)

    return (
        <>
        {mega.worldReady && (
            <div className="index-slogan">
                <p>{mega.megaGlobe ? weAreTheWorld : weSkateTheWorld}</p>
            </div>
            )}

            {mega.worldReady && (
            <div 
                className="index-chose-mega"
                onClick={() => setMega(state => ({ ...state, megaGlobe: !state.megaGlobe }))}
            >
                <Switch />
                <p>{mega.megaGlobe ? skateWorld : megacities}</p>
            </div>
        )}
        </>
    )
}

export default WorldReady