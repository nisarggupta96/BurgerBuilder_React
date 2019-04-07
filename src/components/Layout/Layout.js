import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import Aux from '../../hoc/ReactAux';
import './Layout.css';

const layout = ( props ) => (
  <Aux>
  	<Toolbar/>
    <div> SideDrawer, Backdrop </div>
    <main className="Content">
      {props.children}
    </main>
  </Aux>  
);

export default layout;