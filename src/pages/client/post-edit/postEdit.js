import React from 'react'
import { useSelector } from 'react-redux'

const PostEdit = () => {
    const {editablePost} = useSelector(state=> state.postsSlice)
  return (
    <div>PostEdit</div>
  )
}

export default PostEdit