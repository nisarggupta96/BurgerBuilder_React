import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

	const dispatch = useDispatch();

	const ings = useSelector(state => state.burgerBuilder.ingredients);
	const tPrice = useSelector(state => state.burgerBuilder.totalPrice);
	const error = useSelector(state => state.burgerBuilder.error);
	const isAuthenticated = useSelector(state => state.auth.token !== null);

	const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
	const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
	const onInitIngredients = useCallback(
		() => dispatch(actions.initIngredients()),
		[dispatch]
	);
	const onInitPurchase = () => dispatch(actions.purchaseInit());
	const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

	useEffect(() => {
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

	const orderingHandler = () => {
		if (props.isAuthenticated) {
			setOrdering(true);
		} else {
			onSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	}

	const purchaseCancleHandler = () => {
		setOrdering(false);
	}

	const purchaseContinueHandler = () => {
		onInitPurchase();
		props.history.push('/checkout')
	}


	let orderSummary = null;
	let burger = error ? <p> Cannot load </p> : <Spinner />;

	if (ings) {
		burger = (
			<Aux>
				<Burger ingredients={ings} />
				<BuildControls
					ingredientAdd={onIngredientAdded}
					ingredientRemove={onIngredientRemoved}
					price={tPrice}
					purchase_enable={updatePurchaseState(ings)}
					ordered={orderingHandler}
					isAuth={isAuthenticated}
				/>
			</Aux>
		);

		orderSummary = <OrderSummary
			ingredients={ings}
			purchaseContinue={purchaseContinueHandler}
			purchaseCancel={purchaseCancleHandler}
			price={tPrice} />;
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

export default withErrorHandler(burgerBuilder, axios);