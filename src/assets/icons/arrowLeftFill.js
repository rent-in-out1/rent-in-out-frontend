import React from 'react'

const ArrowLeftFill = ({color = "black", width = "20px", height = "20px"}) => {
    return (
        <svg aria-hidden="true" className="transition duration-75" width={width} height={height} fill={color}
             viewBox="0 0 20 20">
            <path
                d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
        </svg>
    )
}

export default ArrowLeftFill