
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
//import * as actions from '../../store/actions/index';
class Checkout extends Component {

    // componentWillMount(){
    //     this.props.onPurchaseRedirect();
    // }



    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1];

    //         }
    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: price });
    // }
    checkoutCancelHandle = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandle = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {

        let summery = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summery = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummery ingredients={this.props.ings}
                        checkoutCancel={this.checkoutCancelHandle}
                        checkoutContinue={this.checkoutContinueHandle}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summery;
    }
}
const mapStateToProps = state => {
    return {
        ings: state.sandwichMaker.ingredients,
        purchased: state.order.purchased
    };
}

// const mapDispatchToProps = dispatch => {
//     return{
//         onPurchaseRedirect : () => dispatch(actions.purchaseInitRedirect())
//     };
// }
export default connect(mapStateToProps)(Checkout);