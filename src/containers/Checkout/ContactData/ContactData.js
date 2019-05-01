import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'

import "./ContactData.css";

class ContactData extends Component {

	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'XYZ ABC',
				contact: 'teste',
				email: 'test@mail.com'
			}
		};
		axios.post('/orders.json', order)
			 .then( response => {
			 	this.setState({loading: false});
			 	console.log(response);
			 	this.props.history.push('/');
			 })
			 .catch( error => {
			 	this.setState({loading: false});
			 	console.log(error);
			 });
		console.log(this.props.ingredients);
	}

	render () {
		let form = (<form>
						<input type='text' name="name" placeholder="name"/>
						<input type='email' name="name" placeholder="email"/>
						<input type='text' name="street" placeholder="street"/>
						<input type='text' name="postalcode" placeholder="postalcode"/>
						<Button 
							btnType="Success" 
							clicked={this.orderHandler}> ORDER </Button>
					</form>);
		if (this.state.loading) {
			form = <Spinner/>;
		}
		return (
			<div className="ContactData">
				<h4> Enter contact details </h4>
				{form}
			</div>
		);
	}
}

export default ContactData;