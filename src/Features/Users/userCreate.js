import React, { useState } from 'react';
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

const UserCreate = () => {
	const [userInfo, setUserInfo] = useState({
		fullname: '',
		gameId: '',
		telno: '',
		bank_name: '',
		bank_account_name: '',
		bank_account_id: '',
	});

	const [validate, setValidate] = useState({
		fullname: false,
		gameId: false,
		telno: false,
		bank_name: false,
		bank_account_name: false,
		bank_account_id: false,
	});

	const validater = (event, key) => {
		const value = event.target.value;
		setUserInfo({ ...userInfo, [key]: value });
		if (key === 'gameId') {
			if (value.length < 6) {
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
									type="text"
									value={userInfo.gameId}
									onChange={e => validater(e, 'gameId')}
								/>
								{!validate.gameId && (
									<div className="text-danger">
										ID ต้องมีตัวอักษรภาษาอังกฤษและมากกว่า 6 ตัว
									</div>
								)}
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>ชื่อ-นามสกุล</Label>
							<Col sm={10}>
								<Input
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
									type="text"
									value={userInfo.telno}
									onChange={e => validater(e, 'telno')}
								/>
								{!validate.telno && (
									<div className="text-danger">ต้องเป็นตัวเลข 10 ตัว</div>
								)}
							</Col>
						</FormGroup>
					</Form>
					<h3 style={{ marginBottom: '10px' }}>ข้อมูลธนาคาร</h3>
					<Form>
						<FormGroup row>
							<Label sm={2}>ธนาคาร</Label>
							<Col sm={10}>
								<Input style={{ width: '60%' }} value={userInfo.bank_name} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>ชื่อบัญชี</Label>
							<Col sm={10}>
								<Input
									style={{ width: '60%' }}
									value={userInfo.bank_account_name}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>หมายเลขบัญชี</Label>
							<Col sm={10}>
								<Input
									style={{ width: '60%' }}
									value={userInfo.bank_account_id}
								/>
							</Col>
						</FormGroup>
					</Form>
				</div>
			</CardBody>
			<CardFooter>
				<Button color="primary">Add User</Button>
			</CardFooter>
		</Card>
	);
};

export default UserCreate;
