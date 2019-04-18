import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import history from '../utils/history';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const swal = withReactContent(Swal);

const useUser = id => {
	const [userData, setUsersData] = useState({
		fullname: '',
		gameId: '',
	});
	const [isLoad, setLoad] = useState(true);

	const updateUserData = async () => {
		const result = await swal.fire({
			title: 'Confrimation!',
			text: 'ยืนยันการอัพเดทข้อมูลผู้ใช้',
			type: 'question',
			showCancelButton: true,
		});
		if (result) {
			let update = {
				...userData,
			};
			delete update._id;
			try {
				const { data: response } = await axios.put('/api/v1/users', {
					data: {
						update,
						_id: id,
					},
				});
				let text = 'อัพเดทข้อมูลผู้ใช้สำเร็จ';
				let type = 'success';
				if (response.data.status === false) {
					text = 'อัพเดทข้อมูลผู้ใช้เหลว กรุณาลองใหม่อีกครั้ง';
					type = 'error';
				}
				await swal.fire('Result', text, type);
			} catch (error) {
				console.error(error.stack);
				await swal.fire('Result', 'อัพเดทข้อมูลผู้ใช้เหลว', 'error');
			}
		}
	};

	const deleteUser = async id => {
		const prompt = await swal.fire({
			titleText: 'ยืนยันการลบข้อมูลผู้ใช้',
			text: `แน่ใจแล้วใช้ไหมที่จะลบข้อมูล ${id}`,
			type: 'question',
			showCancelButton: true,
		});
		if (prompt.value) {
			try {
				const { data: response } = await axios.delete(`/api/v1/users?id=${id}`);
				if (response.data.status === true) {
					await swal.fire('Result', 'ลบผู้ใช้เสร็จสมบูรณ์', 'info');
					setUsersData({
						fullname: '',
						gameId: '',
					});
					history.go('/users');
				}
			} catch (error) {
				console.log(error);
				await swal.fire('Error', 'กรุณาลองใหม่อีกครั้งครับ', 'error');
				history.go('/users');
			}
		}
	};

	useEffect(() => {
		axios
			.get(`/api/v1/users?filter={ "_id": "${id}"} `)
			.then(({ data }) => {
				if (data.data.count <= 0) {
					history.goBack();
				} else {
					setUsersData(data.data.users[0]);
				}
				setLoad(false);
			})
			.catch(err => {
				console.log(err);
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

export default useUser;
