import React, { useState, useEffect } from 'react';
import {
	Table,
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
import '../../assets/css/users.css';
import mockuser from '../../mockusers';
import mockStatement from '../../mockstatements';

const SearchBar = ({ handleChange, value }) => {
	return (
		<Form>
			<FormGroup row>
				<Label style={{ marginTop: '0.5%' }}>
					<i className="fa fa-search" />
				</Label>
				<Col sm={5}>
					<Input
						style={{ width: '60%' }}
						type="text"
						value={value}
						onChange={handleChange}
						placeholder="Search"
					/>
				</Col>
			</FormGroup>
		</Form>
	);
};

const UsersList = () => {
	const [customerList, setCustomerList] = useState([]);
	const [searchKeyWord, setsearchKeyWord] = useState('');

	useEffect(() => {
		setCustomerList(mockuser);
	}, []);
	return (
		<div style={{ marginTop: '2%' }}>
			<SearchBar
				handleChange={e => setsearchKeyWord(e.target.value)}
				value={searchKeyWord}
			/>
			<Table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Full Name</th>
						<th>Tel No.</th>
						<th>Register at</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{customerList.map(customer => (
						<tr key={customer.id}>
							<td>{customer.id}</td>
							<td>{customer.fullname}</td>
							<td>{customer.telno}</td>
							<td>{customer.created_at}</td>
							<td>
								<div className="ActionMenu">
									<Button
										color="primary"
										onClick={() => history.push(`/statement/${customer.id}`)}
									>
										<i className="fa fa-list-alt" />
									</Button>
									<Button
										onClick={() => history.push(`/customer/${customer.id}`)}
										color="warning"
									>
										<i className="fa fa-pencil" />
									</Button>
									<Button color="danger">
										<i className="fa fa-trash-o" />
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

const UserEdit = ({ match }) => {
	const [userData, setUsersData] = useState({});
	const [isLoad, setLoad] = useState(true);

	useEffect(() => {
		const id = match.params.id;
		const index = mockuser.findIndex(item => item.id == id);

		setUsersData(mockuser[index]);
		setLoad(false);
	}, []);
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
								<Form>
									<h3 style={{ marginBottom: '10px' }}>ข้อมูลส่วนตัว</h3>
									<FormGroup row>
										<Label sm={2}>ID</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												type="text"
												value={userData.id}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>ชื่อ-นามสกุล</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.fullname}
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
												value={userData.bank.bank_name}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>ชื่อบัญชี</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.bank.bank_account_name}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>หมายเลขบัญชี</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.bank.bank_no}
											/>
										</Col>
									</FormGroup>
								</Form>
							</div>
						</CardBody>
					</div>
				)}
				<CardFooter>
					<Button color="primary" style={{ float: 'Left' }}>
						<i className="fa fa-floppy-o" /> บันทึกการแก้ไขข้อมูล
					</Button>
					<Button color="danger" style={{ float: 'Right' }}>
						<i className="fa fa-trash-o" /> ลบข้อมูลลูกค้า
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

const UsersStatementList = ({ match }) => {
	const [userStatementData, setUserStatementData] = useState({});
	const [approvList, setApprovlist] = useState([]);
	const [isLoad, setLoad] = useState(true);
	const [searchKeyWord, setsearchKeyWord] = useState('');
	const [userData, setUserData] = useState({});
	const [isLoadUser, setLoadUser] = useState(true);

	useEffect(() => {
		const index = mockStatement.findIndex(
			statement => statement.customer_id === match.params.id,
		);
		setUserStatementData(mockStatement[index]);
		const userIndex = mockuser.findIndex(item => item.id === match.params.id);
		setUserData(mockuser[userIndex]);
		setLoad(false);
		setLoadUser(false);
	}, []);

	const Status = ({ statusText }) => {
		switch (statusText) {
			case 'approved':
				return <div>อนุมัติแล้ว</div>;
			case 'not approved':
				return <div>ไม่อนุมัติรายการ</div>;
			default:
				return <div>รอการอนุมัติ</div>;
		}
	};

	const { statements, total, promotion_total } = userStatementData;
	return (
		<div>
			<Card>
				<CardHeader>
					<Button
						style={{ marginRight: '20px' }}
						onClick={() => history.goBack()}
					>
						<i className="fa fa-arrow-left" />
					</Button>
					Customer ID : <b>{match.params.id}</b>
				</CardHeader>
				{isLoad ? (
					<CardBody>
						<Progress animated value={100} />
					</CardBody>
				) : (
					<CardBody style={{ paddingLeft: '3%' }}>
						<h3 style={{ marginBottom: '10px' }}>ข้อมูล</h3>
						{isLoadUser ? (
							<CardBody>
								<Progress animated value={100} />
							</CardBody>
						) : (
							<CardBody>
								<Form>
									<FormGroup row>
										<Label sm={2}>ชื่อ</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={userData.fullname}
												disabled
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>ยอดในระบบ</Label>
										<Col sm={10}>
											<Input style={{ width: '60%' }} value={total} disabled />
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>ยอดจากโปรโมชั่น</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={promotion_total}
												disabled
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label sm={2}>ยอดสุทธิ</Label>
										<Col sm={10}>
											<Input
												style={{ width: '60%' }}
												value={total + promotion_total}
												disabled
											/>
										</Col>
									</FormGroup>
								</Form>
							</CardBody>
						)}
						<h3 style={{ marginBottom: '10px' }}>รายการรออนุมัติ</h3>
						<Table>
							<thead>
								<tr>
									<th>ลำดับ</th>
									<th>การกระทำ</th>
									<th>คำอธิบาย</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{approvList.map((state, index) => (
									<tr key={state.id}>
										<td>{index}</td>
										<td>{state.type}</td>
										<td>{state.description}</td>
										<td>
											<div className="ActionMenu">
												<Button>อนุมติรายการ</Button>
												<Button>ไม่อนุมัติรายการ</Button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<h3 style={{ marginBottom: '10px' }}>ประวัติการฝาก และถอน</h3>
						<SearchBar
							handleChange={e => setsearchKeyWord(e.target.value)}
							value={searchKeyWord}
						/>
						<Table>
							<thead>
								<tr>
									<th>Statement ID</th>
									<th>เวลา</th>
									<th>การกระทำ</th>
									<th>คำอธิบาย</th>
									<th>มูลค่า</th>
									<th>สถานะ</th>
								</tr>
							</thead>
							<tbody>
								{statements.map(state => (
									<tr key={state.id}>
										<td>{state.id}</td>
										<td>{state.created_at}</td>
										<td>{state.action.type}</td>
										<td>{state.action.description}</td>
										<td>{state.action.value} ฿</td>
										<td>
											<Status statusText={state.status} />
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</CardBody>
				)}
			</Card>
		</div>
	);
};

const Users = () => {
	return (
		<div>
			<UsersList />
		</div>
	);
};

export { Users, UserEdit, UsersStatementList };
