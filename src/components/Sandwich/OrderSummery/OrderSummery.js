import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
const OrderSummery = (props) => {


    const orderIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return( <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {props.ingredients[igKey]}
            </li>
            )
        });
    return (
        <Aux>
            <h3>Dear Customer    , Your Order</h3>
            <p>Your Ordered Delicious Ingredients Are: </p>
            <ul>
                {orderIngredients}

            </ul>
            <p><strong>Total Price:  {props.price.toFixed(2)} </strong> </p>

            <p>Continue To Checkout ??</p>

            <Button btnType="Danger" clicked= {props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked= { props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    )
}

export default OrderSummery;