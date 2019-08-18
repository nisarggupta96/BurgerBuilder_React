import React from 'react';
import Aux from "../../../hoc/ReactAux";
import Backdrop from "../Backdrop/Backdrop";

import './Modal.css';

const modal = (props) => {
	return (<Aux>
		<Backdrop show={props.show} clicked={props.modalClosed} />
		<div
			className='Modal'
			style={{
				transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
				opacity: props.show ? '1' : '0'
			}}>
			{props.children}
		</div>
	</Aux>
	);
};

export default React.memo(
	modal,
	(prevProps, nextProps) =>
		nextProps.show === prevProps.show &&
		nextProps.children === prevProps.children
);