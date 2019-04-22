import React, { useEffect } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	Progress,
	Form,
	FormGroup,
	Table,
	Label,
	Col,
	Button,
	Input,
	Row,
} from 'reactstrap';
import moment from 'moment';
import Select from 'react-select';
import Searchbox from '../../Components/Searchbox';
import AccountDetail from '../../Features/Accounts/accountDetail';
import history from '../../utils/history';
import useCustomerStatement from '../../Hooks/useCustomerStatement';
import useCustomer from '../../Hooks/useCustomer';

const Status = ({ statusText }) => {
	switch (statusText) {
		case 'approve':
			return <div><i className="fa fa-check text-success" /> อนุมัติแล้ว</div>;
		case 'not approve':
			return <div><i className="fa fa-times text-danger" /> ไม่อนุมัติรายการ</div>;
		default:
			return <div>รอการอนุมัติ</div>;
	}
};


const UsersStatementList = ({ match }) => {
	const {
		isFetchState,
		userStatement,
		currentTotal,
		currentPromotionTotal,
		currentAllTotal,
		setCustomerId,
		setPage,
		setLimit,
		page,
		limit,
		search,
		setSearch,
		setOrder,
		setToggleAsc,
		order,
		toggleAsc,
	} = useCustomerStatement();
	const { isLoad: isLoadUser, userData } = useCustomer(match.params.id);
	useEffect(() => {
		setLimit(5);
		setCustomerId(match.params.id);
	}, []);

	const header = [
		{ label: 'Statement ID', key: '_id' },
		{ label: 'เวลา', key: 'created_at' },
		{ label: 'Action', key: 'type' },
		{ label: 'คำอธิบาย', key: 'description' },
		{ label: 'มูลค่า', key: 'value' },
	];

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
					App ID : <b>{userData.gameId}</b>
				</CardHeader>
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
									<Label sm={2}>App Id</Label>
									<Col sm={10}>
										<Input
											style={{ width: '60%' }}
											value={userData.gameId}
											disabled
										/>
									</Col>
								</FormGroup>
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
										<Input
											style={{ width: '60%' }}
											value={currentTotal}
											disabled
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label sm={2}>ยอดจากโปรโมชั่น</Label>
									<Col sm={10}>
										<Input
											style={{ width: '60%' }}
											value={currentPromotionTotal}
											disabled
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label sm={2}>ยอดสุทธิ</Label>
									<Col sm={10}>
										<Input
											style={{ width: '60%' }}
											value={currentAllTotal}
											disabled
										/>
									</Col>
								</FormGroup>
							</Form>
						</CardBody>
					)}
					{ userStatement.length > 0 && <AccountDetail customer_id={match.params.id} />}
					<h3 style={{ marginBottom: '10px' }}>ประวัติการฝาก และถอน</h3>
					<Row>
						<Col>
							<Searchbox
								handleChange={e =>
									setSearch({ field: 'description', value: e.target.value })
								}
								value={search.value}
								style={{ width: '90%' }}
								placeholder="ค้นหาจากคำอธิบาย"
							/>
						</Col>
						<Col>
							<Row>
								<Col>
									<Select
										options={[
											{ label: '5', value: 5 },
											{ label: '10', value: 10 },
											{ label: '15', value: 15 },
											{ label: '20', value: 20 },
										]}
										placeholder="จำนวนรายการต่อหน้า"
										defaultValue={5}
										onChange={e => setLimit(e.value)}
										value={limit}
									/>
								</Col>
								<Col>
									<div style={{ float: 'right' }}>
										<Button
											disabled={page <= 1}
											onClick={() => setPage(page - 1)}
											style={{ marginRight: '2px' }}
										>
											<i className="fa fa-arrow-left" />
										</Button>
										<Button
											onClick={() => setPage(page + 1)}
											style={{ marginLeft: '2px' }}
										>
											<i className="fa fa-arrow-right" />
										</Button>
									</div>
								</Col>
							</Row>
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
										<td>{state.type}</td>
										<td>{state.description}</td>
										<td>{state.value} ฿</td>
										<td>
											<Status statusText={state.status} />
										</td>
									</tr>
								))}
							</tbody>
						)}
					</Table>
				</CardBody>
			</Card>
		</div>
	);
};

export default UsersStatementList;
