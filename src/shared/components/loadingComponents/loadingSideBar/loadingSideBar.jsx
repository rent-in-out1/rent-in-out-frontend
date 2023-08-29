import React from 'react';

const LoadingSideBar = ({ barsCount = 1 }) => {
  return (
    <div
      role="status"
      className="px-2 pb-2 pt-6 mt-8 border border-gray-200 bg-white rounded shadow animate-pulse lg:w-2/12 z-10 top-16 -left-1 lg:fixed">
      {/* list item */}
      {
        Array(barsCount).fill(0).map((item, i) => (
          <div key={i} className="mx-auto h-6 bg-gray-200 w-11/12 mb-8"></div>
        ))
      }
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSideBar;