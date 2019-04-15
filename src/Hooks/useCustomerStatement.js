import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from '../utils/axios';

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
				const { total, promotion_total, statements } = response.data;
				setCurrentTotal(total);
				setCurrentPromotionTotal(promotion_total);
				setCurrentAllTotal(total + promotion_total);
				setUserStatement(statements);
				setFetchState(false);
			});
	}, [customerId]);

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
	};
};

export default useCustomerStatement;
