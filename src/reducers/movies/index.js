// Core
import { Map } from 'immutable';

// Instruments
import types from 'actions/movies/types';

const initialState = Map({
    data: [],
});

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_MOVIES_SUCCESS: {
            return state.merge({ data: payload });
        }

        default:
            return state;
    }
};
