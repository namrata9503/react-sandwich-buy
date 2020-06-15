import React from 'react';

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = (props) => (
    <div className={classes.NavigationItems} >
        <NavigationItem link="/" exact>Sandwich Maker</NavigationItem>
        {props.isAuthenticated 
        ?<NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticaton</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>
        }


    </div>
);

export default navigationItems;