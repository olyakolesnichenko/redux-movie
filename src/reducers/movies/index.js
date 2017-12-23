// Core
import { Map } from 'immutable';

// Instruments
import types from 'actions/movies/types';

const initialState = Map({
    data:        [],
    fullMovie:   {},
    inMyListIds: [],
    fetchMyList: [],
    isMyList:    false,
});

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_MOVIES_SUCCESS: {
            return state.merge({ data: payload });
        }
        case types.FETCH_MY_LIST_SUCCESS: {
            return state.merge({ fetchMyList: payload });
        }
        case types.FETCH_FULL_MOVIE_SUCCESS: {
            return state.set({ fullMovie: payload });
        }
        case types.UPDATE_MY_LIST_IDS_SUCCESS: {
            return state.merge({ inMyListIds: payload });
        }
        case types.IS_MY_LIST_SUCCESS: {
            return state.merge({ isMyList: payload });
        }
        case types.ADD_MOVIE_SUCCESS: {
            return state; ////????
        }
        case types.DELETE_MOVIE_SUCCESS: {
            const newList = state.isMyList ? payload : state.data;

            return state.merge({ data: newList }); ///??????
        }
        default:
            return state;
    }
};
