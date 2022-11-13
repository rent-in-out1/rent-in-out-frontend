import axios from "axios"
export const API_URL = 'https://rentinout.onrender.com'

export const doGetApiMethod = async(_url, _method, _body = {}) => {
    try {
        let resp = await axios({
            method: "GET",
            url: _url,
            headers: {
                'x-api-key' : localStorage["token"] 
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}
export const doApiMethod = async(_url, _method, _body = {}) => {
    try {
        let resp = await axios({
            method: _method,
            url: _url,
            data: _body,
            headers: {
                'x-api-key' : localStorage["token"] 
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}