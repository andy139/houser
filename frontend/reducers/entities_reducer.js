import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import propertiesReducer from './properties_reducer';
import filtersReducer from './filters_reducer';
import similarReducer from './similar_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    properties: propertiesReducer,
    filters: filtersReducer,
    similar: similarReducer,

});


export default entitiesReducer;