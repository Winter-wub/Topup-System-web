import React from 'reactn';
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
import useAuthentication from '../../Hooks/useAuthentication';

const Authentication = () => {
	const {
		setUsername,
		setPassword,
		password,
		username,
		Login,
		isLoad,
	} = useAuthentication();

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
									value={username}
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
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</Col>
						</FormGroup>
					</Form>
				</CardBody>
				<CardFooter>
					<Button disabled={isLoad} onClick={() => Login()}>
						Login
					</Button>
				</CardFooter>
			</Card>
		</Container>
	);
};

export default Authentication;
