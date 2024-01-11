import { useRef, useEffect, useMemo, useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'
import { useWindowSize } from '@/helpers/useWindowSize'
import Draggable from 'react-draggable'
import Image from 'next/image'
import { setNewBounds, updateControlledPosition } from '@/helpers'

/////////////////////////
//  Images Sizes
//  xl - 1600 x 2238
//  lg - 1200 x 1679
//  md - 800 x 1119
//  sm - 500 x 699
//  proportion - 0.714285143
//  Y proportion - 1.39875
//  original 14300 x 20000 300ppi
/////////////////////////

const MegaImage = ({ slug, name }) => {
    const [mega, setMega] = useContext(MegaContext)
    const nodeRef = useRef()
    const size = useWindowSize()

    const overlayUrl = useMemo(() => {
        return `${mega.url}${slug}/${mega.overlaySlug}/${mega.overlaySlug}_${mega.zoom}.gif`
    }, [mega.url, slug, mega.overlaySlug, mega.zoom])

    const imageUrl = useMemo(() => {
        return `${mega.url}${slug}/${slug}_${mega.zoom}.jpg`
    }, [mega.url, slug, mega.zoom])

    useEffect(() => {
        var newBounds = setNewBounds(size.width, size.height)
        setMega(state => ({ ...state, lgBounds: newBounds[0], xlBounds: newBounds[1]}))
    }, [size.width, size.height])

    useEffect(() => {
        if (mega.zoom === 'lg') {
            var offsetX = -(1200 - size.width) / 2
            var offsetY = -(1679 - size.height) / 2
        } else if (mega.zoom === 'xl') {
            var offsetX = -(1600 - size.width) / 2
            var offsetY = -(2238 - size.height) / 2
        }
        setMega(state => ({ ...state, offsetPosition: { x: offsetX, y: offsetY } }))
    }, [mega.zoom, size.width])

    const handleDrag = (e, position) => {
        e.preventDefault()
        const { x, y } = position
        setMega(state => ({ ...state, controlledPosition: { x: x, y: y } }))
    }

    return (
        <>
            {mega.zooming ? (
                <Draggable
                    onDrag={handleDrag}
                    position={mega.controlledPosition}
                    nodeRef={nodeRef}
                    positionOffset={mega.offsetPosition}
                    bounds={mega.zoom === 'lg' ? mega.lgBounds : mega.xlBounds }
                >
                    <div
                        style={{
                            position: 'fixed',
                            width: mega.zoom === 'lg' ? 1200 : 1600,
                            height: mega.zoom === 'lg' ? 1679 : 2238
                        }}
                        ref={nodeRef}
                    >
                        {mega.viewOverlay && (
                            <>
                                <Image
                                    style={{
                                        position: 'absolute',
                                        zIndex: 3
                                    }}
                                    draggable={false}
                                    src={overlayUrl}
                                    alt={`${mega.overlaySlug} overlay`}
                                    fill
                                />
                                <div
                                    style={{
                                        width: mega.zoom === 'lg' ? 1200 : 1600,
                                        height: mega.zoom === 'lg' ? 1679 : 2238,
                                        position: 'absolute',
                                        zIndex: 2,
                                        background: 'rgba(0,0,0,.5)'
                                    }}
                                />
                            </>
                        )}
                        
                        <Image
                            style={{
                                position: 'absolute',
                                zIndex: 1
                            }}
                            draggable={false}
                            src={imageUrl}
                            alt={`${name} Megacity`}
                            fill
                            // width={mega.zoom === 'lg' ? 1200 : 1600}
                            // height={mega.zoom === 'lg' ? 1679 : 2238}
                        />
                    </div>
                </Draggable>
            ) : (
                <div className="mega-image-normal">
                    {mega.viewOverlay && (
                        <>
                            <Image
                                draggable={false}
                                src={`${mega.url}${slug}/${mega.overlaySlug}/${mega.overlaySlug}_md.gif`}
                                alt={`${name} `}
                                width={mega.cityWidth}
                                height={mega.cityHeight}
                                style={{
                                    position: 'absolute',
                                    zIndex: 3
                                }}
                            />
                            <div
                                style={{
                                    width: mega.cityWidth,
                                    height: mega.cityHeight,
                                    position: 'absolute',
                                    zIndex: 2,
                                    background: 'rgba(0,0,0,.5)'
                                }}
                            />
                        </>
                    )}
                    <Image
                        draggable={false}
                        src={`${mega.url}${slug}/${slug}_md.jpg`}
                        alt={`${name} `}
                        width={mega.cityWidth}
                        height={mega.cityHeight}
                        style={{
                            position: 'absolute',
                            zIndex: 1
                        }}
                    />
                </div>
            )}
    
        </>
    )
}

export default MegaImage