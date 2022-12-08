import React,{useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/card";
import { onLogin } from "../../../redux/features/userSlice";
import { doGetApiMethod } from "../../../services/service";

const WishList = () => {
  let { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [isChange, setIsChange] = useState(false);
  const [wishListArr, setWishList] = useState(false);
  useEffect(() => {
    getUserInfo()
  }, [isChange]);
  const getUserInfo = async () => {
    let url = `/users/info/${user._id}`
    const {data} =  await doGetApiMethod(url)
    setWishList(data.userInfo.wishList)
    dispatch(onLogin(data.userInfo))
    setIsChange(false)
  }
  return (
    <main className="w-full min-h-screen p-1 md:p-3 bg-gray-100 text-center justify-center">
      <div className="flex flex-wrap">
        {wishListArr.length>0 ? wishListArr?.map(( post , i) => (
          <div key={i} className="w-1/2 lg:p-3">
            <Card post={post} setIsChange={setIsChange} />
          </div>
        )):<h2 className="flex justify-center items-center w-screen h-screen"> No items to show ....</h2>
        }
      </div>
    </main>
  );
};

export default WishList;
