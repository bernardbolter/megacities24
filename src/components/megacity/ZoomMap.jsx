import { useState, useMemo, useContext } from 'react'
import { MegaContext } from '@/providers/megaProvider'

const ZoomMap = ({ winWidth, winHeight, slug }) => {
    const [mega, setMega] = useContext(MegaContext)

    const [smallScreenWidth, setSmallScreenWidth] = useState(0)
    const [smallScreenHeight, setSmallScreenHeight] = useState(0)

    const [screenWidth, setScreenWidth] = useState(0)
    const [screenHeight, setScreenHeight] = useState(0)
    const [imgWidth, setImgWidth] = useState(0)
    const [imgHeight, setImgHeight] = useState(0)
    const [fixedLeft, setFixedLeft] = useState(0)
    const [fixedBottom, setFixedBottom] = useState(0)
    const [xPosition, setXPosition] = useState(0)
    const [yPosition, setYPosition] = useState(0)
    const [thumbUrl, setThumbUrl] = useState('')


    useMemo(() => {
        const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
        const newScreenWidth = map(winWidth, 320, 3000, 50, 150).toFixed(2)
        setScreenWidth(newScreenWidth)
        setSmallScreenWidth(newScreenWidth * .5)
        setFixedLeft(newScreenWidth * .3)

        const mapMulti = (newScreenWidth / winWidth).toFixed(2)
        
        const newScreenHeight = (winHeight * mapMulti).toFixed(2)
        setScreenHeight(newScreenHeight)
        setSmallScreenHeight(newScreenHeight * .5)
        setFixedBottom(newScreenHeight * .3)

        if (mega.zoomLevel === 'xl') {
            setImgWidth(1600 * mapMulti)
            setImgHeight(2238 * mapMulti)
        } else {
            setImgWidth(1200 * mapMulti)
            setImgHeight(1679 * mapMulti)
        }

        setXPosition(mega.controlledPosition.x * mapMulti)
        setYPosition(mega.controlledPosition.y * mapMulti)

        setThumbUrl(`${mega.url}${slug}/${slug}_sm.jpg`)
    }, [mega.zoomLevel, winWidth, winHeight, mega.controlledPosition, slug, mega.url])

    return (
        <section 
            className="zoom-map"
            style={{
                left: mega.zooming ? `${fixedLeft}px` : 10,
                bottom: mega.zooming ? `${fixedBottom}px` : 10,
                width: mega.zooming ? `${screenWidth}px` : `${smallScreenWidth}px`,
                height: mega.zooming ? `${screenHeight}px` : `${smallScreenHeight}px`
            }}
            onClick={() => {
                setMega(state => ({ ...state, zooming: !state.zooming }))
            }}
        >
            <div
                className="zoom-map-window"
                style={{
                    width: mega.zooming ? `${screenWidth}px` : `${smallScreenWidth}px`,
                    height: mega.zooming ? `${screenHeight}px` : `${smallScreenHeight}px`   
                }}
            />
            {!mega.zooming && (
                <div
                    className="zoom-map-window-back"
                    style={{
                        width: mega.viewZoomMap ? `${screenWidth}px` : `${smallScreenWidth}px`,
                        height: mega.viewZoomMap ? `${screenHeight}px` : `${smallScreenHeight}px`
                    }}
                />
            )}
            {mega.zooming && (
                <div
                    className="zoom-map-image"
                    style={{
                        width: `${imgWidth}px`,
                        height: `${imgHeight}px`,
                        transform: `translate(${xPosition}px, ${yPosition}px)`,
                    }}
                >
                    <img
                        draggable={false}
                        src={thumbUrl} 
                        alt="thumbnail" 
                    />
                </div>
            )}
        </section>
    )
}

export default ZoomMap