import React from 'react';
import Profile from '../profile';
import BannerProfile from '../profile/components/bannerProfile';

const MyProfile = () => {
    return (
        <div>
            <BannerProfile />
            <Profile />
        </div>
    );
};

export default MyProfile;
