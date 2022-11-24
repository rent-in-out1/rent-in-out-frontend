import React from 'react'
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


export const Details = () => {
    const {user} = useSelector(state=>state.userSlice)
    const { register, handleSubmit, formState: { errors } } = useForm();
   
  return (
    <div className='container'>
    
    <h2>Edit category</h2>
    {user.fullName.firstName ? <form  className='col-md-6 p-3 shadow'>
      <label>Name:</label>
      <input defaultValue={user.fullName.firstName} {...register("name", { required: true, minLength: 2 })} type="text" className='form-control' />
      {errors.name && <div className='text-danger'>Enter valid name (min 2 chars) </div>}

    
      <div className='mt-3'>
        <button className='btn btn-success me-5'>Update</button>
        <Link className='btn btn-danger' to="/admin/categories">Back</Link>
      </div>
    </form> : <h2>Loading...</h2> }
  </div>
  )
}
