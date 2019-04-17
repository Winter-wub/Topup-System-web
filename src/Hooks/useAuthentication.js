import { useState, useGlobal } from 'reactn';
import Cookie from 'universal-cookie';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from '../utils/axios';
import history from '../utils/history';
const swal = withReactContent(Swal);
const cookie = new Cookie();
const useAuthentication = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [, setIslogin] = useGlobal('isLogin');
	const [, setRole] = useGlobal('role');

	const Login = () => {
		axios
			.post('/api/v1/users/login', {
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
					setIslogin(true);
					setRole(data.role);
					swal.fire('Login', 'Login In สำเร็จ', 'success').then(() => {
						history.push('/');
					});
				} else {
					swal.fire('Login', 'Username หรือ  Password ผิด', 'warning');
				}
			})
			.catch(err => {
				console.log(err);
				swal.fire('Login', 'เกิดข้อผิดพลาดไม่สามารถติดต่อ API ได้', 'error');
			});
	};

	return {
		setUsername,
		setPassword,
		Login,
		username,
		password,
	};
};

export default useAuthentication;
