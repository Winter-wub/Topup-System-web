import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import history from '../utils/history';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const swal = withReactContent(Swal);

const useCustomer = id => {
	const [userData, setUsersData] = useState({
		fullname: '',
		gameId: '',
		bank_info: { bank: '', bank_account_name: '', bank_account_id: '' },
	});
	const [isLoad, setLoad] = useState(true);

	const updateUserData = async () => {
		const result = await swal.fire({
			title: 'Confrimation!',
			text: 'ยืนยันการอัพเดทข้อมูลลูกค้า',
			type: 'question',
			showCancelButton: true,
		});
		if (result) {
			let update = {
				...userData,
			};
			delete update._id;
			try {
				const { data: response } = await axios.put('/api/v1/customers', {
					data: {
						update,
						_id: id,
					},
				});
				let text = 'อัพเดทข้อมูลลูกค้าสำเร็จ';
				let type = 'success';
				if (response.data.status === false) {
					text = 'อัพเดทข้อมูลลูกค้าเหลว กรุณาลองใหม่อีกครั้ง';
					type = 'error';
				}
				await swal.fire('Result', text, type);
			} catch (error) {
				console.error(error.stack);
				await swal.fire('Result', 'อัพเดทข้อมูลลูกค้าเหลว', 'error');
			}
		}
	};

	const deleteUser = async id => {
		const prompt = await swal.fire({
			titleText: 'ยืนยันการลบข้อมูลลูกค้า',
			text: `แน่ใจแล้วใช้ไหมที่จะลบข้อมูล ${id}`,
			type: 'question',
			showCancelButton: true,
		});
		if (prompt.value) {
			try {
				const { data: response } = await axios.delete(
					`/api/v1/customers?id=${id}`,
				);
				if (response.data.status === true) {
					await swal.fire('Result', 'ลบผู้ใช้เสร็จสมบูรณ์', 'info');
					setUsersData({
						fullname: '',
						gameId: '',
						bank_info: { bank: '', bank_account_name: '', bank_account_id: '' },
					});
					history.go('/customers');
				}
			} catch (error) {
				console.log(error);
				await swal.fire('Error', 'กรุณาลองใหม่อีกครั้งครับ', 'error');
				history.go('/customers');
			}
		}
	};

	useEffect(() => {
		axios
			.get(`/api/v1/customers?filter={ "_id": "${id}"} `)
			.then(({ data }) => {
				if (data.data.count <= 0) {
					history.goBack();
				} else {
					setUsersData(data.data.customers[0]);
				}
				setLoad(false);
			});
	}, []);

	return {
		userData,
		isLoad,
		setUsersData,
		updateUserData,
		deleteUser,
	};
};

export default useCustomer;
