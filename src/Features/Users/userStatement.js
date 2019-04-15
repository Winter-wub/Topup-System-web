import React, { useState, useEffect } from 'react';
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
} from 'reactstrap';
import moment from 'moment';

import Searchbox from '../../Components/Searchbox';
import history from '../../utils/history';
import useCustomerStatement from '../../Hooks/useCustomerStatement';
import useCustomer from '../../Hooks/useCustomer';

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

const UsersStatementList = ({ match }) => {
	const [searchKeyWord, setsearchKeyWord] = useState('');
	const {
		isFetchState,
		userStatement,
		currentTotal,
		currentPromotionTotal,
		currentAllTotal,
		setCustomerId,
	} = useCustomerStatement();
	const { isLoad: isLoadUser, userData } = useCustomer(match.params.id);

	useEffect(() => {
		setCustomerId(match.params.id);
	}, []);

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
				{isFetchState ? (
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
						<h3 style={{ marginBottom: '10px' }}>ประวัติการฝาก และถอน</h3>
						<Searchbox
							handleChange={e => setsearchKeyWord(e.target.value)}
							value={searchKeyWord}
							style={{ width: '60%' }}
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
						</Table>
					</CardBody>
				)}
			</Card>
		</div>
	);
};

export default UsersStatementList;
