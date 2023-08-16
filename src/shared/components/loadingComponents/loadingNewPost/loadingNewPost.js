import React from 'react';

const LoadingNewPost = () => {
    return (
        <div role="status" class="max-w-sm animate-pulse mx-auto">
            <button class="mx-auto h-6 bg-gray-200 rounded-full w-64 mb-4"></button>
            <div class="mx-auto h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
            <span class="sr-only">Loading...</span>
        </div>
    );
};

export default LoadingNewPost;