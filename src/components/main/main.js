import React from 'react'
import Card from '../card'

const Main = () => {
    return (
        <main className='w-full  p-3 bg-gray-100 text-center justify-center'>
            <div className='w-1/2'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            </div>
        </main>
    )
}

export default Main