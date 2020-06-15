import React from 'react';
import SandwichLogo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidebar.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auxiliary';

const sidebar = (props) => {

    let attachedClasses = [classes.Sidebar, classes.Close];
    if(props.open){
        attachedClasses = [classes.Sidebar, classes.Open];
    }
    

    return (
        <Aux>
            <BackDrop clicked={props.closed} show={props.open} />
            <div className={attachedClasses.join(' ')} onClick={props.closed} >
                <div className={classes.Logo}>
                    <SandwichLogo />

                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
}

export default sidebar;