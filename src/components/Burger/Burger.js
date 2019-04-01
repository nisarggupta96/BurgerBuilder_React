import React from 'react';
import BurgerIngrdient from './BurgerIngredient/BurgerIngredient';

import './Burger.css';

const burger = ( props ) => {

	let transformedIngredients = Object.keys(props.ingredients)
				.map(igKey => {
					return [...Array(props.ingredients[igKey])].map( (_,i) => {
 						return <BurgerIngrdient key={igKey + i} type={igKey} />
					});
				})
				.reduce((arr, el) => {
					return arr.concat(el)
				},[]);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p> Please start adding ingredients </p>
	}				

	return (
		<div className='Burger'>
			<BurgerIngrdient type="bread-top" />
			{transformedIngredients}
			<BurgerIngrdient type="bread-bottom" />
		</div>
	);
};

export default burger;