import React, { useEffect, useGlobal } from 'reactn';
import { Container, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import history from './utils/history';
import { Router, Route, NavLink } from 'react-router-dom';
import Authentication from './Features/Authentication/authentication';
import Users from './Features/Customers/usersList';
import UserEdit from './Features/Customers/userEdit';
import UsersStatementList from './Features/Customers/userStatement';
import UserCreate from './Features/Customers/userCreate';
import AccountManager from './Features/Accounts/account';

const Home = () => {
	const [isLogin] = useGlobal('isLogin');
	return <div>{JSON.stringify(isLogin)}</div>;
};

const NavbarItem = [
	{ link: '/customers', icon: 'fa fa-users', label: 'Customers Manager' },
	{ link: '/account', icon: 'fa fa-list-alt', label: 'Account Manager' },
];

const App = () => {
	const [isLogin, setLogin] = useGlobal('isLogin');
	const [, setRole] = useGlobal('role');

	useEffect(() => {
		const token = window.localStorage.getItem('token');
		const role = window.localStorage.getItem('role');
		if (!token) {
			history.push('/login');
		} else {
			setLogin(true);
			setRole(role);
		}
	}, []);

	return (
		<Router history={history}>
			{isLogin && (
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/" />
					<Nav className="ml-auto" navbar>
						{NavbarItem.map((item, index) => (
							<NavItem key={index}>
								<NavLink className="nav-link" to={item.link}>
									<i className={item.icon} /> {item.label}
								</NavLink>
							</NavItem>
						))}
					</Nav>
				</Navbar>
			)}
			<Container>
				<div style={{ marginTop: '2%' }}>
					<Route path="/" exact component={Home} />
					<Route path="/customers" component={Users} />
					<Route path="/create/customer" component={UserCreate} />
					<Route path="/customer/:id" component={UserEdit} />
					<Route path="/statement/:id" component={UsersStatementList} />
					<Route path="/account" component={AccountManager} />
				</div>
			</Container>
			<Route path="/login" component={Authentication} />
		</Router>
	);
};

export default App;
