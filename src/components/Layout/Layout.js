import React, { useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Aux from '../../hoc/ReactAux';
import './Layout.css';

const layout = props => {

	const [showSideDrawer, setShowSideDrawer] = useState(false);

	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(false);
	}

	const toggleDrawer = () => {
		setShowSideDrawer(!showSideDrawer);
	}

	return (
		<Aux>
			<Toolbar
				isAuth={props.isAuthenticated}
				toggleDrawer={toggleDrawer} />
			<SideDrawer
				open={showSideDrawer}
				closed={sideDrawerClosedHandler}
				isAuth={props.isAuthenticated}
			/>
			<main className="Content">
				{props.children}
			</main>
		</Aux>
	)
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

export default connect(mapStateToProps)(layout);