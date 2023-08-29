import React from 'react';

const Clock = ({ width = 12, height = 12, color = "black" }) => {
    return (
        <svg className="mr-1" width={width} height={height} fill={color} viewBox="0 0 20 20">
            <path fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"></path>
        </svg>
    );
};

export default Clock;