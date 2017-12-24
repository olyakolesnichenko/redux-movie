//core
import { Map, fromJS } from 'immutable';

//Instruments
import reducer from './';
import types from 'actions/movies/types';

const initialState = Map({
    data:        [],
    fullMovie:   {},
    inMyListIds: [],
    fetchMyList: [],
    isMyList:    false,
});

const data = [];
const fullMovie = {};

describe('movies reducer:', () => {
    test(`should return state by default`, () => {
        expect(reducer(initialState, { type: '' })).toEqual(initialState);
    });
    test(`should handle 'FETCH_FULL_MOVIE_SUCCESS' action`, () => {
        expect(
            reducer(initialState, fromJS({
                type:    types.FETCH_FULL_MOVIE_SUCCESS,
                payload: fullMovie,
            }))
        ).toEqual(initialState.set('fullMovie', fullMovie));
    });
    test(`should handle 'FETCH_MOVIES_SUCCESS' action`, () => {
        expect(
            reducer(initialState, fromJS({
                type:    types.FETCH_MOVIES_SUCCESS,
                payload: data,
            }))
        ).toEqual(initialState.set('data', data));
    });
});
