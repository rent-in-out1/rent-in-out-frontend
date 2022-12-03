import React from 'react'
import { useEffect } from 'react'
import { doGetApiMethod } from '../../services/service'
import Card from '../card'

const Main = () => {
    useEffect(()=>{
        doApi()
    },[])
    const doApi = async() => { 
        let url_posts = "/posts?page=1"
        let {data} = await doGetApiMethod(url_posts);
        console.log(data) 
    }
    return (
        <main className='w-full  p-3 bg-gray-100 text-center justify-center'>
            <div className='w-1/2'>
            </div>
            
        </main>
    )
}

export default Main