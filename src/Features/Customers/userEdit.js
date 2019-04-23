import React from 'react';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	FormGroup,
	Label,
	Col,
	Input,
	Form,
	Progress,
} from 'reactstrap';
import Select from 'react-select';
import banks from '../../assets/bank.json';
import history from '../../utils/history';
import useCustomer from '../../Hooks/useCustomer';

const ReferenceOption = [
	{ label: 'จากเพื่อน', value: 'friend' },
	{ label: 'Facebook Group', value: 'fb_group' },
	{ label: 'Google,Yahoo,Bing', value: 'search_engine' },
	{ label: 'อื่นๆ', value: 'other' },
];

const banksOptions = banks.map(bank => ({
	label: bank.thainame,
	value: bank.official_name,
}));

const Referencemenu = ({ optionName, value }) => {
	switch (optionName) {
		case 'fb_group':
			return (
				<FormGroup row>
					<Label sm={2}>จากกลุ่ม</Label>
					<Col sm={10}>
						<Input
							style={{ width: '60%' }}
							type="text"
							value={value}
							disabled
						/>
					</Col>
				</FormGroup>
			);
		case 'other':
			return (
				<FormGroup row>
					<Label sm={2}>รายละเอียด</Label>
					<Col sm={10}>
						<Input
							style={{ width: '60%' }}
							type="text"
							value={value}
							disabled
						/>
					</Col>
				</FormGroup>
			);
		default:
			return '';
	}
};

const UserEdit = ({ match }) => {
	const {
		isLoad,
		userData,
		setUsersData,
		updateUserData,
		deleteUser,
	} = useCustomer(match.params.id);

	const currentIndexBank = banksOptions.findIndex(
		bank => bank.value === userData.bank_info.bank,
	);
	let currentBankOptions = {
		value: '',
		label: '',
	};
	if (currentIndexBank >= 0) {
		currentBankOptions = banksOptions[currentIndexBank];
	}

	const currentReferenceTypeIndex =
		userData.reference &&
		ReferenceOption.findIndex(ref => ref.value === userData.reference.type);
	let currentReferentType = '';
	if (currentReferenceTypeIndex >= 0) {
		currentReferentType = ReferenceOption[currentReferenceTypeIndex].label;
	}

	return (
		<div>
			<Card>
				{isLoad ? (
					<CardBody>
						<Progress animated value={100} />
					</CardBody>
				) : (
					<div>
						<CardHeader>
							<Button
								style={{ marginRight: '20px' }}
								onClick={() => history.goBack()}>
								<i className="fa fa-arrow-left" />
							</Button>
							{userData.fullname}
						</CardHeader>
						<CardBody>
							<div>
								<h3 style={{ marginBottom: '10px' }}>ข้อมูลส่วนตัว</h3>
								<Form>
									<FormGroup row>
										<Label sm={2}>App Id</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												type="text"
												value={userData.gameId}
												disabled
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>ชื่อ-นามสกุล</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.fullname}
												onChange={e =>
													setUsersData({
														...userData,
														fullname: e.target.value,
													})
												}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>เบอร์โทร</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												type="text"
												value={userData.telno}
												onChange={e =>
													setUsersData({ ...userData, telno: e.target.value })
												}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>Email</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												type="text"
												value={userData.email}
												onChange={e =>
													setUsersData({ ...userData, email: e.target.value })
												}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>Reference type</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												type="text"
												value={currentReferentType}
												disabled
											/>
										</Col>
									</FormGroup>
									<Referencemenu
										optionName={userData.reference.type}
										value={userData.reference.value}
									/>
									<FormGroup row>
										<Label sm={2}>Remark</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												type="text"
												value={userData.remark}
												disabled
											/>
										</Col>
									</FormGroup>
								</Form>
								<h3 style={{ marginBottom: '10px' }}>ข้อมูลธนาคาร</h3>
								<Form>
									<FormGroup row>
										<Label sm={2}>ธนาคาร</Label>
										<Col sm={10}>
											<div style={{ width: '60%' }}>
												<Select
													options={banksOptions}
													value={currentBankOptions}
													onChange={e =>
														setUsersData({
															...userData,
															bank_info: {
																...userData.bank_info,
																bank: e.value,
															},
														})
													}
												/>
											</div>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>ชื่อบัญชี</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.bank_info.bank_account_name}
												onChange={e =>
													setUsersData({
														...userData,
														bank_info: {
															...userData.bank_info,
															bank_account_name: e.target.value,
														},
													})
												}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>หมายเลขบัญชี</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.bank_info.bank_account_id}
												onChange={e =>
													setUsersData({
														...userData,
														bank_info: {
															...userData.bank_info,
															bank_account_id: e.target.value,
														},
													})
												}
											/>
										</Col>
									</FormGroup>
								</Form>
							</div>
						</CardBody>
					</div>
				)}
				<CardFooter>
					<Button
						color="primary"
						onClick={() => {
							updateUserData();
						}}
						style={{ float: 'Left' }}>
						<i className="fa fa-floppy-o" /> บันทึกการแก้ไขข้อมูล
					</Button>
					<Button
						color="danger"
						style={{ float: 'Right' }}
						onClick={() => deleteUser(match.params.id)}>
						<i className="fa fa-trash-o" /> ลบข้อมูลลูกค้า
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default UserEdit;
