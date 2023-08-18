import React, { useEffect, useState } from 'react';
import { BsHammer, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dots from '../../../assets/icons/dots';
import Send from '../../../assets/icons/send';
import { setPostEdit } from '../../../redux/features/postsSlice';
import { copyTextToClipboard, errorHandler, successHandler } from '../../../services/extra-services/extra-services';
import { secret } from '../../../services/secrets';


const PostHeader = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const [displayOptions, setDisplayOptions] = useState(false);
  const nav = useNavigate();
  let timeOut;
  useEffect(() => {
    window.addEventListener("scroll", () => closeNav());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNav = () => {
    clearTimeout(timeOut);
    setDisplayOptions(true);
  };

  const closeNav = () => {
    timeOut = setTimeout(() => {
      setDisplayOptions(false);
    }, 100);
  };

  const navigateToUserProfile = () => {
    closeNav();
    const userUrl = "/profile/";
    const adminUrl = "/admin/profile/";

    if (user) {
      if (user.role === "admin") return nav(`${adminUrl}${post?.creator_id._id}`);
      return nav(`${userUrl}${post?.creator_id._id}`);
    }
  };

  const navigateToUserProfileEdit = () => {
    closeNav();
    const userUrl = "/profileEdit";
    const adminUrl = "/admin/profileEdit";
    dispatch(setPostEdit(post, user));

    if (user) {
      if (user.role === "admin") return nav(adminUrl);
      return nav(userUrl);
    }
  };

  const handleCopyClick = () => {
    const apiUrl = secret.CLIENT_API_URL;
    const userUrl = `/profile/${post?.creator_id._id}`;
    const adminUrl = `/admin/profile/${post?.creator_id._id}`;
    const copyText = `${apiUrl}${user.role === "admin" ? adminUrl : userUrl}`;

    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, notification success
        successHandler('User URL has been successfully copied to the clipboard.');
        closeNav();
      })
      .catch((err) => {
        errorHandler('Unfortunately, we were unable to copy the URL to your clipboard');
        closeNav();
      });
  };

  return (
    <div className="dashboard-post-header-wrapper flex justify-between items-center pr-2 p-1">
      <div
        onClick={() => navigateToUserProfile()}
        className="flex items-center cursor-pointer capitalize"
      >
        <div className="profile overflow-hidden w-8 h-8 lg:w-10 lg:h-10">
          <img
            className="w-full h-full rounded-full object-cover"
            src={post?.creator_id?.profile_img?.url || user?.profile_img?.url}
            alt="avatar"
          />
        </div>
        <h5 className="pl-1 flex">
          {post?.creator_id.fullName?.firstName}
          <label className="ml-1">
            {post?.creator_id.fullName?.lastName}
          </label>
        </h5>
      </div>
      <div
        className="z-10"
        onMouseLeave={() => closeNav()}
        onClick={() => {
          displayOptions ? closeNav() : openNav();
        }}
      >
        <Dots />
      </div>
      {displayOptions && (
        <ul
          onTouchCancel={() => closeNav()}
          onMouseOver={() => openNav()}
          onMouseLeave={() => closeNav()}
          className="w-2/3 md:w-1/3 absolute bg-white shadow-xl rounded-b-xl hover:rounded-b-xl top-11 md:top-10 xl:top-11 z-10 right-0"
        >
          <li
            onClick={() => handleCopyClick()}
            className={`transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between items-center hover:bg-gray-200 ${user?._id !== post?.creator_id &&
              "rounded-b-xl hover:rounded-b-xl"
              }`}
          >
            <p>Share</p>
            <Send />
          </li>
          {(user?._id === post?.creator_id._id || user?.role === "admin") && (
            <React.Fragment>
              <li
                onClick={() => navigateToUserProfileEdit()}
                className="transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between hover:bg-gray-200"
              >
                <p>Edit</p>
                <BsHammer />
              </li>
              <li
                onClick={() => {
                  displayOptions ? closeNav() : openNav();
                }}
                className="transition duration-100 ease-in-out cursor-pointer px-4 py-2 flex justify-between rounded-b-xl hover:rounded-b-xl hover:bg-gray-200"
              >
                <p>Delete</p>
                <BsTrash />
              </li>
            </React.Fragment>
          )}
        </ul>
      )}
    </div>
  );

};

export default PostHeader;