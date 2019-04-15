import { useState, useEffect } from 'react';
import axios from '../utils/axios';

const useCustomer = id => {
	const [userData, setUsersData] = useState({});
	const [isLoad, setLoad] = useState(true);

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
	};
};

export default useCustomer;
