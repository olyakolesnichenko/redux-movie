//core
import { put } from 'redux-saga/effects';
//Instruments
//import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* isMyListWorker ({ payload: flag }) {

    try {
        if (flag) {
            throw new Error('flag not found');
        }
        yield put(moviesActions.isMyListSuccess(flag));

    } catch ({ message }) {
        yield put(moviesActions.isMyListFail(message));
    } finally {
        //yield put(uiActions.stopFetchingMovies());
    }


}
