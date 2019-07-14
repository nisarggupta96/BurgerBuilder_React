import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Aux from '../../hoc/ReactAux';
import './Layout.css';

class Layout extends Component {

	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	}

	toggleDrawer = () => {
		this.setState( (prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	}


	render() {
		return (
			<Aux>
				<Toolbar
					isAuth={this.props.isAuthenticated} 
					toggleDrawer={this.toggleDrawer}/>
				<SideDrawer 
					open={this.state.showSideDrawer} 
					closed={this.sideDrawerClosedHandler}
					isAuth={this.props.isAuthenticated}
					/>
				<main className="Content">
					{this.props.children}
				</main>
			</Aux> 
		) 
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

export default connect(mapStateToProps)(Layout);