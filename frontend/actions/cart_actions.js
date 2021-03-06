import * as CartAPIUtil from '../util/cart_api_util';

import { startLoadingProperties } from './property_actions';
import { openModal, closeModal } from './modal_actions';


export const RECEIVE_CART = "RECEIVE_CART";
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const ADD_BID = "ADD_BID";
export const RECEIVE_BID = "RECEIVE_BID";

const receiveCart = properties => ({
    type: RECEIVE_CART,
    properties,

});


const addItem = (property) => ({
    type: ADD_ITEM,
    property,


})

const deleteItem = property => ({
    type: DELETE_ITEM,
    property,

})

const addBid = (bidData) => ({
    type: ADD_BID,
    bidData,
})

const receiveBid = (bidData) => ({
    type: RECEIVE_BID,
    bidData,
})



export const submitBid = (propertyId, bid, offered) => (dispatch, getState) => {

    if (!offered) offered = false;

    let loggedIn = Boolean(getState().session.id);

     if (!loggedIn) {
       dispatch(openModal("signupModal", null));
     } else {
        return CartAPIUtil.updateBid(propertyId, bid, offered).then(bidData => {
            dispatch(addBid(bidData))
            return bidData;
        });
     }

    


}

export const fetchBid = (propertyId) => (dispatch) => {
    CartAPIUtil.fetchBid(propertyId).then(bidData => dispatch(addBid(bidData)))

}

export const fetchCart = () => (dispatch, getState) => {
    dispatch(startLoadingProperties());
    CartAPIUtil.fetchCart()
        .then(properties => { 
            dispatch(receiveCart(properties))
        
        
        })
    
}


export const addProperty = (propertyId, bid) => (dispatch, getState) => {

    let loggedIn = Boolean(getState().session.id)
    if (!loggedIn) {
        dispatch(openModal("signupModal", null))
    } else {
        CartAPIUtil.addItem(propertyId, bid)
            .then(property => dispatch(addItem(property)))
    }



};


export const deleteProperty = (propertyId) => (dispatch, getState) => (
    CartAPIUtil.deleteItem(propertyId)
        .then(propertyRecord => dispatch(deleteItem(propertyRecord)))

)