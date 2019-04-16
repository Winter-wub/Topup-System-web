import React from 'react';
import { Form, Col, Label, Input, FormGroup } from 'reactstrap';
const SearchBox = ({ handleChange, value, style, placeholder = 'search' }) => {
	return (
		<Form>
			<FormGroup row>
				<Label style={{ marginTop: '0.5%' }}>
					<i className="fa fa-search" />
				</Label>
				<Col sm={5}>
					<Input
						style={style}
						type="text"
						value={value}
						onChange={handleChange}
						placeholder={placeholder}
					/>
				</Col>
			</FormGroup>
		</Form>
	);
};

export default SearchBox;
