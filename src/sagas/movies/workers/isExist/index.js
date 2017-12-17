//core
import { put } from 'redux-saga/effects';
//Instruments
//import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* isExistWorker ({ payload: id }) {

    try {
        const response = localStorage.getItem('myMoviesList');

        let isExist= false;

        if (response) {
            const movies = JSON.parse(response);

            isExist = movies.some((elem) => elem.id === id);
        } else {
            localStorage.setItem('myMoviesList', JSON.stringify([]));
        }
        yield put(moviesActions.isMyListSuccess(isExist));

    } catch ({ message }) {
        yield put(moviesActions.isMyListFail(message));
    } finally {
        //yield put(uiActions.stopFetchingMovies());
    }


}
