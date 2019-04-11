import React, { useState } from 'react';
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
	const { isLoad, userStatementData } = useCustomerStatement(match.params.id);
	const { isLoad: isLoadUser, userData } = useCustomer(match.params.id);
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
						<h3 style={{ marginBottom: '10px' }}>ประวัติการฝาก และถอน</h3>
						<Searchbox
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

export default UsersStatementList;
