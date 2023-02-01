import axios from "axios"
import {secret} from '../secrets';

export const doGetApiMethod = async (_url) => {
    let token;
    if (localStorage["token"]) {
        token = JSON.parse(localStorage["token"])
    }
    try {
        return await axios({
            method: "GET",
            url: secret.SERVER_API_URL + _url,
            headers: {
                'x-api-key': token
            }
        })
    } catch (err) {
        throw err;
    }
}
export const doApiMethod = async (_url, _method, _body = {}, _headers = {}) => {
    let token;
    if (localStorage["token"]) {
        token = JSON.parse(localStorage["token"])
    }
    try {
        return await axios({
            method: _method,
            url: secret.SERVER_API_URL + _url,
            headers: {
                'x-api-key': token
            },
            data: _body,
        })
    } catch (err) {
        throw err;
    }
}
