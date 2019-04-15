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
import history from '../../utils/history';
import useCustomer from '../../Hooks/useCustomer';

const UserEdit = ({ match }) => {
	const {
		isLoad,
		userData,
		setUsersData,
		updateUserData,
		deleteUser,
	} = useCustomer(match.params.id);

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
								onClick={() => history.goBack()}
							>
								<i className="fa fa-arrow-left" />
							</Button>
							{userData.fullname}
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
												value={userData.gameId}
												onChange={e =>
													setUsersData({ ...userData, gameId: e.target.value })
												}
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
								</Form>
								<h3 style={{ marginBottom: '10px' }}>ข้อมูลธนาคาร</h3>
								<Form>
									<FormGroup row>
										<Label sm={2}>ธนาคาร</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.bank_info.bank_name}
												onChange={e =>
													setUsersData({
														...userData,
														bank_info: {
															...userData.bank_info,
															bank_name: e.target.value,
														},
													})
												}
											/>
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
												value={userData.bank_info.bank_no}
												onChange={e =>
													setUsersData({
														...userData,
														bank_info: {
															...userData.bank_info,
															bank_no: e.target.value,
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
						style={{ float: 'Left' }}
					>
						<i className="fa fa-floppy-o" /> บันทึกการแก้ไขข้อมูล
					</Button>
					<Button
						color="danger"
						style={{ float: 'Right' }}
						onClick={() => deleteUser(match.params.id)}
					>
						<i className="fa fa-trash-o" /> ลบข้อมูลลูกค้า
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default UserEdit;
