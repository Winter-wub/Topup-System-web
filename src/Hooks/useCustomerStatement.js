import { useEffect, useState } from 'react';
import mockStatement from '../mockstatements.json';
const useCustomerStatement = id => {
	const [userStatementData, setUserStatementData] = useState({});
	const [isLoad, setLoad] = useState(true);

	useEffect(() => {
		const index = mockStatement.findIndex(
			statement => statement.customer_id === id,
		);
		setUserStatementData(mockStatement[index]);
		setLoad(false);
	}, []);

	return {
		userStatementData,
		isLoad,
	};
};

export default useCustomerStatement;
