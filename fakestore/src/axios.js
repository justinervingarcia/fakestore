import axios from 'axios';

const baseURL = 'https://fakestoreapi.com/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 100000,
});

export default axiosInstance;