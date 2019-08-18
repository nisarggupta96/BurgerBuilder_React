import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const burgerBuilder = props => {

	const [ordering, setOrdering] = useState(false);

	const { onInitIngredients } = props;

	useEffect(() => {
		// axios.get('https://burgerbuilderudemy.firebaseio.com/ingredients.json')
		// 	 .then( response => {
		// 	 	this.setState({ingredients: response.data});
		// 	 })
		// 	 .catch(error => {
		// 	 	this.setState({error: true});
		// 	 });
		onInitIngredients();
	}, [onInitIngredients]);

	const updatePurchaseState = (ingredients) => {
		const sumIng = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sumIng, el) => {
				return sumIng + el;
			}, 0);
		return sumIng > 0;
	}

	/*addIngredientHandler = (type) => {
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
	}*/

	/*removeIngredientHandler = (type) => {
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
	}*/

	const orderingHandler = () => {
		if (props.isAuthenticated) {
			setOrdering(true);
		} else {
			props.onSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	}

	const purchaseCancleHandler = () => {
		setOrdering(false);
	}

	const purchaseContinueHandler = () => {
		//alert("Continue");
		// this.setState({loading: true});
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	paddIngredient
		// 	caddIngredient
		// 	addIngredient
		// 	addIngredient
		// 	addIngredient
		// 	}addIngredient
		// };
		// axios.post('/orders.json', order)
		// 	 .then( response => {
		// 	 	this.setState({loading: false, ordering: false });
		// 	 	console.log(response)
		// 	 })
		// 	 .catch( error => {
		// 	 	this.setState({loading: false, ordering: false });
		// 	 	console.log(error)
		// 	 });

		// const queryParams = [];
		// for (let i in this.state.ingredients) {
		// 	queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		// }
		// queryParams.push('price=' + props.tPrice);
		// const queryString = queryParams.join('&');

		// props.history.push({
		// 	pathname: "/checkout",
		// 	search: '?' + queryString
		// });
		props.onInitPurchase();
		props.history.push('/checkout')
	}


	let orderSummary = null;
	let burger = props.error ? <p> Cannot load </p> : <Spinner />;

	if (props.ings) {
		burger = (
			<Aux>
				<Burger ingredients={props.ings} />
				<BuildControls
					ingredientAdd={props.onIngredientAdded}
					ingredientRemove={props.onIngredientRemoved}
					price={props.tPrice}
					purchase_enable={updatePurchaseState(props.ings)}
					ordered={orderingHandler}
					isAuth={props.isAuthenticated}
				/>
			</Aux>
		);

		orderSummary = <OrderSummary
			ingredients={props.ings}
			purchaseContinue={purchaseContinueHandler}
			purchaseCancel={purchaseCancleHandler}
			price={props.tPrice} />;
	}

	return (
		<Aux>
			<Modal show={ordering} modalClosed={purchaseCancleHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</Aux>
	);
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		tPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));