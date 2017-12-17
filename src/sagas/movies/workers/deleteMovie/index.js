//core
import { put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* deleteMovieWorker ({ payload: id }) {
    try {
        yield put(uiActions.startFetchingMovies());

        const response = localStorage.getItem('myMoviesList');

        if (!response) {

            throw new Error('movies not found');
        }
        const movies = JSON.parse(response);
        const newList = movies.filter((movieItem) => movieItem.id !== id);

        localStorage.setItem('movies', JSON.stringify(newList));

        yield put(moviesActions.deleteMovieSuccess(newList));


    } catch ({ message }) {
        yield put(moviesActions.deleteMovieFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
