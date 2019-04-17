import Axios from 'axios';
import config from '../config';
import Cookie from 'universal-cookie';
const cookie = new Cookie();
const axiosInstance = Axios.create({
	baseURL: config.api_uri,
	headers: { Authorization: `bearer ${cookie.get('token')}` },
});

export default axiosInstance;
