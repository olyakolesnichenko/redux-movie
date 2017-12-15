//core
import { call, put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* deleteMovieWorker ({ payload: id }) {
    try {
        yield put(uiActions.startFetchingMovies());

        const response = yield call(localStorage.getItem('myMoviesList'));

        const { data: movies } = yield call([response, response.json]);
        if (!response) {

            throw new Error('movies not found');
        }
        const newList = movies.filter((movieItem) => movieItem.id !== id);

        localStorage.setItem('movies', JSON.stringify(newList));

        yield put(moviesActions.deleteMovieSuccess(newList));


    } catch ({ message }) {
        yield put(moviesActions.deleteMovieFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
