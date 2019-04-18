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
import useUser from '../../Hooks/useUser';

const UserEdit = ({ match }) => {
	const {
		isLoad,
		userData,
		setUsersData,
		updateUserData,
		deleteUser,
	} = useUser(match.params.id);

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
							{userData.username}
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
												value={userData._id}
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
										<Label sm={2}>Username</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.username}
												onChange={e =>
													setUsersData({
														...userData,
														username: e.target.value,
													})
												}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>Role</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.role}
												onChange={e =>
													setUsersData({
														...userData,
														role: e.target.value,
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
						<i className="fa fa-trash-o" /> ลบข้อมูลผู้ใช้
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default UserEdit;
