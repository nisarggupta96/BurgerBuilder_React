import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const ing_prices = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		purchase_enable: false,
		totalPrice: 4,
		ordering: false,
		loading: false
	}

	updatePurchaseState(ingredients) {
		const sumIng = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce( (sumIng, el) => {
				return sumIng + el;
			} ,0);
		this.setState({purchase_enable: sumIng > 0});	
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		const priceExtra = ing_prices[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceExtra;

		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients)
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount - 1;
		if (updatedCount >= 0) {
			const updatedIngredients = {
					...this.state.ingredients
				};
			updatedIngredients[type] = updatedCount;
			const priceExtra = ing_prices[type];
			const oldPrice = this.state.totalPrice;
			const newPrice = oldPrice - priceExtra;
			this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
			this.updatePurchaseState(updatedIngredients);
		}
	}

	orderingHandler = () => {
		this.setState({ordering: true});
	}

	purchaseCancleHandler = () => {
		this.setState({ordering: false});
	}

	purchaseContinueHandler = () => {
		//alert("Continue");
		this.setState({loading: true});
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'XYZ ABC',
				contact: 'teste',
				email: 'test@mail.com'
			}
		};
		axios.post('/orders.json', order)
			 .then( response => {
			 	this.setState({loading: false, ordering: false });
			 	console.log(response)
			 })
			 .catch( error => {
			 	this.setState({loading: false, ordering: false });
			 	console.log(error)
			 });
	}

  render() {

 	let orderSummary = <OrderSummary 
        		ingredients = {this.state.ingredients}
        		purchaseContinue = {this.purchaseContinueHandler}
        		purchaseCancel = {this.purchaseCancleHandler} 
        		price = {this.state.totalPrice}/>;

    if (this.state.loading) {
    	orderSummary = <Spinner />
    }    		

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
        	ingredientAdd = {this.addIngredientHandler}
        	ingredientRemove = {this.removeIngredientHandler}
        	price = {this.state.totalPrice}
        	purchase_enable = {this.state.purchase_enable}
        	ordered = {this.orderingHandler}
        />
        <Modal show={this.state.ordering} modalClosed={this.purchaseCancleHandler}>
        	{orderSummary}
        </Modal>
      </Aux>
    );
  }
}

export default BurgerBuilder;