import { useState, useGlobal } from 'reactn';
import Cookie from 'universal-cookie';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import config from '../config';
import history from '../utils/history';
const swal = withReactContent(Swal);
const cookie = new Cookie();
const useAuthentication = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoad, setIsload] = useState(false);
	const [, setIslogin] = useGlobal('isLogin');
	const [role, setRole] = useGlobal('role');
	const [staffid, setStaffId] = useGlobal('staffid');
	const [username_state, setStateUsername] = useGlobal('username');

	const Login = () => {
		setIsload(true);
		axios
			.post(`${config.api_uri}/api/v1/users/login`, {
				data: {
					username,
					password,
				},
			})
			.then(({ data: Response }) => {
				const { data } = Response;
				if (data.status === true) {
					cookie.set('token', data.token);
					cookie.set('role', data.role);
					cookie.set('username', data.username);
					setIslogin(true);
					setRole(data.role);
					setStaffId(data.staffid);
					setStateUsername(data.username);
					swal.fire('Login', 'Login In สำเร็จ', 'success').then(() => {
						history.push('/dashboard');
						window.location.reload();
					});
				} else {
					swal.fire('Login', 'Username หรือ  Password ผิด', 'warning');
				}
			})
			.catch(err => {
				console.log(err);
				swal.fire('Login', 'เกิดข้อผิดพลาดไม่สามารถติดต่อ API ได้', 'error');
			})
			.finally(() => {
				setIsload(false);
			});
	};

	const logout = () => {
		cookie.remove('token');
		cookie.remove('username');
		cookie.remove('role');
		setIslogin(false);
		setStaffId('');
		setStateUsername('');
		setRole('1');
		history.push('/login');
	};

	return {
		setUsername,
		setPassword,
		Login,
		username,
		password,
		logout,
		isLoad,
		role,
		username_state,
		staffid,
	};
};

export default useAuthentication;
