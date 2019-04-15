import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import _ from 'lodash';
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
	gameId: '',
	email: '',
	telno: '',
	bank_name: '',
	bank_account_name: '',
	bank_account_id: '',
});

const UserCreate = () => {
	const [userInfo, setUserInfo] = useState(userInfoFormat);
	const [validate, setValidate] = useState({
		fullname: false,
		gameId: false,
		telno: false,
	});

	const checkGameIdExists = async gameId => {
		const { data: Respone } = await axios.get(
			`/api/v1/customers?filter=${JSON.stringify({ gameId: gameId })}`,
		);
		const { data } = Respone;
		if (data.count > 0) {
			return true;
		} else {
			return false;
		}
	};
	const checkGameIdExistsDebound = _.debounce(checkGameIdExists, 900);

	const validater = async (event, key = '') => {
		const value = event.target.value;
		setUserInfo({ ...userInfo, [key]: value.toString() });
		if (key === 'gameId') {
			if (value.length < 6 || checkGameIdExistsDebound(value)) {
				setValidate({ ...validate, gameId: false });
			} else {
				setValidate({ ...validate, gameId: true });
			}
		} else if (key === 'fullname') {
			if (value.length < 6) {
				setValidate({ ...validate, fullname: false });
			} else {
				setValidate({ ...validate, fullname: true });
			}
		} else if (key === 'telno') {
			if (value.length <= 9 || value.length >= 11) {
				setValidate({ ...validate, telno: false });
			} else {
				setValidate({ ...validate, telno: true });
			}
		}
	};

	const createCustomer = async () => {
		try {
			const postData = {
				gameId: userInfo.gameId,
				fullname: userInfo.fullname,
				email: userInfo.email,
				telno: userInfo.telno,
				bank: userInfo.bank_name,
				bank_account_name: userInfo.bank_account_name,
				bank_account_id: userInfo.bank_account_id,
			};
			const { data: response } = await axios.post('/api/v1/customers', {
				data: postData,
			});
			const { data } = response;
			const text = data.result
				? 'สร้างข้อมูลลูกค้าสำเร็จ'
				: 'สร้างข้อมูลลูกค้าไม่สำเร็จ';
			await swal.fire('Result', text, 'info');
			history.push('/customers');
			setUserInfo(userInfoFormat);
		} catch (err) {
			console.log(err);
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
				<b>การสร้างข้อมูลลูกค้าใหม่</b>
			</CardHeader>
			<CardBody>
				<div>
					<h3 style={{ marginBottom: '10px' }}>ข้อมูลส่วนตัว</h3>
					<Form>
						<FormGroup row>
							<Label sm={2}>ID</Label>
							<Col sm={10}>
								<Input
									style={{ width: '60%' }}
									type="number"
									value={userInfo.gameId}
									onChange={e => validater(e, 'gameId')}
									min={6}
								/>
								{!validate.gameId && (
									<div className="text-danger">
										ID ต้องมีตัวอักษรภาษาอังกฤษและมากกว่า 6 ตัว หรือมีคนใช้แล้ว
									</div>
								)}
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>ชื่อ-นามสกุล</Label>
							<Col sm={10}>
								<Input
									type="text"
									style={{ width: '60%' }}
									value={userInfo.fullname}
									onChange={e => validater(e, 'fullname')}
								/>
								{!validate.fullname && (
									<div className="text-danger">
										ต้องมีตัวอักษรและมากกว่า 6 ตัว
									</div>
								)}
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>เบอร์โทร</Label>
							<Col sm={10}>
								<Input
									style={{ width: '60%' }}
									type="number"
									value={userInfo.telno}
									onChange={e => validater(e, 'telno')}
									maxLength={10}
									min={10}
								/>
								{!validate.telno && (
									<div className="text-danger">ต้องเป็นตัวเลข 10 ตัว</div>
								)}
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>E-mail</Label>
							<Col sm={10}>
								<Input
									type="email"
									style={{ width: '60%' }}
									value={userInfo.email}
									onChange={e => validater(e, 'email')}
								/>
							</Col>
						</FormGroup>
					</Form>
					<h3 style={{ marginBottom: '10px' }}>ข้อมูลธนาคาร</h3>
					<Form>
						<FormGroup row>
							<Label sm={2}>ธนาคาร</Label>
							<Col sm={10}>
								<Input
									style={{ width: '60%' }}
									type="text"
									value={userInfo.bank_name}
									onChange={e => validater(e, 'bank_name')}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>ชื่อบัญชี</Label>
							<Col sm={10}>
								<Input
									style={{ width: '60%' }}
									type="text"
									value={userInfo.bank_account_name}
									onChange={e => validater(e, 'bank_account_name')}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>หมายเลขบัญชี</Label>
							<Col sm={10}>
								<Input
									type="text"
									style={{ width: '60%' }}
									value={userInfo.bank_account_id}
									onChange={e => validater(e, 'bank_account_id')}
								/>
							</Col>
						</FormGroup>
					</Form>
				</div>
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
