import React from 'react';
import { Container, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import history from './utils/history';
import { Router, Route, NavLink } from 'react-router-dom';
import Users from './Features/Users/usersList';
import UserEdit from './Features/Users/userEdit';
import UsersStatementList from './Features/Users/userStatement';
import UserCreate from './Features/Users/userCreate';
import AccountManager from './Features/Accounts/account';

const Home = () => {
	return <div />;
};

const NavbarItem = [
	{ link: '/customers', icon: 'fa fa-users', label: 'Customers Manager' },
	{ link: '/account', icon: 'fa fa-list-alt', label: 'Account Manager' },
];

const App = () => {
	return (
		<div>
			<Router history={history}>
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

				<Container style={{ marginTop: '1%' }}>
					<Route path="/" exact component={Home} />
					<Route path="/customers" component={Users} />
					<Route path="/create/customer" component={UserCreate} />
					<Route path="/customer/:id" component={UserEdit} />
					<Route path="/statement/:id" component={UsersStatementList} />
					<Route path="/account" component={AccountManager} />
				</Container>
			</Router>
		</div>
	);
};

export default App;
