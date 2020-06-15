
import React from 'react';
import classes from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Toggle from '../Sidebar/Toggle/Toggle';

const toolbar = (props) => (

    <header className={classes.Toolbar}>
        <Toggle clicked={props.sidebarToggle}/>
        <div className={classes.Logo}>
            <Logo />
        </div>

        <nav className={classes.Desktop}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);



export default toolbar;