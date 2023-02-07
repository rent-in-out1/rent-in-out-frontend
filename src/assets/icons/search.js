import React from 'react'

const Search = ({color = "black", width = "24px", height = "24px"}) => {
    return (
        <svg aria-hidden="true" className="transition duration-75" width={width} height={height} fill={color}
             viewBox="0 0 20 20">
            <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
    )
}
export default Search