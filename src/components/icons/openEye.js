import React from 'react'

const OpenEye = ({ color = "#6B7280", width = "24px", height = "24px" }) => {
    return (
        <svg aria-hidden="true" width={width} height={height} fill={color} viewBox="0 0 20 20">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        </svg>
    )
}

export default OpenEye