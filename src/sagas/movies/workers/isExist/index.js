//core
import { put } from 'redux-saga/effects';
//Instruments
//import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* isExistWorker ({ payload: id }) {

    try {
        const response = localStorage.getItem('myMoviesList');

        if (!response) {

            throw new Error('list not found');
        }
        const movies = JSON.parse(response);
        const isExist = movies.some((elem) => elem.id === id);

        yield put(moviesActions.isMyListSuccess(isExist));

    } catch ({ message }) {
        yield put(moviesActions.isMyListFail(message));
    } finally {
        //yield put(uiActions.stopFetchingMovies());
    }


}
