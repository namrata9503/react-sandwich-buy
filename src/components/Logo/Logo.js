import React from 'react';
import SandwichLogo from '../../assets/images/logo.png';

import classes from './Logo.css'
const logo =(props)=>(
<div className={classes.Logo} >
    <img src={SandwichLogo} alt="MySandwich"/>
</div>
);

export default logo;