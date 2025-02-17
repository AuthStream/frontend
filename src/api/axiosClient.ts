import axios, { } from 'axios';
import queryString from 'query-string';
import { JWT_LOCAL_STORAGE_KEY } from "../constants/data.ts";

const axiosClient = axios.create({
	baseURL: import.meta.env.REACT_APP_VITE_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {

	const accessToken = window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY);

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

axiosClient.interceptors.response.use((response) => {
	if (response && response.data) {
		return response.data;
	}

	return response;
}, (error) => {

	const errorMessage = "Something went wrong!"

	if (error.response.data) {
		throw error.response.data;
	}
	throw errorMessage;


	const status = error?.response?.status || 500;

	switch (status) {
		case 401: {
			console.log('Unauthorized! Token might be expired.');
			return Promise.reject(error.response);
		}
		case 403: {
			console.log('Forbidden: You do not have permission.');
			return Promise.reject(error);
		}
		case 400: {
			console.log('Bad Request: Invalid data.');
			return Promise.reject(error);
		}
		case 404: {
			console.log('Not Found: API endpoint does not exist.');
			return Promise.reject(error);
		}

		case 500:
		case 502:
		case 503:
		case 504: {
			console.log('Server Error: Please try again later.');
			return Promise.reject(error);
		}
		default: {
			console.log('Unexpected Error');
			return Promise.reject(error);
		}
	}
});


export default axiosClient;