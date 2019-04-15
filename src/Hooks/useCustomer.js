import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const swal = withReactContent(Swal);

const useCustomer = id => {
	const [userData, setUsersData] = useState({});
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

	useEffect(() => {
		axios
			.get(`/api/v1/customers?filter={ "_id": "${id}"} `)
			.then(({ data }) => {
				setUsersData(data.data.customers[0]);
				setLoad(false);
			});
	}, []);

	return {
		userData,
		isLoad,
		setUsersData,
		updateUserData,
	};
};

export default useCustomer;
