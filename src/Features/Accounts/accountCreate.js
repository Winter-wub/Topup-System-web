import React, { useState } from 'react';
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
import history from '../../utils/history';
import useCustomers from '../../Hooks/useCustomers';
import useCustomerStatement from '../../Hooks/useCustomerStatement';
const Account = () => {
	const { isLoad: CustomerListLoad, customerList } = useCustomers(0);
	const {
		isFetchState,
		setTypeAction,
		setUsePromo,
		addStatement,
		setAmountPromo,
		setCustomerId,
		currentTotal,
		currentPromotionTotal,
		setDescription,
		setValue,
		validate,
		typeAction,
		usePromo,
		amountPromo,
		description,
		value,
	} = useCustomerStatement();
	const [toggleSelectUserMode, setToggleSelectUserMde] = useState(true);
	const userOptions = customerList.map(customer => ({
		value: customer._id,
		label: customer.fullname,
	}));

	const userOptions2 = customerList.map(customer => ({
		value: customer._id,
		label: customer.gameId,
	}));

	const typeActionOptions = [
		{ value: 'deposit', label: 'ฝาก' },
		{ value: 'withdraw', label: 'ถอน' },
		{ value: 'deposit_promo', label: 'ฝาก (โปรโมชั่น)' },
	];

	return (
		<Card>
			<CardHeader>
				<Button style={{ marginRight: '2%' }} onClick={() => history.goBack()}>
					<i className="fa fa-arrow-left" /> Cancel
				</Button>
				การจัดการเงินฝาก - ถอน
			</CardHeader>
			<CardBody>
				<Form>
					<FormGroup row>
						<Label sm={2}>เลือกบัญชีผู้ใช้</Label>
						<Col sm={10}>
							<Button
								color={toggleSelectUserMode ? 'primary' : 'warning'}
								onClick={() => setToggleSelectUserMde(!toggleSelectUserMode)}>
								App Id / Full Name
							</Button>
						</Col>
					</FormGroup>
					{toggleSelectUserMode && (
						<FormGroup row>
							<Label sm={2}>Full Name</Label>
							<Col sm={10}>
								<Select
									options={userOptions}
									isSearchable
									isClearable
									isLoading={CustomerListLoad}
									placeholder="เลือกบัญชีผู้ใช้ หรือพิมพ์ค้นหา ชื่อ"
									style={{ width: '60%' }}
									onChange={e => {
										e && setCustomerId(e.value);
									}}
								/>
							</Col>
						</FormGroup>
					)}
					{!toggleSelectUserMode && (
						<FormGroup row>
							<Label sm={2}>App Id</Label>
							<Col sm={10}>
								<Select
									options={userOptions2}
									isSearchable
									isClearable
									isLoading={CustomerListLoad}
									placeholder="เลือกบัญชีผู้ใช้ หรือพิมพ์ค้นหา App Id"
									style={{ width: '60%' }}
									onChange={e => {
										e && setCustomerId(e.value);
									}}
								/>
							</Col>
						</FormGroup>
					)}

					{!isFetchState &&
						!isNaN(currentTotal) &&
						!isNaN(currentPromotionTotal) && (
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
										<InputGroupAddon addonType="append">
											ยอดสุทธิ
										</InputGroupAddon>
										<Input
											value={`${parseFloat(
												currentPromotionTotal + currentTotal,
											)} ฿`}
											disabled
										/>
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
				</Form>
			</CardBody>
			<CardFooter>
				<Button
					color="success"
					disabled={validate}
					onClick={() => addStatement()}>
					บันทึกข้อมูล
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Account;
