import React from "react";
import { useState, useRef, useEffect } from "react";
import UserCard from "../../../components/userCard";
import { doGetApiMethod, errorHandler } from "../../../services/service";
import Search from "../../../components/icons/search";
import { Wrapper } from "../../../components/style/wrappers/userSearch";
import PopUPModel from "../../../components/UI/popUpModel";
import { onSearchToggle } from "../../../redux/features/toggleSlice";


const UserSearch = () => {
  const inpRef = useRef();
  const [ar, setAr] = useState([]);

  const serachUser = async () => {
    let searchQ = inpRef.current.value;
    if (!searchQ) {
      setAr([]);
      return;
    }
    const url = "/users/userSearch?s=" + searchQ;
    try {
      const { data } = await doGetApiMethod(url);
      setAr(data);
    } catch (err) {
      errorHandler(err.response.data.msg);
    }
  };
  return (
    <PopUPModel action={onSearchToggle}>
      <Wrapper>
        <div className="mt-6">
          <div className="p-2 flex flex-col items-center ">
            <div className="search w-full lg:w-2/3 mx-auto">
              <input
                onChange={serachUser}
                ref={inpRef}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    serachUser();
                  }
                }}
                type="text"
                placeholder="Search..."
                className="  border-transparent focus:border-transparent focus:ring-0 "
              />
              <div className="icon">
                <Search color="#333" width="16" height="16" />
              </div>
            </div>
            <ul className="dropdown overflow-y-scroll max-h-96 w-full flex flex-col">
              {ar?.map((item) => {
                return <UserCard className="" key={item._id} item={item} />;
              })}
            </ul>
          </div>
        </div>
      </Wrapper>
    </PopUPModel>
  );
};

export default UserSearch;
