//core
import { call, put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';
import { PATH, KEY } from 'instruments/api';

export function* fetchFullMovieWorker ({ payload: id }) {

    try {
        yield put(uiActions.startFetchingMovies());

        const response = yield call(fetch, `${PATH}${id}?api_key=${KEY}&language=en-US`, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('Movie were not loaded.');
        }
        const movie = yield call([response, response.json]);

        yield put(moviesActions.fetchFullMovieSuccess(movie));

    } catch ({ message }) {
        yield put(moviesActions.fetchFullMovieFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
