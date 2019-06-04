import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

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

	checkoutCancel = () => {
		this.props.history.goBack();
		// goes back to last page
	}

	checkoutContinue = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render () {
		return (
			<div>
				<CheckoutSummary 
					ingredients={this.props.ings}
					checkoutCancel={this.checkoutCancel}
					checkoutContinue={this.checkoutContinue}/>
				<Route 
					path={this.props.match.path + '/contact-data'} 
					component={ContactData}/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
}

export default connect(mapStateToProps)(Checkout);