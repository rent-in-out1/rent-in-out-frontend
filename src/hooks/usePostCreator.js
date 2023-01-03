import { useState,useEffect } from "react";
import { doGetApiMethod } from './../services/axios-service/axios-service';
export function usePostCreator(id){
    const [creator , setCreator] = useState({})
  useEffect(() => {
    getPostCreatorInfo(id);
  }, []);
    const getPostCreatorInfo = async (id) => {
    const { data } = await doGetApiMethod("/users/info/" + id);
    setCreator(data.userInfo);
  };
  return [creator]
}