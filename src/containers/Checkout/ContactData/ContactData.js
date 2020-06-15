import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandle from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';
class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    }


    inputChanged = (event, inputIdentifier) => {

        const updateFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const updateForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updateFormElement
        })

        let formIsValid = true;
        for (let inputt in updateForm) {
            formIsValid = updateForm[inputt].valid && formIsValid
        }

        this.setState({ orderForm: updateForm, formIsValid: formIsValid });
    }
    orderHandle = (event) => {
        event.preventDefault();
     //   console.log(this.props.ingredients);
        // this.setState({ loading: true })

        const formData = {};
        for (let formIdentifier in this.state.orderForm) {
            formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId

        }

        this.props.onOrderSandwich(order, this.props.token);
        // axios.post('/orders.json', order)
        //     .then(resp => {
        //         this.setState({ loading: false });
        //         this.props.history.push('/');

        //     }).catch(err => {
        //         this.setState({ loading: false })
        //     })

        // const queryParams =[];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // const queryString= queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString

        // });
    }

    render() {

        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (<form onSubmit={this.orderHandle}>
            {formElementArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChanged(event, formElement.id)} />
            ))}
            <Button btnType="Success" clicked={this.orderHandle} disabled={!this.state.formIsValid}>ORDER NOW</Button>

        </form>);
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h1>Enter your form details here below...</h1>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.sandwichMaker.ingredients,
        price: state.sandwichMaker.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {

    return {
        onOrderSandwich: (orderData, token) => dispatch(actions.purchaseSandwich(orderData, token))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandle(ContactData, axios));