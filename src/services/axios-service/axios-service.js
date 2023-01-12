import axios from "axios"
import { secret } from './../secrets';
export const API_URL = 'https://rentinout.onrender.com'

export const doGetApiMethod = async(_url ) => {
    let token;
    if(localStorage["token"]){
        token = JSON.parse(localStorage["token"])
    }
    try {
        let resp = await axios({
            method: "GET",
            url: secret.SERVER_API_URL + _url,
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
            url: secret.SERVER_API_URL +_url,
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
