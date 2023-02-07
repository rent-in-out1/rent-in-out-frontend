import React, {useState} from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import CreatePost from "./createPostAlternative";
import Card from "../../../shared/components/card";
import {useScroll} from "../../../hooks/useScroll";
import {clearPosts, getPosts} from "../../../redux/features/postsSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const [isChange,setIsChange] = useState(false);
    const {posts, loading} = useSelector((state) => state.postsSlice);
    const nav = useNavigate();
    const {user} = useSelector((state) => state.userSlice);
    const [onAdd, setOnAdd] = useState(false);
    const [page, setPage] = useState(1);
    const [endScreen, endScreenEnd] = useScroll(900);
    useEffect(() => {
        if (user?.role === "admin") nav("/admin")
    }, [user])

    useEffect(() => {
        setIsChange(false)
        setPage(1);
        dispatch(clearPosts());
        return () => {
            dispatch(clearPosts());
        };
    }, []);

    useEffect(() => {
        dispatch(
            getPosts({page, endScreenEnd, setPage})
        );
    }, [endScreen]);

    return (
        <div className='flex'>
            <main className="min-h-screen p-1 md:p-3 text-center justify-center">
                {!loading && user &&
                    (<div
                        className="bg-white p-3 space-x-1 md:w-10/12 w-full mx-auto rounded-xl drop-shadow-xlfixed top-2 left-2">
                        {!onAdd ? (
                                /* show create post */
                                <div className="flex justify-center mt-2 mb-8">
                                    <button
                                        className="btn cursor-pointer bg-blue-400 opacity-50 rounded-full w-1/2  inline-block px-2 py-3 font-semibold leading-tight hover:text-white hover:bg-blue-600"
                                        type="button"
                                        onClick={() => setOnAdd(true)}
                                    >
                                        Add New Post
                                    </button>
                                </div>
                            ) :
                            <CreatePost setOnAdd={setOnAdd}/>}

                        {onAdd ? (
                            /* hide create post */
                            <div className="flex justify-center mt-2 mb-8">
                                {/* <button
                                    className="btn cursor-pointer bg-blue-400 opacity-50 rounded-full w-1/2 md:w-1/6 inline-block px-2 py-3 font-semibold leading-tight hover:text-white hover:bg-blue-600"
                                    type="button"
                                    onClick={() => {
                                        setOnAdd(false)
                                        
                                    }}
                                >
                                    Cancel
                                </button> */}
                            </div>
                        ) : null}
                    </div>)}
                <div id="posts" className="flex flex-wrap mx-auto mt-3 justify-between px-1">
                    {posts &&
                        posts?.map((post, i) => (
                            <div key={post?._id} className="md:w-1/2 w-full flex">
                                <Card post={post} key={i}/>
                            </div>
                        ))}
                </div>
            </main>
        </div>
    )
}
export default Dashboard;
