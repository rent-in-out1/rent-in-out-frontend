import axios from "axios"
export const API_URL = 'https://rentinout.onrender.com'



export const doGetApiMethod = async(_url) => {
    try {
        let resp = await axios({
            method: "GET",
            url: API_URL + _url,
            headers: {
                'x-api-key' : JSON.parse(localStorage["userData"]).token
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}
export const doApiMethod = async(_url, _method, _body = {}, _headers = {}) => {
    try {
        let resp = await axios({
            method: _method,
            url: API_URL+_url,
            data: _body,
            headers: _headers 
        })
        return resp;
    } catch (err) {
        throw err;
    }
}