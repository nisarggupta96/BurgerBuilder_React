import React from 'react';
import './BuildControl.css';

const buildControl = (props) => (
	<div className='BuildControl'>
		<div> {props.label} </div>
		<button onClick={props.add} className='MoreBtn'> More </button>
		<button onClick={props.remove} className='LessBtn'> Less </button>
		
	</div>
);

export default buildControl;