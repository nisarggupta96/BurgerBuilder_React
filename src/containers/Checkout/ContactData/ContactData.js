import React, { Component } from 'react';
import { connect } from 'react-redux';
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
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest'},
						{value: 'cheapest'}
					]
				},
				value: 'fastest',
				validation: {},
				valid: true
			}
		},
		formIsValid: false,	
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
			ingredients: this.props.ings,
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
		console.log(this.props.ings);
	}

	checkValidity(value, rules) {
		let isValid = true;		
		if (rules.required) {
			isValid = value.trim() != '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.trim().length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.trim().length <= rules.maxLength && isValid;
		}
		return isValid;
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
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedformData[inputIdentifier] = updatedFormElement;
		console.log(updatedFormElement);

		let isFormValid = true;
		for(let inputIdentifier in updatedformData) {
			isFormValid = updatedformData[inputIdentifier].valid && isFormValid;
		}

		this.setState({orderForm: updatedformData, formIsValid: isFormValid});
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
								invalid = {!formElement.config.valid}
								shouldValidate = {formElement.config.validation}
								touched = {formElement.config.touched}
								changed = {(event) => this.inputChangedHandler(event, formElement.id)}/>
						))}
						<Button 
							btnType = "Success" 
							clicked = {this.orderHandler}
							disabled = {!this.state.formIsValid}>
								ORDER 
						 </Button>
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

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
}

export default connect(mapStateToProps)(ContactData);