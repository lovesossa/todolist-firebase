import React from 'react';

const FormField = ({
	id,
	placeholder = 'placeholder',
	name,
	labelText,
	type = 'text',
	required = false,
	value,
	handleChange,
	handleBlur,
	defaultValue,
	disabled = false,
}) => {
	return (
		<div className="form_field">
			{labelText ? (
				<label className="form_field__label" htmlFor={id}>{labelText}</label>
			) : null}
			<input
				className="form_field__input"
				id={id}
				type={type}
				name={name}
				value={value || undefined}
				defaultValue={defaultValue}
				placeholder={placeholder}
				required={required}
				onBlur={handleBlur}
				onChange={handleChange}
				disabled={disabled}
			/>
		</div>
	);
};

export default FormField;
