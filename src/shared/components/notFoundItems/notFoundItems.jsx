import React from 'react';
import NotFoundResults from '../../../assets/images/notFoundResults';

const NotFoundItems = ({ inputRef }) => {
    return (
        <div className="text-slate-400 text-center mt-3">
            <NotFoundResults height="200" width="100%" />
            <h3 className="my-3">
                Your search - "{inputRef}" did not match any results.
            </h3>
        </div>
    );
};

export default NotFoundItems;