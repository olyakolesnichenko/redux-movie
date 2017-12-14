//core
import { call, put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';
import { PATH, API_PATH } from 'instruments/api';
import movie from 'schema/movies';
import { normalize } from 'normalizr';

export function* fetchMoviesWorker ({ payload: type = 'upcoming' }) {
    try {
        yield put(uiActions.startFetchingMovies());
        console.log(type);
        const response = yield call(fetch, `${PATH}${type}${API_PATH}`, {
            method: 'GET'
        });
        const { results: movies } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error('Can not fetch movies');
        }

        yield put(moviesActions.fetchMoviesSuccess(movies));

    } catch ({ message }) {
        yield put(moviesActions.fetchMoviesFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
