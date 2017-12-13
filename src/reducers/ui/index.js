// Core
import { Map } from 'immutable';

// Instruments
import types from 'actions/ui/types';

const initialState = Map({
    initialized:     false,
    moviesFetching:  false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.INITIALIZE:
            return state.set('initialized', true);

        case types.START_FETCHING_MOVIES:
            return state.set('moviesFetching', true);

        case types.STOP_FETCHING_MOVIES:
            return state.set('moviesFetching', false);

        default:
            return state;
    }
};
