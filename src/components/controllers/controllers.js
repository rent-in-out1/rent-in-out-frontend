import React from 'react'
// should send title options and set search set option
const Controllers = ({ title, options, setSearch, setOption }) => {
    return (
        <div className="controllers flex p-3 items-center justify-center w-3/4 mx-auto">
            <div className="title w-2/12">
                <h1 className='capitalize'>{title}</h1>
            </div>
            <div className="search w-6/12 relative mr-2">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input onChange={(e)=>{setSearch(e.target.value)}} type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search users ..." required></input>
            </div>
            <div className="filters w-2/12">
                <select onChange={(e)=>setOption(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    {options.map((opt) => (<option value={opt.value} className="capitalize">{opt.name}</option>))}
                </select>
            </div>
        </div>
    )
}

export default Controllers