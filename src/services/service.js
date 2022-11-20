import axios from "axios"
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
    console.log(_body)
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