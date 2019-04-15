import React, { useState, useEffect } from 'react';
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
	InputGroup,
	InputGroupAddon,
} from 'reactstrap';
import Select from 'react-select';
import { Checkbox } from 'pretty-checkbox-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useCustomers from '../../Hooks/useCustomers';
import axios from '../../utils/axios';
const swal = withReactContent(Swal);

const Account = () => {
	const { isLoad: CustomerListLoad, customerList } = useCustomers();
	const [isFetchState, setFetchState] = useState(false);
	const [typeAction, setTypeAction] = useState('');
	const [usePromo, setUsePromo] = useState(false);
	const [amountPromo, setAmountPromo] = useState(0);
	const [customerId, setCustomerId] = useState('');
	const [currentTotal, setCurrentTotal] = useState(0);
	const [currentPromotionTotal, setCurrentPromotionTotal] = useState(0);
	const [currentAllTotal, setCurrentAllTotal] = useState(0);
	const [description, setDescription] = useState('');
	const [value, setValue] = useState(0);
	const validate = !(
		value > 0 &&
		typeAction.length > 0 &&
		customerId.length > 0
	);

	const addStatement = () => {
		axios
			.post('/api/v1/statements', {
				data: {
					customer_id: customerId,
					type: typeAction,
					value: parseFloat(value),
					description: description,
					staffId: '1111',
				},
			})
			.then(({ data: Response }) => {
				const { status } = Response.data;
				let text = 'การทำรายการสำเร็จ';
				if (!status) {
					text = 'การทำรายการล้มเหลว กรุณาเช็คยอดที่คงเหลือ หากถอน';
				}
				swal.fire('Information', text, 'info');
			})
			.catch(err => {
				console.log(err);
				swal.fire(
					'Error',
					'เกิดข้อผิดพลาดไม่สามารถติดต่อ API ได้ กรุณาลองใหม่อีกครั้ง',
					'error',
				);
			});
		if (usePromo && amountPromo > 0) {
			axios
				.post('/api/v1/statements', {
					data: {
						customer_id: customerId,
						type: 'withdraw_promo',
						value: parseFloat(amountPromo),
						description: description,
						staffId: '1111',
					},
				})
				.then(({ data }) => {
					console.log(data);
				});
		}
	};

	useEffect(() => {
		setFetchState(true);
		axios
			.get(`/api/v1/statements?id=${customerId}`)
			.then(({ data: response }) => {
				const { total, promotion_total } = response.data;
				setCurrentTotal(total);
				setCurrentPromotionTotal(promotion_total);
				setCurrentAllTotal(total + promotion_total);
				setFetchState(false);
			});
	}, [customerId]);

	const userOptions = customerList.map(customer => ({
		value: customer._id,
		label: customer.fullname,
	}));

	const typeActionOptions = [
		{ value: 'deposit', label: 'ฝาก' },
		{ value: 'withdraw', label: 'ถอน' },
		{ value: 'deposit_promo', label: 'ฝาก (โปรโมชั่น)' },
	];

	return (
		<Card>
			<CardHeader>การจัดการเงินฝาก - ถอน</CardHeader>
			<CardBody>
				<Form>
					<FormGroup row>
						<Label sm={2}>เลือกบัญชีผู้ใช้</Label>
						<Col sm={10}>
							<Select
								options={userOptions}
								isSearchable
								isClearable
								isLoading={CustomerListLoad}
								placeholder="เลือกบัญชีผู้ใช้ หรือพิมพ์ค้นหา"
								style={{ width: '60%' }}
								onChange={e => {
									e && setCustomerId(e.value);
								}}
							/>
						</Col>
					</FormGroup>
					{!isFetchState && (
						<FormGroup row>
							<Label sm={2}>สถานะการเงินของ Account ที่เลือก</Label>
							<Col sm={10}>
								<InputGroup>
									<InputGroupAddon addonType="prepend">
										ยอดเงินฝาก
									</InputGroupAddon>
									<Input value={`${currentTotal} ฿`} disabled />
									<InputGroupAddon addonType="append">
										ยอดเงินโปรโมชั่น
									</InputGroupAddon>
									<Input value={`${currentPromotionTotal} ฿`} disabled />
									<InputGroupAddon addonType="append">ยอดสุทธิ</InputGroupAddon>
									<Input value={`${currentAllTotal} ฿`} disabled />
								</InputGroup>
							</Col>
						</FormGroup>
					)}
					<FormGroup row>
						<Label sm={2}>เลือกประเภทการทำรายการ</Label>
						<Col sm={10}>
							<Select
								options={typeActionOptions}
								onChange={e => setTypeAction(e.value)}
								style={{ width: '60%' }}
							/>
						</Col>
					</FormGroup>
					{typeAction === 'withdraw' && (
						<div>
							<FormGroup row>
								<Label sm={2}>ถอนยอด Promotion </Label>
								<Col sm={10}>
									<Checkbox
										color="primary"
										animation="smooth"
										shape="curve"
										checked={usePromo}
										onChange={() => setUsePromo(!usePromo)}
									/>
								</Col>
							</FormGroup>
							{usePromo && (
								<FormGroup row>
									<Label sm={2}>ยอด Promotion ที่ต้องการถอน</Label>
									<Col sm={10}>
										<Input
											type="number"
											onChange={e => setAmountPromo(e.target.value)}
											value={amountPromo}
											style={{ width: '60%' }}
										/>
									</Col>
								</FormGroup>
							)}
						</div>
					)}
					<FormGroup row>
						<Label sm={2}>คำอธิบายรายการ</Label>
						<Col sm={10}>
							<Input
								style={{ width: '60%' }}
								type="textarea"
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2}>มูลค่า</Label>
						<Col sm={10}>
							<Input
								type="number"
								style={{ width: '60%' }}
								value={value}
								onChange={e => setValue(e.target.value)}
							/>
						</Col>
					</FormGroup>
				</Form>
			</CardBody>
			<CardFooter>
				<Button
					color="success"
					disabled={validate}
					onClick={() => addStatement()}
				>
					บันทึกข้อมูล
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Account;
