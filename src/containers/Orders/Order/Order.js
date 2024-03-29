import React from 'react';
import "./Order.css";

const orders = (props) => {

	const ingredients = [];
	
	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName, 
			amount: props.ingredients[ingredientName]
		});
	}

	const ingredientOutput = ingredients.map( ig => {
		return (
			<span 
				style={{
					textTransform: 'capitalize', 
					display: 'inline-block',
					border: '1px solid grey',
					margin: '5px',
					padding: '5px'
				}}
				key={ig.name}> {ig.name} ({ig.amount}) 
			</span>
		);
	}) 

	return (
		<div className="Order">
			<p> Ingredients: {ingredientOutput} </p>
			<p> Price : <strong> { props.price.toFixed(2) } </strong> </p>
		</div>	
	);
}

export default orders;