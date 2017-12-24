//core
import { put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* fetchMyListWorker () {

    try {
        yield put(uiActions.startFetchingMovies());
        let movies = [];
        const response = localStorage.getItem('myMoviesList');

        if (response) {
            movies = JSON.parse(response);
            console.log(movies);
        } else {
            localStorage.setItem('myMoviesList', JSON.stringify([]));
        }
        yield put(moviesActions.fetchMoviesSuccess(movies));
        yield put(moviesActions.fetchMyListSuccess(movies));

    } catch ({ message }) {
        yield put(moviesActions.fetchMyListFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
