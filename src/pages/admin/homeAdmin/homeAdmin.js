import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const HomeAdmin = () => {
  const user = useSelector(state => state.userSlice.user)
  useState(() => {
    console.log(user)
  }, [])
  return (
    <div className="text-center mt-4">
      <h1 className="text-3xl font-sans">Welcome back {user?.fullName.firstname} {user?.fullName.lastname} !</h1>
      <h3 className="text-2xl mt-2">List Of Tables : </h3>
      <div className="flex wrap p-3">
      <Link to={"/admin/users"} className="box w-1/3 p-2">
          <div className="bg-red-300 h-48 cursor-pointer hover:bg-red-600 flex items-center justify-center">
            <h2 className="text-xl font-bold">Users</h2>
        </div>
        </Link>
        <Link to={"/admin/posts"} className="box w-1/3 p-2">
          <div className="bg-blue-300 h-48 cursor-pointer hover:bg-blue-600 flex items-center justify-center">
            <h2 className="text-xl font-bold">Posts</h2>
          </div>
        </Link>
        <Link to={"/admin/categories"} className="box w-1/3 p-2">
           <div className="bg-green-300 h-48 cursor-pointer hover:bg-green-600 flex items-center justify-center">
              <h2 className="text-xl font-bold">Categories</h2>
          </div>
        </Link>
      </div>

    </div>
  )
}

export default HomeAdmin