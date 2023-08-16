import React from 'react';

const Profile = ({ color = "#6B7280", width = "24px", height = "24px" }) => {
    return (
        <svg aria-hidden="true" className="transition duration-75" width={width} height={height} fill={color}
            viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
        </svg>
    );
};

export default Profile;