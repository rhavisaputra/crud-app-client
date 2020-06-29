import React from 'react';
import { Field, ErrorMessage } from 'formik';

import Form from 'react-bootstrap/Form';

// BASE

const FormGroup1 = ({ className, type, name, ph, ...props }) => {
	return (
		<Form.Group className="mb-2">
			<Field 
				type={type} 
				name={name} 
				className={`form-control ${className}`} 
				placeholder={ph} 
				{...props} 
			/>
			<small className="text-danger">
				<ErrorMessage name={name} />
			</small>
		</Form.Group>
	);
}

// SELECT

FormGroup1.Select = ({ className, name, ...props }) => {
	return (
		<Form.Group className="mb-2">
			<Field as="select" 
				name={name} 
				className={`form-control ${className}`} 
				{...props} 
			>
				{props.children}
			</Field>
			<small className="text-danger">
				<ErrorMessage name={name} />
			</small>
		</Form.Group>
	);
}

export default FormGroup1;