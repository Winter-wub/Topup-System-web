import React, { useEffect } from 'react';
import {
	Table,
	Button,
	Progress,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
} from 'reactstrap';
import moment from 'moment';
import useAuthentication from '../../Hooks/useAuthentication';
import useCustomerStatement from '../../Hooks/useCustomerStatement';

import history from '../../utils/history';

const Status = ({ statusText }) => {
	switch (statusText) {
		case 'approve':
			return (
				<div>
					<i className="fa fa-check text-success" /> อนุมัติแล้ว
				</div>
			);
		case 'not approve':
			return (
				<div>
					<i className="fa fa-times text-danger" /> ไม่อนุมัติรายการ
				</div>
			);
		default:
			return <div>รอการอนุมัติ</div>;
	}
};

const type = {
	deposit: 'ฝาก',
	withdraw: 'ถอน',
	deposit_promo: 'เพิ่มโบนัส',
	withdraw_promo: 'ถอนโบนัส',
};

const UsersList = () => {
	const { role } = useAuthentication();
	const {
		userStatement,
		setOrder,
		setToggleAsc,
		toggleAsc,
		order,
		isFetchState,
		setPage,
		page,
	} = useCustomerStatement();

	const header = [
		{ key: 'customer_id', label: 'App id' },
		{ key: 'created_at', label: 'สร้างเมื่อ' },
		{ key: 'type', label: 'การทำรายการ' },
		{ key: 'value', label: 'ยอดเงิน' },
		{ key: 'staffId', label: 'ดำเนินการโดย' },
		{ key: 'status', label: 'สถานะ' },
	];

	useEffect(() => {
		if (role !== '99') {
			history.push('/dashboard');
		}
	}, []);

	return (
		<Card>
			<CardHeader>
				<b>Statement Management</b>
			</CardHeader>
			<CardBody>
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
										<i className={`fa fa-arrow-${toggleAsc ? 'down' : 'up'}`} />
									)}
								</th>
							))}
							<th>Action</th>
						</tr>
					</thead>
					{isFetchState ? (
						<tbody>
							<td />
							<td />
							<td />
							<td>
								<Progress style={{ width: '100%' }} animated value={100} />
							</td>
							<td />
							<td />
							<td />
						</tbody>
					) : (
						<tbody>
							{userStatement.map(state => (
								<tr key={state._id}>
									<td>
										{state.CustomerData ? state.CustomerData.gameId : 'N/A'}
									</td>
									<td>{moment(state.created_at).format('DD/MM/YYYY hh:mm')}</td>
									<td>{type[state.type]}</td>
									<td>{state.value}</td>
									<td>{state.staffId}</td>
									<td>
										<Status statusText={state.status} />
									</td>
									<td>
										<Button
											color="primary"
											onClick={() =>
												history.push(`/statement/${state.customer_id}`)
											}>
											<i className="fa fa-list-alt" />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					)}
				</Table>
			</CardBody>
			<CardFooter>
				<div style={{ float: 'left' }}>
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
			</CardFooter>
		</Card>
	);
};

export default UsersList;
