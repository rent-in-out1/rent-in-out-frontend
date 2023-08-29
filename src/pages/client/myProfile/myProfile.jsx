import React from 'react';
import Profile from '../profile';
import BannerProfile from '../profile/bannerProfile';

const MyProfile = () => {
    return (
        <div>
            <BannerProfile />
            <Profile />
        </div>
    );
};

export default MyProfile;