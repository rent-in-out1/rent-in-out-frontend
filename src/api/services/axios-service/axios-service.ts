import axios from 'axios';
import { secret } from '../../../util/secrets';

const apiUrl = secret.SERVER_API_URL;
export const doApiMethod = async <T>(url: string, method: 'GET' | 'PUT' | 'POST' | 'DELETE', _body = {}) => {
	let token;
	if (localStorage['token']) {
		token = JSON.parse(localStorage['token']);
	}
	try {
		return await axios<T>({
			method: method,
			url: `${apiUrl}${url}`,
			headers: {
				'x-api-key': token,
			},
			responseType: 'json',
			data: _body,
		});
	} catch (err) {
		throw err;
	}
};

export const doGetApiMethod = async (_url) => {
	let token;
	if (localStorage['token']) {
		token = JSON.parse(localStorage['token']);
	}
	try {
		return await axios({
			method: 'GET',
			url: `${apiUrl}${_url}`,
			headers: {
				'x-api-key': token,
			},
			responseType: 'json',
		});
	} catch (err) {
		throw err;
	}
};
