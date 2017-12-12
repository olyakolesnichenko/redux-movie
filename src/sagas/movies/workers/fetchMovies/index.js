//core
import { call, put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';
import { apiPath, apiKey } from 'instruments/api';
import movie from 'schema/movies';
import { normalize } from 'normalizr';

export function* fetchMoviesWorker ({ payload: type }) {
    try {
        yield put(uiActions.startFetchingMovies());

        const response = yield call(fetch, `${apiPath}${type}${apiKey}`, {
            method:  'GET'
        });
        const { data: movies, message } = yield call([response, response.json]);

        if (response.status !== 200) {

            throw new Error(message);
        }
        console.log('movies', movies);

        const normalizedMovies = normalize(movies, [movie]);
        console.log('normalizedMovies', normalizedMovies);

        yield put(moviesActions.fetchMoviesSuccess(normalizedMovies));

    } catch ({ message }) {
        yield put(moviesActions.fetchMoviesFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
