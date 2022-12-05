import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onLikesToggle } from '../../../redux/features/toggleSlice';

const SingleLike = ({item}) => {

  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  return (
      <li
        onClick={() => {
          dispatch(onLikesToggle(""))
          nav("/profile/" + item.user_id);
        }}
        className={`p-3 sm:py-3 mx-auto flex items-center justify-between w-full mt-3 w-10/12 cursor-pointer bg-white hover:bg-gray-300 border rounded-lg shadow-md sm:p-8 `}
      >
        <div className="flex items-center space-x-1">
          <div className=" rounded-full w-8 h-8 overflow-hidden">
            <img
              className=" object-cover w-full h-full "
              src={
                user !== null && user?.active
                  ? item.profile_img
                  : "https://freesvg.org/img/Male-Avatar.png"
              }
              alt=""
            />
          </div>
          <div>
            <p className='"text-sm font-medium text-gray-900 truncate dark:text-white"'>
              {item.fullName.firstName} {item.fullName.lastName}{" "}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {item.email}
            </p>
          </div>
        </div>
        <p className="text-base font-semibold text-gray-900 dark:text-white md:p-2 -mx-2 md:overflow-hidden">
          {item.country}
        </p>
      </li>
  )
}

export default SingleLike