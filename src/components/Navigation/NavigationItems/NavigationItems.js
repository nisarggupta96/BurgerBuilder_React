import React from 'react';
import './NavigationItems.css';

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
	<ul className="NavigationItems"> 
		<NavigationItem link="/" exact clicked={props.itemClick}> Burger Builder </NavigationItem>
		{props.isAuthenticated ? <NavigationItem link="/orders" clicked={props.itemClick}> Orders </NavigationItem> : null }
		{!props.isAuthenticated 
			? <NavigationItem link="/auth" clicked={props.itemClick}> Authenticate </NavigationItem>
			: <NavigationItem link="/logout" clicked={props.itemClick}> Logout </NavigationItem> }
	</ul>
);

export default navigationItems;