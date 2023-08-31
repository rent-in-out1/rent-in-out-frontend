import axios from "axios";
import { secret } from "../../../util/secrets";

const apiUrl = secret.SERVER_API_URL;
export const doGetApiMethod = async (_url) => {
  let token;
  if (localStorage["token"]) {
    token = JSON.parse(localStorage["token"]);
  }
  try {
    return await axios({
      method: "GET",
      url: `${apiUrl}${_url}`,
      headers: {
        "x-api-key": token,
      },
      responseType: "json",
    });
  } catch (err) {
    throw err;
  }
};
export const doApiMethod = async (_url, _method, _body = {}, _headers = {}) => {
  let token;
  if (localStorage["token"]) {
    token = JSON.parse(localStorage["token"]);
  }
  try {
    return await axios({
      method: _method,
      url: `${apiUrl}${_url}`,
      headers: {
        "x-api-key": token,
      },
      responseType: "json",
      data: _body,
    });
  } catch (err) {
    throw err;
  }
};
