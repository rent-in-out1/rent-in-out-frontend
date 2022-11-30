import React from 'react'

const UserCard = ({item}) => {
   
  return (

    <div className='w-1/2 mt-3'>
        <div className='p-2'>
            {item.fullName.firstName}
        </div>
        
    </div>
  )
}

export default UserCard