import { updateObject } from '../../shared/utility';

import * as actionTypes from '../actions/actionTypes';


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}
const INGREDIIENT_PRICE = {
    salad: 0.4,
    Meat: 0.9,
    Cheese: 1.7,
    Bacon: 0.8
};

const addIngredient = ( state, action ) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIIENT_PRICE[action.ingredientName],
        building: true
    }
    return updateObject( state, updatedState );
};
const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject( state.ingredients, updatedIng );
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIIENT_PRICE[action.ingredientName],
        building: true
    }
    return updateObject( state, updatedSt );
};
const setIngredients = (state, action) => {
    return updateObject( state, {
        ingredients: {
            salad: action.ingredients.salad,
            Bacon: action.ingredients.Bacon,
            Cheese: action.ingredients.Cheese,
            Meat: action.ingredients.Meat
        },
        totalPrice: 4,
        error: false,
        building: false
    } );
};
const fetchIngredientsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state,action);
        default:
            return state;
    }
}



export default reducer;