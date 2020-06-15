import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './SandwichIngredient.css'

class SandwichIngredient extends Component {


    render() {
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>
                break;
            case ('bread-top'):
                ingredient = (

                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds2}></div>
                        <div className={classes.Seeds1}></div>
                    </div>
                );
                break;
            case ('Meat'):
                ingredient = <div className={classes.Meat}></div>
                break;
            case ('Cheese'):
                ingredient = <div className={classes.Cheese}></div>
                break;
            case ('Bacon'):
                ingredient = <div className={classes.Bacon}></div>
                break;
            case ('salad'):
                ingredient = <div className={classes.Salad}></div>
                break;
            default:
                ingredient = null;



        }
        return ingredient;
    }

}

    SandwichIngredient.propTypes = {
        type : PropTypes.string.isRequired
    };

export default SandwichIngredient;