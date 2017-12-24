//core
import { put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* updateMyListIdsWorker () {

    try {

        const response = localStorage.getItem('myMoviesList');

        if (!response) {

            throw new Error('list not found');
        }
        const movies = JSON.parse(response);

        if (!movies) {
            throw new Error('list not found');
        }
        const myListIds = movies.map((elem) => elem.id);

        yield put(moviesActions.updateMyListIdsSuccess(myListIds));

    } catch ({ message }) {
        yield put(moviesActions.updateMyListIdsFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
