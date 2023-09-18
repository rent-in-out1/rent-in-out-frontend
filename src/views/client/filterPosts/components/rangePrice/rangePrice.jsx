import React, { useRef } from 'react';

const RangePrice = ({ setFilterForm, filterForm }) => {
  const minPriceInputRef = useRef();
  const maxPriceInputRef = useRef();

  const handleChangeMinPrice = () => {
    setFilterForm(prev => ({
      ...prev,
      minPrice: minPriceInputRef.current.value
    }));
  };

  const handleChangeMaxPrice = () => {
    setFilterForm(prev => ({
      ...prev,
      maxPrice: maxPriceInputRef.current.value
    }));
  };
  return (
    <div className='mb-3'>
      {/* header */}
      <div className='md:px-0'>
        <div className='text-lg p-0'>Price Range</div>
        <label className='text-xs text-slate-400 font-semibold'>Please enter min and height or use slider</label>
      </div>

      {/* slider input control */}
      <div className='md:px-0'>
        <div className='flex items-center'>
          <div>
            <input onChange={handleChangeMinPrice} ref={minPriceInputRef} defaultValue={filterForm?.minPrice} type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-none block w-full p-2.5" placeholder="Min" required />
          </div>

          <div className='p-3 text-2xl'>
            -
          </div>

          <div>
            <input onChange={e => handleChangeMaxPrice(e)} ref={maxPriceInputRef} defaultValue={filterForm?.maxPrice} type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-none block w-full p-2.5" placeholder="Max" required />
          </div>

        </div>
      </div>
    </div>
  );
};

export default RangePrice;