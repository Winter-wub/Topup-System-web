import Axios from 'axios';
import config from '../config';

const axiosInstance = Axios.create({
	baseURL: config.api_uri,
});

export default axiosInstance;
