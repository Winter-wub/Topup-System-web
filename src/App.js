import React, { useEffect, useGlobal } from 'reactn';
import {
	Container,
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	Button,
} from 'reactstrap';
import { Router, Route, NavLink } from 'react-router-dom';
import Cookie from 'universal-cookie';

import AccountManager from './Features/Accounts/accountList';
import Authentication from './Features/Authentication/authentication';
import Dashboard from './Features/Dashboard/dashboard';
import Users from './Features/Customers/usersList';
import UserEdit from './Features/Customers/userEdit';
import UsersStatementList from './Features/Customers/userStatement';
import UserCreate from './Features/Customers/userCreate';
import AccountCreate from './Features/Accounts/accountCreate';
import Admin_Usermanager from './Features/Admins/userlist';
import Admin_UserEdit from './Features/Admins/userEdit';
import Admin_UserCreate from './Features/Admins/userCreate';
import history from './utils/history';

import useAuthentication from './Hooks/useAuthentication';
const cookie = new Cookie();
const Home = () => {
	return (
		<div className="d-flex justify-content-center align-items-center">
			กรุณาเลือกเมนูการทำงานตรง Navigation Bar ด้านบนได้เลย พัฒนาโดย StratosBlur
			(github)
		</div>
	);
};

const NavbarItem = [
	{ link: '/dashboard', icon: 'fa fa-line-chart', label: 'Dashboard' },
	{ link: '/customers', icon: 'fa fa-users', label: 'Customers Manager' },
];
const App = () => {
	const [isLogin, setLogin] = useGlobal('isLogin');
	const [roleState, setRole] = useGlobal('role');
	const [username, setUsername] = useGlobal('username');
	const [, setToken] = useGlobal('token');
	const { logout } = useAuthentication();
	useEffect(() => {
		const token = cookie.get('token');
		const role = cookie.get('role');
		const user_name = cookie.get('username');
		if (!token) {
			history.push('/login');
		} else {
			setLogin(true);
			setRole(role);
			setUsername(user_name.toString());
			setToken(token);
		}
	}, []);

	return (
		<Router history={history}>
			{isLogin && (
				<Navbar color="light" light expand="md">
					<NavbarBrand>
						{username.length > 1 && (
							<div>
								Login as {username}{' '}
								<Button color="danger" onClick={() => logout()}>
									Logout
								</Button>
							</div>
						)}
					</NavbarBrand>
					<Nav className="ml-auto" navbar>
						{NavbarItem.map((item, index) => (
							<NavItem key={index}>
								<NavLink className="nav-link" to={item.link}>
									<i className={item.icon} /> {item.label}
								</NavLink>
							</NavItem>
						))}
						{roleState === '99' && (
							<NavItem>
								<NavLink className="nav-link" to="accounts">
									<i className="fa fa-list-alt" /> Statement Manager
								</NavLink>
							</NavItem>
						)}
						{roleState === '99' && (
							<NavItem>
								<NavLink className="nav-link" to="users">
									<i className="fa fa-user-secret" /> Admin Panel
								</NavLink>
							</NavItem>
						)}
					</Nav>
				</Navbar>
			)}
			<Container>
				<div style={{ marginTop: '2%' }}>
					<Route path="/" exact component={Home} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/customers" component={Users} />
					<Route path="/create/customer" component={UserCreate} />
					<Route path="/create/user" component={Admin_UserCreate} />
					<Route path="/customer/:id" component={UserEdit} />
					<Route path="/statement/:id" component={UsersStatementList} />
					<Route path="/account" component={AccountCreate} />
					<Route path="/accounts" component={AccountManager} />
					<Route path="/users" component={Admin_Usermanager} />
					<Route path="/user/:id" component={Admin_UserEdit} />
				</div>
			</Container>
			<Route path="/login" component={Authentication} />
		</Router>
	);
};

export default App;
