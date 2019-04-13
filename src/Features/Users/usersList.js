import React, { useState } from 'react';
import {
	Table,
	Button,
	Progress,
	Card,
	CardHeader,
	CardBody,
	Col,
	Row,
} from 'reactstrap';
import Searchbox from '../../Components/Searchbox';

import useCustomers from '../../Hooks/useCustomers';

import history from '../../utils/history';
import '../../assets/css/users.css';

const UsersList = () => {
	const [searchKeyWord, setsearchKeyWord] = useState('');
	const { isLoad, customerList } = useCustomers();

	return (
		<Card>
			<CardHeader>Customer Managerment</CardHeader>
			<div style={{ marginTop: '1%', marginLeft: '3%', marginRight: '3%' }}>
				<Row>
					<Col>
						<Searchbox
							handleChange={e => setsearchKeyWord(e.target.value)}
							value={searchKeyWord}
							style={{ width: '100%' }}
						/>
					</Col>
					<Col>
						<Button
							style={{ float: 'right' }}
							color="success"
							onClick={() => history.push('/create/customer')}
						>
							<i className="fa fa-user-plus" aria-hidden="true" /> Create New
							Customer
						</Button>
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
												onClick={() =>
													history.push(`/statement/${customer.id}`)
												}
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
				)}
			</CardBody>
		</Card>
	);
};

export default UsersList;
