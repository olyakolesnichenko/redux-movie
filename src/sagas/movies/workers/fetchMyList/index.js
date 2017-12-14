//core
import { call, put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* fetchMyListWorker () {

    try {
        yield put(uiActions.startFetchingMovies());

        const response = localStorage.getItem('myMoviesList');
        if (!response) {

            throw new Error('movies not found');
        }
        const movies = JSON.parse(response);

        yield put(moviesActions.fetchMyListSuccess(movies));

    } catch ({ message }) {
        yield put(moviesActions.fetchMyListFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
