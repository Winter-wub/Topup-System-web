import React from 'react';
import { Table, Row, Col, Button, Progress } from 'reactstrap';
import useCustomerStatement from '../../Hooks/useCustomerStatement';
import useAuthentication from '../../Hooks/useAuthentication';
import moment from 'moment';

const header = [
	{ label: 'Statement ID', key: '_id' },
	{ label: 'เวลา', key: 'created_at' },
	{ label: 'Action', key: 'type' },
	{ label: 'คำอธิบาย', key: 'description' },
	{ label: 'ยอดเงิน', key: 'value' },
];

const type = {
	deposit: 'ฝาก',
	withdraw: 'ถอน',
	deposit_promo: 'เพิ่มโบนัส',
	withdraw_promo: 'ถอนโบนัส',
};
const AccountDetail = ({ customer_id }) => {
	const {
		order,
		page,
		setPage,
		isFetchState,
		userStatement,
		setOrder,
		toggleAsc,
		setToggleAsc,
		updateStatement,
	} = useCustomerStatement(
		customer_id,
		5,
		{ field: 'status', value: 'waiting' },
		false,
	);
	const { role, username_state } = useAuthentication();
	// useEffect(() => {
	// 	setCustomerId(customer_id);
	// }, []);

	return (
		<div>
			{role === '99' && (
				<div>
					<h3>รายการรออนุมัติ</h3>
					<Row>
						<Col>
							<div style={{ float: 'right' }}>
								<Button
									disabled={page <= 1}
									onClick={() => setPage(page - 1)}
									style={{ marginRight: '2px' }}>
									<i className="fa fa-arrow-left" />
								</Button>
								<Button
									onClick={() => setPage(page + 1)}
									style={{ marginLeft: '2px' }}>
									<i className="fa fa-arrow-right" />
								</Button>
							</div>
						</Col>
					</Row>

					<Table>
						<thead>
							<tr>
								{header.map(head => (
									<th
										key={head.label}
										onClick={() => {
											setOrder(head.key);
											setToggleAsc(!toggleAsc);
										}}>
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
						{isFetchState ? (
							<tbody>
								<tr>
									<td />
									<td />
									<td>
										<Progress style={{ width: '100%' }} animated value={100} />
									</td>
									<td />
									<td />
									<td />
								</tr>
							</tbody>
						) : (
							<tbody>
								{userStatement.map(state => (
									<tr key={state._id}>
										<td>{state._id}</td>
										<td>{moment(state.created_at).calendar()}</td>
										<td>{type[state.type]}</td>
										<td>{state.description}</td>
										<td>{state.value} ฿</td>
										<td>
											<div className="ActionMenu">
												<Button
													color="success"
													onClick={() => {
														updateStatement(state._id, username_state, true);
													}}>
													<i className="fa fa-check-circle" />
												</Button>
												<Button
													color="danger"
													onClick={() => {
														updateStatement(state._id, username_state, false);
													}}>
													<i className="fa fa-times-circle" />
												</Button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						)}
					</Table>
				</div>
			)}
		</div>
	);
};

export default AccountDetail;
