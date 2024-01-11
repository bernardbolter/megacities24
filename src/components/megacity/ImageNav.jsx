import { useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'

import EyeOpen from '@/svg/EyeOpen'
import EyeClosed from '@/svg/EyeClosed'
import Plus from '@/svg/Plus'
import Minus from '@/svg/Minus'

const ImageNav = () => {
    const [mega, setMega] = useContext(MegaContext)

    return (
        <>
            <section className={mega.hideAllNavs ? 'image-nav image-nav-hide' : 'image-nav'}>
                {mega.hideAllNavs ? (
                    <div 
                        className={mega.hideAllNavs ? 'image-nav-eye image-nav-eye-hide' : 'image-nav-eye'}
                        onClick={() => setMega(state => ({ ...state, hideAllNavs: false}))}
                    >
                        <EyeOpen />
                    </div>
                ) : (
                    <div 
                        className="image-nav-eye"
                        onClick={() => setMega(state => ({ ...state, hideAllNavs: true}))}
                    >
                        <EyeClosed />
                    </div>
                )}
                {mega.zoom === 'normal' ? (
                    <div 
                        className="image-nav-plus"
                        onClick={() => setMega(state => ({ ...state, zoom: 'lg', zooming: true }))}
                    >
                        <Plus />
                    </div>
                ) : (
                    <div 
                        className={mega.zoom === 'lg' ? "image-nav-plus" : "image-nav-plus image-nav-plus-disabled"}
                        onClick={() => mega.zoom === 'lg' ? setMega(state => ({ ...state, zoom: 'xl', zooming: true })) : null}
                    >
                        <Plus />
                    </div>
                )}
                
                {mega.zoom === 'normal' ? (
                    <div 
                        className="image-nav-minus image-nav-minus-disabled" 
                    >
                        <Minus />
                    </div>
                ) : (
                    <div 
                        className="image-nav-minus"
                        onClick={() => (mega.zoom === 'lg') 
                            ? setMega(state => ({ ...state, zoom: 'normal', zooming: false })) 
                            : setMega(state => ({ ...state, zoom: 'lg', zooming: true  }))
                        }       
                    >
                        <Minus />
                    </div>
                )}
                
            </section>
            <div className={mega.hideAllNavs ? 'image-nav-background image-nav-background-hide' : 'image-nav-background'} />
        </> 
    )
}

export default ImageNav