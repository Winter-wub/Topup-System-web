import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import axios from '../../utils/axios';
import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	CardTitle,
	Progress,
	Input,
	Row,
	Col,
} from 'reactstrap';
import useCustomers from '../../Hooks/useCustomers';
import Select from 'react-select';
import moment from 'moment';

const Dashboard = () => {
	const { isLoad: customerLoad, customerList } = useCustomers(0);
	const [isLoad, setLoad] = useState(true);
	const [reportData, setReport] = useState([]);
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
		setLoad(true);
		setReport([]);

		axios
			.get(
				`/api/v1/statements/report?mode=${mode.value}&year=${year}&month=${
					month.value
				}`,
			)
			.then(({ data: Response }) => {
				setLoad(false);
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
					'ถอนโปรโมชั่น',
					'ได้รับโบนัสโปรโมชั่น',
				]);
				console.log(report);
				setReport(report);
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
						<CardTitle>สรุปผลการแสดง Statement</CardTitle>
						{!isLoad ? (
							<div>
								{reportData.length > 1 ? (
									<Chart
										chartType="LineChart"
										data={reportData}
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
							<Progress animated value={100} />
						)}
						<div
							className="d-flex justify-content-center"
							style={{ marginTop: '2%' }}
						>
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
				</Row>
				<hr />
				<Row>
					<Col>
						<CardTitle>สรุปผลลูกค้า</CardTitle>
						{!customerLoad ? (
							<p>จำนวนสมาชิกทั้งสิ้น {customerList.length} คน</p>
						) : (
							<Progress animated value={100} />
						)}
					</Col>
				</Row>
			</CardBody>
			<CardFooter />
		</Card>
	);
};

export default Dashboard;
