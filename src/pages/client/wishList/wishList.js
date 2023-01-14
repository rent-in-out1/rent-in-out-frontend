
import { useSelector } from "react-redux";
import Card from "../../../shared/components/card";

const WishList = () => {
  let { wishList } = useSelector((state) => state.userSlice);
  return (
    <main className="w-full min-h-screen p-1 md:p-3 bg-gray-100 text-center justify-center">
      <div className="flex flex-wrap">
        {wishList?.length>0 ? wishList?.map(( post , i) => (
          <div key={i} className="w-1/2 lg:p-3">
            <Card post={post}/>
          </div>
        )):<h2 className="flex justify-center items-center w-screen h-screen"> No items to show ....</h2>
        }
      </div>
    </main>
  );
};

export default WishList;
