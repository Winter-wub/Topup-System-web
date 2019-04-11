import React from 'react';
import { Container } from 'reactstrap';
import history from './utils/history';
import { Router, Route, Link } from 'react-router-dom';
import Users from './Features/Users/usersList';
import UserEdit from './Features/Users/userEdit';
import UsersStatementList from './Features/Users/userStatement';
import AccountManager from './Features/Accounts/account';

const Home = () => {
	return (
		<div>
			<Link to="customers">
				<h1>Users</h1>
			</Link>
			<Link to="account">
				<h1>account</h1>
			</Link>
		</div>
	);
};

const App = () => {
	return (
		<Container>
			<Router history={history}>
				<Route path="/" exact component={Home} />
				<Route path="/customers" component={Users} />
				<Route path="/customer/:id" component={UserEdit} />
				<Route path="/statement/:id" component={UsersStatementList} />
				<Route path="/account" component={AccountManager} />
			</Router>
		</Container>
	);
};

export default App;
