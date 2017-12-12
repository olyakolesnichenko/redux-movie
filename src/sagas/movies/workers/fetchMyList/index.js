//core
import { call, put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';
import movie from 'schema/movies';
import { normalize } from 'normalizr';

export function* fetchMyListWorker () {

    try {
        yield put(uiActions.startFetchingMovies());

        const response = yield call(localStorage.getItem('myMoviesList'));
        const { data: movies } = yield call([response, response.json]);

        if (!response) {

            throw new Error('movies not found');
        }
        console.log('movies', movies);

        const normalizedMovies = normalize(movies, [movie]);
        console.log('normalizedMovies', normalizedMovies);

        yield put(moviesActions.fetchMyListSuccess(normalizedMovies));

    } catch ({ message }) {
        yield put(moviesActions.fetchMyListFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }

}
