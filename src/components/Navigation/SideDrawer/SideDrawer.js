import React from 'react';
import './SideDrawer.css';
import Logo from "../../Logo/Logo";
import NavitaionItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/ReactAux";

const sideDrawer = (props) => {
	let attachedClasses = ["SideDrawer", "Close"];
	if (props.open) {
		attachedClasses = ["SideDrawer", "Open"];
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed}/>
			<div className={attachedClasses.join(" ")}>
				<div className="LogoWrap2">
					<Logo/>
				</div>
				<nav>
					<NavitaionItems isAuthenticated={props.isAuth} itemClick={props.closed}>  </NavitaionItems>
				</nav>
			</div>
		</Aux>
	);
}

export default sideDrawer;