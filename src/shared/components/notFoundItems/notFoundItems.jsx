import React from 'react';
import NotFoundResults from '../../../assets/images/notFoundResults';

const NotFoundItems = ({inputRef}) => {
    return (
        <div className="text-slate-400 text-center mt-3">
            <NotFoundResults height="200" width="100%" />
            <h3 className="my-3">
                Your search - "{inputRef}" did not match any results.
            </h3>
            <h4 className="mb-3">
                Suggestions:
            </h4>
            <ul className="list-disc p-2 w-2/3 mx-auto">
                <li>
                    Make sure that all words are spelled correctly.
                </li>
                <li>
                    Try different keywords.
                </li>
                <li>
                    Try more general keywords.
                </li>
            </ul>
        </div>
    );
};

export default NotFoundItems;