
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary';
import Sandwich from '../../components/Sandwich/Sandwich';
import BuildControls from '../../components/Sandwich/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Sandwich/OrderSummery/OrderSummery';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-order';

import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class SandwichMaker extends Component {
    state = {
        
        purchasing: false
        // loading: false,
        // error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     }).catch(error => {
        //         this.setState({ error: true })
        //     })
       // console.log(this.props); 

        this.props.onIngredientInit();
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return  sum > 0;
    }

    // addIngredients = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updateCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients

    //     };

    //     updatedIngredients[type] = updateCount;

    //     const priceAddition = INGREDIIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);

    // }

    // removeIngredients = (type) => {

    //     const oldCount = this.state.ingredients[type];

    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updateCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients

    //     };

    //     updatedIngredients[type] = updateCount;

    //     const priceDeduction = INGREDIIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchasHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true })

        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    purchasCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchasContinueHandler = () => {
        //alert("continue");
        // this.setState({ loading: true })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'namsid',
        //         address: {
        //             street: 'TestStreet',
        //             code: '1181',
        //             country: 'NL'
        //         },
        //         email: 'sidnam@test.com'
        //     },
        //     delivery: 'fast'
        // }
        // axios.post('/orders.json', order)
        //     .then(resp => {
        //         this.setState({ loading: false, purchasing: false })

        //     }).catch(err => {
        //         this.setState({ loading: false, purchasing: false })
        //     })

        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price= ' + this.state.totalPrice);
        // const queryString = queryParams.join('&');

        this.props.onPurchasedInitRedirect();
        this.props.history.push('/checkout');

    }



    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummery = null;

        let sandwich = this.props.error ? <p> Sandwich Ingredients can't be loaded!!! </p> : <Spinner />
        if (this.props.ings) {
            sandwich = (
                <Aux>
                    <Sandwich ingredients={this.props.ings} />

                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchasHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price} />
                </Aux>
            );
            orderSummery = <OrderSummery

                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchasCancelHandler}

                purchaseContinue={this.purchasContinueHandler} />
        }

        // if (this.state.loading) {
        //     orderSummery = <Spinner />
        // }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasCancelHandler}>
                    {orderSummery}
                </Modal>
                {sandwich}
            </Aux>
        );

    }

}

const mapStateToProps = state =>{
    return{
        ings: state.sandwichMaker.ingredients,
        price:state.sandwichMaker.totalPrice,
        error: state.sandwichMaker.error ,
        isAuthenticated : state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return{
        // onIngredientAdded: (ingName) => dispatch({type : actionTypes.ADD_INGREDIENT, ingredientName : ingName}),
        // onIngredientRemoved: (ingName) => dispatch({type : actionTypes.REMOVE_INGREDIENT, ingredientName : ingName})
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onIngredientInit : () => dispatch(actions.initIngredient()),
        onPurchasedInitRedirect : () =>dispatch(actions.purchaseInitRedirect()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
        
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(SandwichMaker, axios));