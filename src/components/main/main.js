import { useScroll } from '../../hooks/useScroll'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { doGetApiMethod } from '../../services/service'
import Card from '../card'
import Loader from '../loader/loader'

const Main = () => {
    const [postsArray, setPostArray] = useState([]);
    const [countPosts, setCountPosts] = useState(0)
    const [page, setPage] = useState(1);
    const [endScreen, endScreenEnd] = useScroll(900)
    const [isChange, setIsChange] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true)
    /** check first how many posts */
    useEffect(() => {
        countP()
    }, [])
    useEffect(() => {
        if (!firstLoad && endScreen && Math.ceil(countPosts / 10) >= page) setPage(page + 1);
        setFirstLoad(false);
    }, [endScreen])

    useEffect(() => {
        doApi();
    }, [page])
    /** count all the posts */
    const countP = async () => {
        let { data } = await doGetApiMethod("/posts/count")
        setCountPosts(data.count)
    }
    const doApi = async () => {
        // console.log(page)

        let url_posts = `/posts?page=${page}`
        let { data } = await doGetApiMethod(url_posts);
        setPostArray([...postsArray, ...data]);
        endScreenEnd()
        
    }
    return (
        <main className='w-full min-h-screen p-1 md:p-3 bg-gray-100 text-center justify-center'>
            <div className='flex flex-wrap'>
                {postsArray &&
                    postsArray.map((post) => (
                        <div key={post._id} className='w-1/2 lg:p-3'>
                            <Card post={post} setIsChange={setIsChange} />
                        </div>
                    ))}
            </div>
            {endScreen && Math.ceil(countPosts / 10) >= page + 1 && <div className='flex items-center justify-center min-h-40'><Loader width={"200px"} height={"200px"} /></div>}
        </main>
    )
}

export default Main