import { useState,useEffect } from "react";

const Confirm = ({messege , action , setIsShow})=>{
    const [firstLoad , setFirstLoad] = useEffect(true)
    const [pressed , setIsPressed] = useEffect(false)
    useEffect(() => { 
        if(!firstLoad){
            action()
            setIsShow(false)
        }
        setFirstLoad(false)
    }, [pressed])
  return (
    <div>Confirm</div>
  )
}

export default Confirm