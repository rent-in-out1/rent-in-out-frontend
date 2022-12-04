import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
import { doGetApiMethod,errorHandler,doApiMethod} from '../../services/service';
import { transfer } from "../../redux/features/userSlice";


const UserCard = ({ item }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);

  const searcInfo= async () =>{
    try{
      const url = "/users/info/" + item._id;
      const {data}= await doGetApiMethod(url,"GET")
      nav("/profile/"+item._id)
    }
    catch(err){
      errorHandler(err.response.data.msg)
    }
  };
  return (

    <li onClick={searcInfo} className='p-3 sm:py-3 mx-auto flex items-center justify-between w-full mt-3 w-10/12 cursor-pointer bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex items-center space-x-1'>
        <div className=' rounded-full w-8 h-8 overflow-hidden' >
          <img
            className=" object-cover w-full h-full "
            src={
              user !== null && user?.active
                ? item.profile_img.url
                : "https://freesvg.org/img/Male-Avatar.png"
            }
            alt=""
          />
        </div>
        <div>
          <p className='"text-sm font-medium text-gray-900 truncate dark:text-white"'>{item.fullName.firstName} {item.fullName.lastName} </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {item.email}
                        </p>
                        </div>
      </div>
      <p className='text-base font-semibold text-gray-900 dark:text-white md:p-2 -mx-2 md:overflow-hidden'>
        {item.country}
      </p>
    </li>



  )
}

export default UserCard