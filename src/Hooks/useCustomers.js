import { useState, useEffect } from 'react';
import axios from '../utils/axios';

const useCustomers = limit => {
	const [isLoad, setLoad] = useState(true);
	const [customerList, setCustomerList] = useState([]);
	const [filter, setFilter] = useState('');
	const [order, setOrder] = useState('');
	const [toggleAsc, setToggleAsc] = useState(true);
	const [page, setPage] = useState(1);

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
			if (orderValue === -1) {
				url += `&orderby=${JSON.stringify({ order: orderValue })}`;
			}
		}
		axios.get(url).then(({ data }) => {
			const { data: responseData } = data;
			setLoad(false);
			setCustomerList(responseData.customers);
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
	};
};

export default useCustomers;
