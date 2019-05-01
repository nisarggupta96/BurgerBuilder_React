import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const checkoutSummary = (props) => {

	return (
		<div className="CheckoutSummary">
			<h1> Hope you enjoy your burger</h1>
			<div style={{width: '100%', height: 'auto'}}>
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button 
				btnType="Danger"
				clicked={props.checkoutCancel}> CANCEL </Button>
			<Button 
				btnType="Success"
				clicked={props.checkoutContinue}> CONTINUE </Button>
		</div>
	);
}

export default checkoutSummary;