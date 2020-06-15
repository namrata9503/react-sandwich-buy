import React from 'react';
import classes from './Sandwich.css';
import SandwichIngredient from './SandwichIngredients/SandwichIngredient'
const sandwich = (props) => {
    let finalIngredient = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <SandwichIngredient key={igKey + i} type={igKey} />;
            }
            )
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (finalIngredient.length === 0) {
            finalIngredient=<p>Please start adding Ingredients</p>
    }
    return (
        <div className={classes.Sandwich}>
            <SandwichIngredient type='bread-top' />
            {finalIngredient}


            <SandwichIngredient type='bread-bottom' />

        </div>
    );
}
export default sandwich;