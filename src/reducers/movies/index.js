// Core
import { Map } from 'immutable';

// Instruments
import types from 'actions/movies/types';

const initialState = Map({
    data:        [],
    inMyListIds: [],
    myList:      true
});

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_MOVIES_SUCCESS: {
            return state.merge({ data: payload });
        }
        case types.FETCH_MY_LIST_SUCCESS: {
            return state.merge({ data: payload });
        }
        case types.FETCH_FULL_MOVIE_SUCCESS: {
            return state.merge({ data: payload });
        }
        default:
            return state;
    }
};
