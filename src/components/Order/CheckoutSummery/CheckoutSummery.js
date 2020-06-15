import React from 'react';
import Sandwich from '../../Sandwich/Sandwich';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummery.css';
const CheckoutSummery = (props) => (
    <div className={classes.CheckoutSummery}>
        <h1>Your Delicious ordered Food...!!!!!!!</h1>
        <div style={{ width: '100%', margin: 'auto' }}>
            <Sandwich ingredients={props.ingredients} />
        </div>
        <Button btnType="Danger"
        clicked={props.checkoutCancel}
        >CANCEL</Button>
        <Button btnType="Success"
        clicked={props.checkoutContinue}
        >CONTINUIE</Button>
    </div>
);

export default CheckoutSummery;