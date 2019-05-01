import React, { Component } from 'react';
import "./Orders.css";
import Order from './Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

	state = {
		orders: [],
		loading: true
	}

	componentDidMount() {
		axios.get('orders.json')
			 .then( resp => {
			 	const fetchedOrders = [];
			 	for (let key in resp.data) {
			 		fetchedOrders.push({
			 			...resp.data[key],
			 			id: key
			 		});
			 	}
			 	this.setState({loading: true, orders: fetchedOrders});
			 	console.log(fetchedOrders);
			 })
			 .catch( err => {
			 	this.setState({loading: true});

			 })
	}

	render () {
		return(
			<div>
				{this.state.orders.map( order => (
					<Order 
						key={order.id}
						ingredients={order.ingredients}
						price={+order.price}/>
				))}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);