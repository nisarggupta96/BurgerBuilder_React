import * as actionTypes from './actions';

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	},
	totalPrice: 4
};

const ING_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + ING_PRICE[action.ingredientName]
			}

	 	case actionTypes.REMOVE_INGREDIENT:
	 		if (state.ingredients[action.ingredientName] > 0) {
		 		return {
					...state,
					ingredients: {
						...state.ingredients,
						[action.ingredientName]: state.ingredients[action.ingredientName] - 1
					},
					totalPrice: state.totalPrice - ING_PRICE[action.ingredientName]
		 		};
	 		} else {
		 		return state;
	 		}

	 	default:
	 		return state;
	}
};

export default reducer;