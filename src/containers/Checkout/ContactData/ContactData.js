import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';

import "./ContactData.scss";

class ContactData extends Component {

	state = {
		orderForm : {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Name'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email'
				},
				value: ''
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest'},
						{value: 'cheapest'}
					]
				},
				value: ''
			}
		},	
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});
		const formData = {};
		for (let formElement in this.state.orderForm) {
			formData[formElement] = this.state.orderForm[formElement].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
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

	inputChangedHandler = (event, inputIdentifier) => {
		// console.log(event.target.value);
		const updatedformData = {
			...this.state.orderForm
		};
		const updatedFormElement = {
			...updatedformData[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedformData[inputIdentifier] = updatedFormElement;
		this.setState({orderForm: updatedformData});
	}

	render () {

		const formElementsArray = [];
		for (let formKey in this.state.orderForm) {
			formElementsArray.push({
				id: formKey,
				config: this.state.orderForm[formKey]
			});
		}

		let form = (<form onSubmit={this.orderHandler}>
						{formElementsArray.map( formElement => (
							<Input
								key = {formElement.id} 
								elementType = {formElement.config.elementType} 
								elementConfig = {formElement.config.elementConfig}
								value = {formElement.config.value}
								changed = {(event) => this.inputChangedHandler(event, formElement.id)}/>
						))}
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