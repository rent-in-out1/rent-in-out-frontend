import React, { useState } from 'react';
import PopUpModel from '../../../../../shared/UI/popup/popUpModel';
import Filters from "../../../../../assets/icons/filters";
import RangePrice from '../rangePrice';
import FilterByCategory from '../filterByCategory/filterByCategory';
import { onPostSearchToggle } from '../../../../../redux/features/toggleSlice';
import FreeSearch from '../freeSearch';
import LoadingCircle from '../../../../../assets/icons/loadingCircle';
import { useForm } from "react-hook-form";

const PopUpFilterSearch = () => {
  const [filterForm, setFilterForm] = useState({
    minPrice: 0,
    maxPrice: 1000,
    categories: {},
    search: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const filterPostsHandler = async () => {
    setIsLoading(true);
    setTimeout(() => {
      try {

      }
      catch (err) {

      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <PopUpModel className={'py-4'} action={onPostSearchToggle} >
      {/* filters header */}
      <div className="filters-header flex justify-center items-center">
        <span className='pr-2'>
          <Filters color='#93C5FD' width='30' height='30' />
        </span>
        <div className='text-2xl'>Filters</div>
      </div>
      {/* split header from body */}
      <hr className="h-px mt-3 mb-4 w-5/6 md:w-3/4 mx-auto bg-gray-200 border-0" />

      {/* filters body */}
      <div className="filters-body w-5/6 md:w-3/4 mx-auto">
        <RangePrice />
        <FilterByCategory />
        <FreeSearch />

        <button onClick={() => filterPostsHandler()} type="button"
          class={`flex items-center justify-center w-full border-transparent focus:outline-none hover:border-transparent active:border-transparent bg-blue-400 hover:bg-blue-700 px-6 md:px-8 py-2 text-sm md:text-base cursor-pointer text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:text disabled:hover:bg-blue-400`}
          disabled={isLoading}>
          {isLoading ? <React.Fragment>
            <LoadingCircle />
            Loading...
          </React.Fragment> :
            <span>Filter Posts</span>}

        </button>


      </div>
    </PopUpModel >
  );
};

export default PopUpFilterSearch;