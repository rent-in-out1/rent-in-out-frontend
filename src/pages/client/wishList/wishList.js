import React,{useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/card";
import { doGetApiMethod } from "../../../services/service";

const WishList = () => {
  let { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [isChange, setIsChange] = useState(false);
  const [wishListArr, setWishList] = useState(false);
  useEffect(() => {
    getUserInfo()
    console.log(wishListArr)
  }, [isChange]);
  const getUserInfo = async () => {
    let url = `/users/info/${user._id}`
    const {data} =  await doGetApiMethod(url)
    setWishList(data.userInfo.wishList)
  }
  return (
    <main className="w-full min-h-screen p-1 md:p-3 bg-gray-100 text-center justify-center">
      <div className="flex flex-wrap">
        {wishListArr.length>0 && wishListArr?.map(({ post }, i) => (
          <div className="w-1/2 lg:p-3">
            <Card key={i} post={post} setIsChange={setIsChange} />
          </div>
        ))}
      </div>
      {/* {endScreen  && Math.ceil(user.wishList?.length) >= page+1  && <div className='flex items-center justify-center min-h-40'><Loader width={"200px"} height={"200px"} /></div>} */}
    </main>
  );
};

export default WishList;
