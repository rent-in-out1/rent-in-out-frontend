import React, { useRef, useState } from "react";
import Search from "../../../assets/icons/search";
import { onLikesToggle } from "../../../redux/features/toggleSlice";
import PopUPModel from "../../../shared/UI/popup/popUpModel";
import NotFoundItems from "../../../shared/components/notFoundItems/notFoundItems";
import SingleLike from "./singleLike";

const PopUpLikes = ({ likesArr }) => {
    const likesArrBackup = [...likesArr];
    const [likes_ar, setLikes_ar] = useState([...likesArr]);
    const inpRef = useRef();

    // front end filter likes arr
    const searchFilterLikesArr = () => {
        let searchQ = inpRef.current.value;
        if (!searchQ) {
            setLikes_ar([]);
            return;
        }
        // ignore spaces and case sensitivity
        searchQ = searchQ.trim().toLowerCase();
        // filter by full name email country city phone number
        setLikes_ar(likesArrBackup.filter(solidLike => {
            let { firstName, lastName } = solidLike.fullName;
            let fullName = `${firstName.toLowerCase()} ${lastName.toLowerCase()}`;
            return (
                solidLike.email.toLowerCase().includes(searchQ) ||
                fullName.includes(searchQ) ||
                solidLike?.city?.toLowerCase()?.includes(searchQ) ||
                solidLike?.country?.toLowerCase()?.includes(searchQ) ||
                solidLike?.phone?.includes(searchQ)
            );
        }));
    };
    return (
        <PopUPModel action={onLikesToggle}>
            {/* search likes */}
            <form className="px-3 py-2">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {/* search icon */}
                        <Search color="#333" width="20" height="20" />
                    </div>
                    <input onChange={searchFilterLikesArr} ref={inpRef} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search" required />
                    <button type="button" className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </form>
            {/* like list */}
            <ul className="overflow-y-scroll max-h-96 px-3 w-full pb-3">
                {likes_ar.length ? likes_ar?.map((item) => {
                    return (
                        <SingleLike key={item._id} item={item} action={onLikesToggle} />
                    );
                }) :
                    <NotFoundItems inputRef={inpRef.current?.value}/>
                }
            </ul>
        </PopUPModel>
    );
};

export default PopUpLikes;