import React, { Component } from 'react';
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
			return { showSideDrawer: !prevState.sideDrawerState };
		});
	}


	render() {
		return (
			<Aux>
				<Toolbar toggleDrawer={this.toggleDrawer}/>
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
				<main className="Content">
					{this.props.children}
				</main>
			</Aux> 
		) 
	}
}

export default Layout;