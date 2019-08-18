import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = props => {

	/*state = {
		ingredients : null,
		totalPrice: null
	}*/

	/*componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (let param of query.entries()) {
			if (param[0] === 'price') {
				price = +param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
		}
		this.setState({ingredients: ingredients, totalPrice: price});
	}*/

	const checkoutCancel = () => {
		props.history.goBack();
		// goes back to last page
	}

	const checkoutContinue = () => {
		props.history.replace('/checkout/contact-data');
	}

	let summary = <Redirect to="/" />;
	if (props.ings) {
		const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
		summary = (
			<div>
				{purchasedRedirect}
				<CheckoutSummary
					ingredients={props.ings}
					checkoutCancel={checkoutCancel}
					checkoutContinue={checkoutContinue} />
				<Route
					path={props.match.path + '/contact-data'}
					component={ContactData} />
			</div>);
	};
	return summary;

}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		purchased: state.order.purchased
	}
}

export default connect(mapStateToProps)(checkout);