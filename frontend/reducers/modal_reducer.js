import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal_actions";
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'

const initialState = {
    modal: "",
    data: ""
};

const modalReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = state;

    switch (action.type) {
        case OPEN_MODAL:

            return Object.assign({}, state, {
                modal: action.modal,
                data: action.data
            });
        case CLOSE_MODAL:
            nextState = "";
            return nextState;
        case RECEIVE_CURRENT_USER:
            nextState = "";
            return nextState;
        default:
            return state;
    }
};

export default modalReducer;