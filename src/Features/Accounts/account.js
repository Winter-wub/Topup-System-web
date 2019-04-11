import React from 'react';
import history from '../../utils/history';
import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Button,
	Form,
	FormGroup,
	Input,
	Col,
	Label,
} from 'reactstrap';
import Select from 'react-select';
import useCustomers from '../../Hooks/useCustomers';

const Account = () => {
	const { isLoad, customerList } = useCustomers();

	const userOptions = customerList.map(customer => ({
		value: customer.id,
		label: customer.fullname,
	}));
	const typeAction = [
		{ value: 'deposit', label: 'ฝาก' },
		{ value: 'withdrawn', label: 'ถอน' },
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
					การจัดการเงินฝาก - ถอน
				</CardHeader>
				<CardBody>
					<Form>
						<FormGroup row>
							<Label sm={2}>เลือกบัญชีผู้ใช้</Label>
							<Col sm={10}>
								<Select
									options={userOptions}
									isSearchable
									isClearable
									isLoading={isLoad}
									placeholder="เลือกบัญชีผู้ใช้ หรือพิมพ์ค้นหา"
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>เลือกประเภทการทำรายการ</Label>
							<Col sm={10}>
								<Select options={typeAction} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>คำอธิบายรายการ</Label>
							<Col sm={10}>
								<Input style={{ width: '60%' }} type="textarea" value="" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>มูลค่า</Label>
							<Col sm={10}>
								<Input style={{ width: '60%' }} value="" />
							</Col>
						</FormGroup>
					</Form>
				</CardBody>
				<CardFooter>
					<Button color="success">บันทึกข้อมูล</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Account;
