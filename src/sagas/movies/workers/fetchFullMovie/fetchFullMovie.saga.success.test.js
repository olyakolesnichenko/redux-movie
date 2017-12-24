//core
import { put, call } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

import moviesTypes from 'actions/movies/types';
import uiTypes from 'actions/ui/types';
//Instruments
import { fetchFullMovieWorker } from "./";
import { PATH, KEY } from 'instruments/api';

const id = 346364;
const movie = { 'id': 346364, 'title': 'It' };
const moviesActions = {
    type:  moviesTypes.FETCH_FULL_MOVIE,
    payload: {
        id: 346364,
    },
};
const saga = fetchFullMovieWorker(moviesActions);
const responseData = {
    data:    movie,
    message: 'successfull response',
};
const fetchResponse = {
    status: 200,
    json:   () => Promise.resolve(responseData),
};
global.fetch = jest.fn(() => Promise.resolve(fetchResponse));
describe('fetch full movie saga success:', () => {
    test(`should dispatch 'FETCH_FULL_MOVIE' action `, () => {
        expect(saga.next().value).toEqual(
            put({
                type: uiTypes.START_FETCHING_MOVIES
            })
        );
    });
    test(`should call a 'fetch' request `, () => {
        expect(saga.next().value).toEqual(
            call(fetch, `${PATH}${id}?api_key=${KEY}&language=en-US`, {
                method:  'GET',
            })
        );
    });
    test(`the 'fetch' request should return valid response `, () => {
        expect(saga.next(fetchResponse).value).toEqual(
            call([fetchResponse, fetchResponse.json])
        );
    });
    test(`should dispatch 'FETCH_FULL_MOVIE_SUCCESS' action`, () => {
        expect(saga.next(responseData).value).toEqual(
            put({
                type: moviesTypes.FETCH_FULL_MOVIE_SUCCESS,
                payload: responseData
            })
        );
    });
    test(`should dispatch 'FETCH_FULL_MOVIE_SUCCESS' action`, () => {
        expect(saga.next().value).toEqual(
            put({
                type: uiTypes.STOP_FETCHING_MOVIES
            })
        );
    });
    test(`saga should stop`, () => {
        expect(saga.next().done).toBe(true);
    });
});
