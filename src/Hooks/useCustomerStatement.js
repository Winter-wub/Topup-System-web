import { useEffect, useState, useGlobal } from 'reactn';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from '../utils/axios';
import history from '../utils/history';

const swal = withReactContent(Swal);

const useCustomerStatement = () => {
	const [userStatement, setUserStatement] = useState([]);
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
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState({ value: '', field: '' });
	const [order, setOrder] = useState('');
	const [toggleAsc, setToggleAsc] = useState(true);
	const [username] = useGlobal('username');
	const [like, setLike] = useState(true);

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
					staffId: username,
					status: 'not approve',
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

	const updateStatement = async (statement_id, staffId, status) => {
		if (status) {
			const { value: prompt } = await swal.fire({
				titleText: 'การยืนยันอนุมัติรายการ',
				text: 'ใส่ Remark',
				showCancelButton: true,
				input: 'text',
				inputValue: '',
				inputPlaceholder: 'กรอกคีย์เวิร์ด หรือช่วยจำ',
			});

			if (prompt) {
				try {
					const { data: Response } = await axios.put('/api/v1/statements', {
						data: {
							staffId: staffId,
							statement_id: statement_id,
							remark: prompt,
						},
					});
					const { data } = Response;
					if (data.status) {
						await swal.fire('ผลลัพธ์', 'การอนุมัติสำเร็จ', 'success');
						history.goBack();
					} else {
						await swal.fire(
							'ผลลัพธ์',
							'รายการนี้ไม่สามารถอนุมัติได้',
							'warning',
						);
					}
				} catch (err) {
					console.log(err);
					swal.fire(
						'ผลลัพธ์',
						' เกิดข้อผิดพลาดไม่สามารถติดต่อ API ได้',
						'error',
					);
				}
			}
		} else {
			const { value: prompt } = await swal.fire({
				titleText: 'การยืนยันไม่อนุมัติรายการ',
				text: 'ใส่ Remark',
				showCancelButton: true,
				input: 'text',
				inputValue: '',
				inputPlaceholder: 'กรอกคีย์เวิร์ด หรือช่วยจำ',
			});

			if (prompt) {
				try {
					const { data: Response } = await axios.put(
						'/api/v1/statements/delete',
						{
							data: {
								staffId: staffId,
								statement_id: statement_id,
								remark: prompt,
							},
						},
					);
					const { data } = Response;
					if (data.status) {
						await swal.fire('ผลลัพธ์', 'การไม่อนุมัติรายการสำเร็จ', 'success');
						history.goBack();
					} else {
						await swal.fire(
							'ผลลัพธ์',
							'รายการนี้ไม่สามารถยกเลิกอนุมัติได้',
							'warning',
						);
					}
				} catch (err) {
					console.log(err);
					swal.fire(
						'ผลลัพธ์',
						' เกิดข้อผิดพลาดไม่สามารถติดต่อ API ได้',
						'error',
					);
				}
			}
		}
	};

	useEffect(() => {
		let url = `/api/v1/statements?id=${customerId}&page=${page}&limit=${limit}`;
		setFetchState(true);
		setUserStatement([]);
		if (search.value.length > 0) {
			url += `&filter=${JSON.stringify({
				[search.field]: search.value,
			})}`;
		}
		if (like === true) {
			url += '&options=like';
		}
		if (order.length > 0) {
			const orderValue = toggleAsc ? -1 : 1;
			url += `&orderby=${JSON.stringify({ [order]: orderValue })}`;
		}
		axios
			.get(url)
			.then(({ data: response }) => {
				const { total, promotion_total, statements } = response.data;
				setCurrentTotal(parseFloat(total));
				setCurrentPromotionTotal(parseFloat(promotion_total));
				setCurrentAllTotal(parseFloat(total + promotion_total));
				setUserStatement(statements);
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {
				setFetchState(false);
			});
	}, [customerId, page, limit, search, order, toggleAsc, like]);

	return {
		isFetchState,
		setTypeAction,
		setUsePromo,
		userStatement,
		addStatement,
		setAmountPromo,
		setCustomerId,
		currentTotal,
		currentPromotionTotal,
		currentAllTotal,
		setDescription,
		setValue,
		validate,
		typeAction,
		usePromo,
		amountPromo,
		description,
		value,
		setPage,
		setLimit,
		page,
		limit,
		setSearch,
		search,
		order,
		setOrder,
		setToggleAsc,
		toggleAsc,
		setLike,
		updateStatement,
	};
};

export default useCustomerStatement;
