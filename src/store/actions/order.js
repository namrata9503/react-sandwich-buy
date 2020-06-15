import  * as actionTypes from './actionTypes';

import axios from '../../axios-order';

export const purchaseSanwichSuccess = (id, orderData) =>{
    return{
        type: actionTypes.PURCHASE_SANDWICH_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}

export const purchaseSanwichFail = (error) =>{
    return{
        type: actionTypes.PURCHASE_SANDWICH_FAIL,
        error: error
    }
}

export const purchaseSanwichStart = () => {
    return{
        type: actionTypes.PURCHASE_SANDWICH_START
    }
}

export const purchaseSandwich = (orderData, token) =>{
    return dispatch => {
        dispatch(purchaseSanwichStart());
        axios.post('/orders.json?auth='+token, orderData)
        .then(resp => {
         //   console.log(resp.data);
            dispatch(purchaseSanwichSuccess(resp.data.name,orderData));
            

        }).catch(err => {
            dispatch(purchaseSanwichFail(err))
        })
    }
}

export const purchaseInitRedirect = () => {
    return{
        type: actionTypes.PURCHASE_INIT_REDIRECT
    }
}

export const fetchOrderSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START,
        
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch=> {
        dispatch(fetchOrderStart());
       const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(resp=>{
            const fetchOrders=[];
         //   console.log(resp.data);
            for(let key in resp.data){
                fetchOrders.push({
                    ...resp.data[key],
                    id:key
                })
            }
            dispatch(fetchOrderSuccess(fetchOrders));
            // this.setState({loading:false , orders:fetchOrders})
        }).catch(err=>{
            // this.setState({loading:false })
            dispatch(fetchOrderFail(err));

        })
    }
}

