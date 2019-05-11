import React from 'react';
import './Input.scss';

const  input = (props) => {
	
	let inputElement = null;

	switch(props.elementType) {
		case('input'):
			inputElement = <input 
				className="InputElement" 
				{...props.elementConfig} 
				value={props.value}
				onChange={props.changed}/>;
			break;
		case ('textarea'):
			inputElement = <textarea 
				className="InputElement" 
				{...props.elementConfig} 
				value={props.value}
				onChange={props.changed}/>;	
			break;
		case ('select'):
			inputElement = (
				<select 
					className="InputElement" 
					value={props.value}
					onChange={props.changed}>
					{props.elementConfig.options.map( option => (
						<option value={option.value} key={option.value}>
							{option.value}
						</option>
						) )}
				</select>
				);	
			break;			
		default:
			inputElement = <input 
				className="InputElement" 
				{...props.elementConfig} 
				value={props.value}
				onChange={props.changed}/>;
	}	
		
	return (
		<div className="Input">
			<label> {props.label} </label>
			{inputElement}
		</div>
	);
};

export default input;