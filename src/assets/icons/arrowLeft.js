import React from 'react'

const ArrowLeft = ({ color = "black", width = "20px", height = "20px" }) => {
    return (
        <svg aria-hidden="true" className="transition duration-75" width={width} height={height} fill={color} viewBox="0 0 20 20">
            <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
        </svg>
    )
}

export default ArrowLeft