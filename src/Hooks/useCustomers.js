import { useState, useEffect } from 'react';
import mockuser from '../mockusers.json';

const useCustomers = () => {
	const [isLoad, setLoad] = useState(true);
	const [customerList, setCustomerList] = useState([]);
	useEffect(() => {
		setCustomerList(mockuser);
		setLoad(false);
	}, []);

	return {
		isLoad,
		customerList,
	};
};

export default useCustomers;
