import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import history from '../utils/history';
const swal = withReactContent(Swal);

const useCustomers = (limit = 10) => {
	const [isLoad, setLoad] = useState(true);
	const [customerList, setCustomerList] = useState([]);
	const [filter, setFilter] = useState('');
	const [order, setOrder] = useState('');
	const [toggleAsc, setToggleAsc] = useState(true);
	const [page, setPage] = useState(1);

	const deleteUser = async id => {
		const prompt = await swal.fire({
			titleText: 'ยืนยันการลบข้อมูลลูกค้า',
			text: ` แน่ใจแล้วใช้ไหมที่จะลบข้อมูล ${id}`,
			type: 'question',
			showCancelButton: true,
		});
		if (prompt.value) {
			try {
				const { data: response } = await axios.delete(
					`/api/v1/customers?id=${id}`,
				);
				if (response.data.status === true) {
					await swal.fire('Result', 'ลบผู้ใช้เสร็จสมบูรณ์', 'success');
					history.go('/customers');
				} else {
					await swal.fire(
						'Result',
						'ผลข้อมูลล้มเหลวกรุณาลองใหม่อีกครั้ง',
						'error',
					);
				}
			} catch (error) {
				console.log(error);
				await swal.fire('Error', 'กรุณาลองใหม่อีกครั้ง', 'error');
				history.go('/customers');
			}
		}
	};

	useEffect(() => {
		let url = `/api/v1/customers?page=${page}&limit=${limit}`;
		setLoad(true);
		setCustomerList([]);
		if (filter.length > 0) {
			url += `&filter=${JSON.stringify({
				fullname: filter,
			})}&options=like`;
		}

		if (order.length > 0) {
			const orderValue = toggleAsc ? -1 : 1;
			url += `&orderby=${JSON.stringify({ [order]: orderValue })}`;
		}
		axios
			.get(url)
			.then(({ data }) => {
				const { data: responseData } = data;
				setLoad(false);
				setCustomerList(responseData.customers);
			})
			.catch(err => {
				console.log(err);
			});
	}, [page, filter, order, toggleAsc]);

	return {
		isLoad,
		customerList,
		setFilter,
		filter,
		setOrder,
		setToggleAsc,
		toggleAsc,
		order,
		page,
		setPage,
		deleteUser,
	};
};

export default useCustomers;
