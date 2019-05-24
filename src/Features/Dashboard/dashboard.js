import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import axios from '../../utils/axios';
import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Progress,
	Input,
	Row,
	Col,
	Form,
	FormGroup,
	InputGroup,
	InputGroupAddon,
} from 'reactstrap';
import useCustomers from '../../Hooks/useCustomers';
import Select from 'react-select';
import moment from 'moment';

const Dashboard = () => {
	const { isLoad: customerLoad, customerList } = useCustomers(0);
	const [isLoadStatementActivity, setLoadStatementActivity] = useState(true);
	const [reportStatementActivity, setReportActivity] = useState([]);
	const [reportStatementValue, setReportStatementValue] = useState([]);
	const [isLoadreportStatementValue, setLoadReportStatementValue] = useState(
		[],
	);
	const [currentCustomerCreate, setCurrentCustomerCreate] = useState(0);
	const [curValue, setCurValue] = useState(0);
	const [curProValue, setCurProvalue] = useState(0);
	const [currentWithdraw, setCurrentWithdraw] = useState(0);
	const [currentDeposit, setCurrentDeposit] = useState(0);
	const [currentBonus, setCurrentBonus] = useState(0);
	const [mode, setMode] = useState({ label: 'รายเดือน', value: 'month' });
	const [year, setYear] = useState(moment().format('YYYY'));
	const [month, setMonth] = useState({
		label: moment().format('MMMM'),
		value: moment().format('M'),
	});

	const monthOptions = [
		{ label: 'มกราคม', value: 1 },
		{ label: 'กุมภาพันธ์', value: 2 },
		{ label: 'มีนาคม', value: 3 },
		{ label: 'เมษายน', value: 4 },
		{ label: 'พฤศภาคม', value: 5 },
		{ label: 'มิถุนายน', value: 6 },
		{ label: 'กรกฏาคม', value: 7 },
		{ label: 'สิงหาคม', value: 8 },
		{ label: 'กันยายน', value: 9 },
		{ label: 'ตุลาคม', value: 10 },
		{ label: 'พฤศจิกายน', value: 11 },
		{ label: 'ธันวาคม', value: 12 },
	];

	useEffect(() => {
		setLoadStatementActivity(true);
		setReportActivity([]);
		setLoadReportStatementValue(true);
		setReportStatementValue([]);

		axios
			.get(
				`/api/v1/statements/report?mode=${mode.value}&year=${year}&month=${
					month.value
				}`,
			)
			.then(({ data: Response }) => {
				setLoadStatementActivity(false);
				const { data } = Response;
				const report = data.report.map(list => {
					if (mode.value === 'month') {
						return [
							list._id.day,
							list.withdraw,
							list.deposit,
							list.withdrawPromotion,
							list.depositPromotion,
						];
					} else {
						return [
							monthOptions[list._id.month - 1].label,
							list.withdraw,
							list.deposit,
							list.withdrawPromotion,
							list.depositPromotion,
						];
					}
				});

				report.unshift([
					mode.value === 'month' ? 'วันที่' : 'เดือน',
					'ถอน',
					'ฝาก',
					'ถอนโบนัส',
					'ได้รับโบนัส',
				]);
				setReportActivity(report);
			});

		axios
			.get(
				`/api/v1/statements/report?type=balance&mode=${
					mode.value
				}&year=${year}&month=${month.value}`,
			)
			.then(({ data: Response }) => {
				setLoadReportStatementValue(false);
				const { data } = Response;
				const report = data.report.map(list => {
					if (mode.value === 'month') {
						return [
							list._id.day,
							list.withdraw,
							list.deposit,
							list.withdrawPromotion,
							list.depositPromotion,
						];
					} else {
						return [
							monthOptions[list._id.month - 1].label,
							list.withdraw,
							list.deposit,
							list.withdrawPromotion,
							list.depositPromotion,
						];
					}
				});

				const currentDeposit = report.reduce((acc, curr) => {
					if (typeof curr[2] === 'number') {
						return acc + curr[2];
					}
					return acc;
				}, 0);

				const currentWithdraw = report.reduce((acc, curr) => {
					if (typeof curr[1] === 'number') {
						return acc + curr[1];
					}
					return acc;
				}, 0);

				const currentBonusRaw = report.reduce((acc, curr) => {
					if (typeof curr[4] === 'number') {
						return acc + curr[4];
					}
					return acc;
				}, 0);

				setCurrentDeposit(currentDeposit);
				setCurrentWithdraw(currentWithdraw);
				setCurrentBonus(currentBonusRaw);
				setCurProvalue(parseFloat(data.promotion_total));
				setCurValue(parseFloat(data.total));

				report.unshift([
					mode.value === 'month' ? 'วันที่' : 'เดือน',
					'ถอน',
					'ฝาก',
					'ถอนโบนัส',
					'ได้รับโบนัส',
				]);
				setReportStatementValue(report);
			});
		axios
			.get(
				`/api/v1/customers/report?mode=${mode.value}&year=${year}&month=${
					month.value
				}`,
			)
			.then(({ data: Response }) => {
				const { data } = Response;
				const currentCreateCustomer = data.report.reduce((acc, curr) => {
					return acc + curr.create_customer_sum;
				}, 0);

				setCurrentCustomerCreate(currentCreateCustomer);
			});
	}, [year, month, mode]);

	return (
		<Card>
			<CardHeader>
				<b>Dashboard</b>
			</CardHeader>
			<CardBody>
				<Row>
					<Col>
						<h2>ยอดปัจจุบัน</h2>
						{!customerLoad ? (
							<div>
								<p>จำนวนสมาชิกทั้งสิ้น {customerList.length} คน</p>
								<Chart
									chartType="PieChart"
									width={'500px'}
									height={'300px'}
									data={[
										['Transection', 'value'],
										['ยอดเงินฝากในระบบทั้งหมด', curValue] && curValue > 0,
										['ยอดโบนัสที่มีในระบบทั้งหมด', curProValue] &&
											curProValue > 0,
									]}
									options={{ is3D: true }}
								/>
							</div>
						) : (
							<Progress animated value={100} />
						)}
					</Col>
				</Row>
				<Col>
					<h2>สรุปผลการแสดง Statement</h2>
					{!isLoadStatementActivity ? (
						<div>
							{reportStatementActivity.length > 1 ? (
								<Chart
									chartType="LineChart"
									data={reportStatementActivity}
									options={{
										title: 'Statement Activity',
										subtitle: `ใน ${
											mode.value === 'month' ? mode.label : year
										}`,
										hAxis: {
											title: mode.value === 'month' ? 'วันที่' : 'เดือน',
										},
										vAxis: {
											title: 'จำนวนครั้งที่ทำรายการ',
										},
										animation: {
											startup: true,
											easing: 'linear',
											duration: 1500,
										},
										curveType: 'function',
									}}
								/>
							) : (
								<div>ไม่พบข้อมูลของช่วงนี้</div>
							)}
						</div>
					) : (
						<div style={{ margin: '3%' }}>
							<Progress animated value={100} color="success" />
						</div>
					)}
					{!isLoadreportStatementValue ? (
						<div>
							{reportStatementValue.length > 1 ? (
								<Chart
									chartType="LineChart"
									data={reportStatementValue}
									options={{
										title: 'Statement value',
										subtitle: `ใน ${
											mode.value === 'month' ? mode.label : year
										}`,
										hAxis: {
											title: mode.value === 'month' ? 'วันที่' : 'เดือน',
										},
										vAxis: {
											title: 'จำนวนเงิน',
										},
										animation: {
											startup: true,
											easing: 'linear',
											duration: 1500,
										},
									}}
								/>
							) : (
								<div>ไม่พบข้อมูลของช่วงนี้</div>
							)}
						</div>
					) : (
						<div style={{ margin: '3%' }}>
							<Progress animated value={100} />
						</div>
					)}
					{!isLoadreportStatementValue ? (
						<Form>
							<FormGroup row>
								<Col>
									<InputGroup>
										<InputGroupAddon addonType="prepend">ฝาก</InputGroupAddon>
										<Input value={`${currentDeposit} ฿`} disabled />
										<InputGroupAddon addonType="append">ถอน</InputGroupAddon>
										<Input value={`${currentWithdraw} ฿`} disabled />
										<InputGroupAddon addonType="append">โบนัส</InputGroupAddon>
										<Input value={`${currentBonus} ฿`} disabled />
										<InputGroupAddon addonType="append">
											สมาชิกใหม่ช่วงนี้
										</InputGroupAddon>
										<Input value={`${currentCustomerCreate} คน`} disabled />
									</InputGroup>
								</Col>
							</FormGroup>
						</Form>
					) : (
						<div style={{ margin: '3%' }}>
							<Progress animated color="danger" value={100} />
						</div>
					)}
					<div
						className="d-flex justify-content-center"
						style={{ marginTop: '2%' }}>
						<div style={{ width: '60%' }}>
							<Select
								options={[
									{ label: 'รายเดือน', value: 'month' },
									{ label: 'รายปี', value: 'year' },
								]}
								value={mode}
								onChange={e => setMode(e)}
							/>
							<Input
								type="number"
								value={year}
								onChange={e => setYear(e.target.value)}
							/>
							{mode.value === 'month' && (
								<Select
									options={monthOptions}
									onChange={e => setMonth(e)}
									value={month}
								/>
							)}
						</div>
					</div>
				</Col>
				<Row />
			</CardBody>
			<CardFooter />
		</Card>
	);
};

export default Dashboard;
