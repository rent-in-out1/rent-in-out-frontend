import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doGetApiMethod } from '../../../services/axios-service/axios-service';
import Loader from '../../../shared/components/loader/loader';
import { Wrapper } from '../../../assets/styles/wrappers/singlePost';
import PostHeader from '../../../shared/components/postHeader/postHeader';
const SinglePost = () => {
  const params = useParams();
  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPostByID()
  }, [])

  /** get post from api */
  const getPostByID = async () => {
    let url = "/posts/getPostByID/" + params.postID;
    const post = await doGetApiMethod(url)
    setPost(post.data);
    setIsLoading(false)
  }
  return (
    <Wrapper>
      {isLoading ? <div className='w-full flex justify-center items-center min-h-12'>
        <Loader width={"150px"} height={"100%"} />
      </div> :
        // images 
        <section>
          <div className="images-carousel">
            <img src={post.img[0].url} alt="" />
          </div>
          {/* post context */}
          <main>
              <div className="user-header">
                {post && <PostHeader post={post}/>}
              </div>
              <div className="post-info">

              </div>
              <div className="post-likes">

              </div>
              <div className="contact">

              </div>
          </main>
        </section>}
    </Wrapper>
  )
}

export default SinglePost