import React from 'react';
import { Form, Col, Label, Input, FormGroup } from 'reactstrap';
const SearchBox = ({ handleChange, value }) => {
	return (
		<Form>
			<FormGroup row>
				<Label style={{ marginTop: '0.5%' }}>
					<i className="fa fa-search" />
				</Label>
				<Col sm={5}>
					<Input
						style={{ width: '60%' }}
						type="text"
						value={value}
						onChange={handleChange}
						placeholder="Search"
					/>
				</Col>
			</FormGroup>
		</Form>
	);
};

export default SearchBox;
