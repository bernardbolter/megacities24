import Image from "next/image"

const Loader = ({ loaderText }) => {
    return (
        <div className="loader">
            <Image 
                src={"/images/globe.gif"} 
                alt="spinning globe loader" 
                width={150}
                height={150}    
            />
            <p>Loading {loaderText}.....</p>
        </div>
    )
}

export default Loader