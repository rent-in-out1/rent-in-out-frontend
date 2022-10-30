import axios from "axios"
export const API_URL = 'https://ill-plum-barracuda-vest.cyclic.app'
export const doApiMethod = async(_url, _method, _body = {}) => {
    try {
        let resp = await axios({
            method: _method,
            url: _url,
            data: JSON.stringify(_body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return resp;
    } catch (err) {
        throw err;
    }
}