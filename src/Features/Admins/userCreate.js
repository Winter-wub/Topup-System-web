import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Col,
} from 'reactstrap';
import history from '../../utils/history';
import axios from '../../utils/axios';
const swal = withReactContent(Swal);

const userInfoFormat = () => ({
	fullname: '',
	password: '',
	role: '',
});

const UserCreate = () => {
	const [userInfo, setUserInfo] = useState(userInfoFormat);
	const [validate, setValidate] = useState({
		username: false,
		password: false,
		role: false,
	});

	const checkGameIdExists = async username => {
		const { data: Respone } = await axios.get(
			`/api/v1/users?filter=${JSON.stringify({ username: username })}`,
		);
		const { data } = Respone;
		if (data.count > 0) {
			return true;
		} else {
			return false;
		}
	};

	const validater = async (event, key = '') => {
		const value = event.target.value;
		setUserInfo({ ...userInfo, [key]: value.toString() });
		if (key === 'username') {
			if (value.length > 6) {
				if (await checkGameIdExists(value)) {
					setValidate({ ...validate, username: false });
				} else {
					setValidate({ ...validate, username: true });
				}
			} else {
				setValidate({ ...validate, username: false });
			}
		} else if (key === 'password') {
			if (value.length < 7) {
				setValidate({ ...validate, password: false });
			} else {
				setValidate({ ...validate, password: true });
			}
		} else if (key === 'role') {
			if (value === '99') {
				setValidate({ ...validate, role: true });
			} else {
				if (value === '1') {
					setValidate({ ...validate, role: true });
				} else {
					setValidate({ ...validate, role: false });
				}
			}
		}
	};

	const createCustomer = async () => {
		try {
			const postData = {
				fullname: userInfo.fullname,
				password: userInfo.password,
				username: userInfo.username,
			};
			const { data: response } = await axios.post('/api/v1/users/register', {
				data: postData,
			});
			const { data } = response;
			const text = data.result
				? 'สร้างข้อมูลผู้ใช้สำเร็จ'
				: 'สร้างข้อมูลผู้ใช้ไม่สำเร็จ';
			await swal.fire('Result', text, 'info');
			history.push('/users');
		} catch (err) {
			await swal.fire(
				'Result',
				'ไม่สามารถติดต่อกับ API ได้ กรุณาลองใหม่อีกครั้ง',
				'warning',
			);
		}
	};

	const isEnabledAddNewCustomer = Object.values(validate).includes(false);

	return (
		<Card>
			<CardHeader>
				<Button style={{ marginRight: '2%' }} onClick={() => history.goBack()}>
					<i className="fa fa-arrow-left" /> Cancel
				</Button>
				<b>การสร้างข้อมูลผู้ใช้ไหมใหม่</b>
			</CardHeader>
			<CardBody>
				<h3 style={{ marginBottom: '10px' }}>ข้อมูลส่วนตัว</h3>
				<Form>
					<FormGroup row>
						<Label sm={2}>ชื่อ-นามสกุล*</Label>
						<Col sm={10}>
							<Input
								type="text"
								style={{ width: '60%' }}
								value={userInfo.fullname}
								onChange={e => validater(e, 'fullname')}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2}>Username</Label>
						<Col sm={10}>
							<Input
								style={{ width: '60%' }}
								type="text"
								value={userInfo.username}
								onChange={e => {
									validater(e, 'username');
								}}
								maxLength={16}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2}>password</Label>
						<Col sm={10}>
							<Input
								style={{ width: '60%' }}
								type="text"
								value={userInfo.password}
								onChange={e => {
									validater(e, 'password');
								}}
								min={8}
								maxLength={32}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2}>Role</Label>
						<Col sm={10}>
							<Input
								style={{ width: '60%' }}
								type="number"
								value={userInfo.role}
								onChange={e => {
									validater(e, 'role');
								}}
							/>
							* 99 = Admin ; 1 = Staff
						</Col>
					</FormGroup>
				</Form>
			</CardBody>
			<CardFooter>
				<Button
					disabled={isEnabledAddNewCustomer}
					color="primary"
					onClick={async () => await createCustomer()}
				>
					Add User
				</Button>
			</CardFooter>
		</Card>
	);
};

export default UserCreate;
