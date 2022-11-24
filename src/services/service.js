import axios from "axios"
import {toast} from "react-toastify"
export const API_URL = 'https://rentinout.onrender.com'

export const doGetApiMethod = async(_url) => {
    let token;
    if(localStorage["token"]){
        token = JSON.parse(localStorage["token"])
    }
    try {
        let resp = await axios({
            method: "GET",
            url: API_URL + _url,
            headers: {
                'x-api-key' : token
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}
export const doApiMethod = async(_url, _method, _body = {}, _headers = {}) => {
    let token;
    if(localStorage["token"]){
        token = JSON.parse(localStorage["token"])
    }
    try {
        let resp = await axios({
            method: _method,
            url: API_URL+_url,
            headers: {
                'x-api-key' : token
            },
            data: _body,
        })
        return resp;
    } catch (err) {
        throw err;
    }
}

export const errorHandler = (err) => {
    toast.info(err , {
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"})
}