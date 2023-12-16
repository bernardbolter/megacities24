import React from 'react'

const Text = () => {
    let textPath = `<textPath xlink:href="#curve">Come on in...</textPath>`
    return (
        <svg viewBox="0 0 425 300">
            <path id="curve" d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" />
            <text x="25">
                <text dangerouslySetInnerHTML={{__html: textPath }} />
                {/* <textPath xlink:href="#curve">
                Dangerous Curves Ahead
                </textPath> */}
            </text>
        </svg>
    )
}

export default Text