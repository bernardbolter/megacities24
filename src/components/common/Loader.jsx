import Image from "next/image"
import globeGif from '../../../public/images/globe.gif'

const Loader = ({ loaderText }) => {
    return (
        <div className="loader">
            <Image 
                src={globeGif} 
                alt="spinning globe loader" 
                width={150}
                height={150}    
            />
            <p>Loading {loaderText}.....</p>
        </div>
    )
}

export default Loader