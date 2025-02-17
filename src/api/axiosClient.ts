import axios, { } from 'axios';
import queryString from 'query-string';
import {JWT_LOCAL_STORAGE_KEY} from "../constants/data.ts";

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
});


export default axiosClient;