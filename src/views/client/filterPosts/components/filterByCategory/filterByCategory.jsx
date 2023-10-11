import React, { useMemo, useState } from "react";
import { doGetApiMethod } from "../../../../../api/services/axios-service/axios-service";
import Chips from "../../../../../shared/components/chips/chips";

const FilterByCategory = ({ setFilterForm, filterForm }) => {
  const [chips, setChips] = useState([]);

  useMemo(async () => {
    const url = "/categories";
    const { data } = await doGetApiMethod(url);
    setCategoriesWithFullProps(data);
    const mappedChips = mapDataToChip(data);
    setChips(mappedChips);
  }, []);

  const setCategoriesWithFullProps = (data) => {
    const categories = filterForm?.categories;
    if (categories && data) {
      const categoriseWithFullProps = [...categories.map(category => {
        return data.filter(fetchCategory => fetchCategory.url_name === category)[0];
      })];

      setFilterForm(prev => ({
        ...prev,
        categories: categoriseWithFullProps
      }));
    }
    else {
      setFilterForm(prev => ({
        ...prev,
        categories: []
      }));
    }
  };

  const mapDataToChip = (chips) => {
    return chips?.map(chip => {
      return {
        _id: chip._id,
        name: chip.name,
        info: chip.info,
        url_name: chip.url_name,
        check: checkChips(chip) || false
      };
    });
  };

  const checkChips = (chip) => {
    if (filterForm && filterForm.categories?.length) {
      return filterForm?.categories?.some(filterChip => {
        return filterChip.toLowerCase() === chip.url_name.toLowerCase();
      });
    }
    else {
      return false;
    }
  };

  return (
    <div className="mb-3">
      {/* header */}
      <div className='md:px-0 pb-2'>
        <div className='text-lg p-0'>Filter by category</div>
      </div>

      {/* chips list */}
      <div className='md:px-0'>
        {chips && <Chips
          setForm={setFilterForm}
          size={'sm'}
          variant={'unFill'}
          chipsProp={chips}
          setChipsProp={setChips} />}
      </div>

    </div>
  );
};

export default FilterByCategory;