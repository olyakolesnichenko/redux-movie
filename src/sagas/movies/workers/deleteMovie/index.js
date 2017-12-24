//core
import { put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* deleteMovieWorker ({ payload: id }) {
    try {
        yield put(uiActions.startFetchingMovies());
        let movies = [];
        const myList = localStorage.getItem('myMoviesList');

        if (!id) {
            throw new Error('id not found');
        }
        if (myList) {
            movies = JSON.parse(myList);
            const newList = movies.filter((movieItem) => movieItem.id !== id);

            localStorage.setItem('myMoviesList', JSON.stringify(newList));
            const myListIds = newList.map((elem) => elem.id);

            yield put(moviesActions.deleteMovieSuccess(newList));
            yield put(moviesActions.updateMyListIdsSuccess(myListIds));
        }
    } catch ({ message }) {
        yield put(moviesActions.deleteMovieFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
