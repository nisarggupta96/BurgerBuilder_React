import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

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
	}

	orderHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (let formElement in this.state.orderForm) {
			formData[formElement] = this.state.orderForm[formElement].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
			userId: this.props.userId
		};
		
		this.props.onOrderBurger(order, this.props.token);
		// console.log(this.props.ings);
	}

	inputChangedHandler = (event, inputIdentifier) => {
		// console.log(event.target.value);
		const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
			value : event.target.value,
			valid : checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
			touched : true
		});
		const updatedformData = updateObject(this.state.orderForm, {
			[inputIdentifier]: updatedFormElement
		});
		// console.log(updatedFormElement);

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
		if (this.props.loading) {
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
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));