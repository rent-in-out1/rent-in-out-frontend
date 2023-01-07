import React from 'react'
import { BallTriangle } from 'react-loader-spinner'

const BallTriangleLoader = ({ load = true, height, width, color = "#97aef8" }) => {
    return (
        <BallTriangle
            height={height}
            width={width}
            color={color}
            radius="9"
            wrapperStyle={{}}
            wrapperclassName=""
            visible={load}
            ariaLabel="ball-triangle-loading"

        />
    )
}

export default BallTriangleLoader