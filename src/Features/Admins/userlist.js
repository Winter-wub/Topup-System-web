import React from 'react';
import {
	Table,
	Button,
	Progress,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Col,
	Row,
	Input,
	InputGroup,
	InputGroupAddon,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Searchbox from '../../Components/Searchbox';

import useUsers from '../../Hooks/useUsers';

import history from '../../utils/history';
import '../../assets/css/users.css';
const swal = withReactContent(Swal);

const UsersList = () => {
	const {
		isLoad,
		userList,
		setFilter,
		filter,
		setOrder,
		setToggleAsc,
		toggleAsc,
		order,
		page,
		setPage,
		deleteUser,
	} = useUsers(10);

	const header = [
		{ key: '_id', label: 'uniq Id' },
		{ key: 'username', label: 'Username' },
		{ key: 'fullname', label: 'Full name' },
		{ key: 'created_at', label: 'Create at' },
	];

	return (
		<Card>
			<CardHeader>
				<b>User Managerment</b>
			</CardHeader>
			<div style={{ marginTop: '1%', marginLeft: '3%', marginRight: '3%' }}>
				<Row>
					<Col>
						<Searchbox
							handleChange={e => setFilter(e.target.value)}
							value={filter}
							style={{ width: '100%' }}
							placeholder="ค้นหาจากชื่อ"
						/>
					</Col>
					<Col>
						<div style={{ float: 'right' }}>
							<NavLink to="/create/user" className="btn btn-primary">
								<i className="fa fa-user-secret" /> Create User
							</NavLink>
						</div>
					</Col>
				</Row>
			</div>
			<CardBody>
				{isLoad ? (
					<Progress animated value={100} />
				) : (
					<Table>
						<thead>
							<tr>
								{header.map(head => (
									<th
										key={head.label}
										onClick={() => {
											setOrder(head.key);
											setToggleAsc(!toggleAsc);
										}}
									>
										{head.label}
										{order === head.key && (
											<i
												className={`fa fa-arrow-${toggleAsc ? 'down' : 'up'}`}
											/>
										)}
									</th>
								))}
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{userList.map(user => (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.username}</td>
									<td>{user.fullname}</td>
									<td>{moment(user.created_at).format('D/MM/YYYY hh:mm')}</td>
									<td>
										<div className="ActionMenu">
											<Button
												onClick={() => history.push(`/user/${user._id}`)}
												color="warning"
											>
												<i className="fa fa-pencil" />
											</Button>
											<Button
												color="danger"
												onClick={() => deleteUser(user._id)}
											>
												<i className="fa fa-trash-o" />
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</CardBody>
			<CardFooter>
				<div style={{ width: '20%' }}>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
							<Button
								color="primary"
								disabled={page === 1}
								onClick={() => setPage(page - 1)}
							>
								<i className="fa fa-arrow-left" />
							</Button>
						</InputGroupAddon>
						<Input
							style={{ width: '60%' }}
							type="number"
							value={page}
							onChange={e => {
								if (e.target.value > 1) {
									swal.fire('Alert', 'คุณไม่ควรใส่ค่าน้อยกว่า 1');
								} else {
									setPage(e.target.value);
								}
							}}
						/>
						<InputGroupAddon addonType="append">
							<Button color="primary" onClick={() => setPage(page + 1)}>
								<i className="fa fa-arrow-right" />
							</Button>
						</InputGroupAddon>
					</InputGroup>
				</div>
			</CardFooter>
		</Card>
	);
};

export default UsersList;
