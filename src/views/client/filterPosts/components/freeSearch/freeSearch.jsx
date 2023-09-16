import React from 'react';
import Search from '../../../../../assets/icons/search';

const FreeSearch = () => {
  return (
    <div className="relative mb-3">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {/* search icon */}
        <Search color="#333" width="20" height="20" />
      </div>
      <input type="search" id="default-search" className="block w-full py-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Filter Posts" required />
    </div>
  );
};

export default FreeSearch;