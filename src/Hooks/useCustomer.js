import { useState, useEffect } from 'react';
import mockuser from '../mockusers.json';

const useCustomer = id => {
	const [userData, setUsersData] = useState({});
	const [isLoad, setLoad] = useState(true);

	useEffect(() => {
		const index = mockuser.findIndex(item => item.id === id);

		setUsersData(mockuser[index]);
		setLoad(false);
	}, []);

	return {
		userData,
		isLoad,
	};
};

export default useCustomer;
