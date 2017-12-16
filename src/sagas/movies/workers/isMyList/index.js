//core
import { put } from 'redux-saga/effects';
//Instruments
//import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* isMyListWorker ({ payload: flag }) {

    try {
        if (flag === undefined) {
            throw new Error('flag was  set');
        }
        yield put(moviesActions.isMyListSuccess(flag));

    } catch ({ message }) {
        yield put(moviesActions.isMyListFail(message));
    } finally {
        //yield put(uiActions.stopFetchingMovies());
    }


}
