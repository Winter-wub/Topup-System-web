import Axios from 'axios';
import config from '../config';
const axiosInstance = Axios.create({
	baseURL: config.api_uri,
	headers: { Authorization: `bearer ${window.localStorage.getItem('token')}` },
});

export default axiosInstance;
