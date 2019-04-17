import React, { useState, useGlobal } from 'reactn';
import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	FormGroup,
	Label,
	Input,
	Form,
	Col,
	Button,
	Container,
} from 'reactstrap';
import axios from '../../utils/axios';
import history from '../../utils/history';

const Authentication = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [, setIslogin] = useGlobal('isLogin');
	const [, setRole] = useGlobal('role');

	const Login = () => {
		axios
			.post('/api/v1/users/login', {
				data: {
					username,
					password,
				},
			})
			.then(({ data: Response }) => {
				const { data } = Response;
				if (data.status === true) {
					console.log(data);
					window.localStorage.setItem('token', data.token);
					window.localStorage.setItem('role', data.role);
					setIslogin(true);
					setRole(data.role);
					history.push('/');
				}
			});
	};

	return (
		<Container>
			<Card>
				<CardHeader>Login</CardHeader>
				<CardBody>
					<Form>
						<FormGroup row>
							<Label sm={2}>Username</Label>
							<Col sm={10}>
								<Input
									style={{ width: '50%' }}
									onChange={e => setUsername(e.target.value)}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>Password</Label>
							<Col sm={10}>
								<Input
									style={{ width: '50%' }}
									type="password"
									onChange={e => setPassword(e.target.value)}
								/>
							</Col>
						</FormGroup>
					</Form>
				</CardBody>
				<CardFooter>
					<Button onClick={() => Login()}>Login</Button>
				</CardFooter>
			</Card>
		</Container>
	);
};

export default Authentication;
