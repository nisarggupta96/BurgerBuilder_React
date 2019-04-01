import React from 'react';
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
	
	const ingSummary = Object.keys(props.ingredients)
				.map( igKey => {
					return (<li key={igKey}> 
										<span> {igKey} </span> : {props.ingredients[igKey]}
								 </li>);		 
				});

	return (
		<Aux>
			<h3> Your Order </h3>
			<p> Ingredients : </p>
			<ul>
				{ingSummary}
			</ul>
			<p> Total Price : <strong> {props.price.toFixed(2)} </strong> </p>
			<p> Checkout </p>
			<Button btnType="Danger" clicked={props.purchaseCancel}> CANCEL </Button>
			<Button btnType="Success" clicked={props.purchaseContinue}> CONTINUE </Button>
		</Aux>
		);
};

export default orderSummary;