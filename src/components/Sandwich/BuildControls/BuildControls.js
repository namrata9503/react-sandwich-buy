import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Bacon', type: 'Bacon' },
    { label: 'Cheese', type: 'Cheese' },
    { label: 'salad', type: 'salad' },
    { label: 'Meat', type: 'Meat' },
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Total Current Price :<strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map(ctrl => (
                    <BuildControl
                        added={()=>props.ingredientAdded(ctrl.type)}
                        removed={()=> props.ingredientRemoved(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}
                      //  type={ctrl.type}
                        key={ctrl.label}
                        label={ctrl.label} />
                )
                )
            }
           <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'sign up to order'}</button>
        </div>
    )
};

export default buildControls;