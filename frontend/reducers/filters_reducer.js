import { UPDATE_FILTER, SORT_FILTER } from '../actions/filter_actions';

const defaultFilters = Object.freeze({

});


const filtersReducer = (state = defaultFilters, action) => {
    
    switch (action.type) {
     

        case UPDATE_FILTER:

            const newFilter = {
                [action.filter]: action.value
            };


            if (action.filter === "primary_filter"){
                return newFilter
            }  else if (action.filter === "page_filter") {
                let newState = Object.assign({}, state, newFilter);
                return newState;
            } else {
                let newState = Object.assign({}, state, newFilter);
                newState.page_filter = null;
                newState.primary_filter = 0;
                return newState;
            }


        case SORT_FILTER:

            const sortFilter = {
                [action.filter]: action.value
            };

            return Object.assign({}, state, sortFilter)

        default:
            return state;
    }

}

export default filtersReducer;