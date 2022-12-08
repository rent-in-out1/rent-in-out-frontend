import { useScroll } from '../../hooks/useScroll'
import React, { useState, useEffect } from 'react'
import { doGetApiMethod } from '../../services/service'
import Card from '../card'
import Loader from '../loader'
import { useDispatch, useSelector } from 'react-redux'
import { clear, onLoad } from '../../redux/features/postsSlice'

const Main = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.postsSlice)
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
        if(isChange){
            document.querySelector("#posts").innerHTML = "";
        } 
        console.log(posts)
        let url_posts = `/posts?page=${page}`
        let { data } = await doGetApiMethod(url_posts);
        console.log([...posts, ...data])
        if(!isChange) dispatch(onLoad([...posts, ...data]))
        endScreenEnd()
        setIsChange(false)
    }
    return (
        <main className='w-full min-h-screen p-1 md:p-3 text-center justify-center'>
            <div id='posts' className='flex flex-wrap'>
                {posts &&
                    posts.map((post,i) => (
                        <div key={post._id} className='w-1/2'>
                            <Card post={post} key={i} setIsChange={setIsChange} />
                        </div>
                    ))}
            </div>
            {endScreen && Math.ceil(countPosts / 10) >= page + 1 && <div className='flex items-center justify-center min-h-40'><Loader width={"200px"} height={"200px"} /></div>}
        </main>
    )
}

export default Main