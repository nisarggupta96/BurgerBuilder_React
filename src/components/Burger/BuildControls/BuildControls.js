import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
	<div className='BuildControls'>
	<p> Price = <strong> {props.price.toFixed(2)} </strong> </p>
		{controls.map( ctrl => (
			<BuildControl 
				key = {ctrl.label} 
				label = {ctrl.label}
				add = { () => props.ingredientAdd(ctrl.type) }
				remove = { () => props.ingredientRemove(ctrl.type)}
			/>
			))}

		<button 
			className='OrderButton' 
			disabled={!props.purchase_enable} 
			onClick = {props.ordered}>
			{props.isAuth ? 'Order Now' : 'SIGN UP TO ORDER'}
		</button>

	</div>
);

export default buildControls;