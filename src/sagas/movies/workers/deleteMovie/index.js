//core
import { put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* deleteMovieWorker ({ payload: id }) {
    try {
        let movies = [];
        const myList = localStorage.getItem('myMoviesList');

        if (!id) {
            throw new Error('id not found');
        }
        if (myList) {
            movies = JSON.parse(myList);
            console.log('myList', myList);
            console.log('movies', movies);
            const newList = movies.filter((movieItem) => movieItem.id !== id);

            console.log('newList', newList);
            localStorage.setItem('movies', JSON.stringify(newList));
            console.log('----');

            const myListIds = newList.map((elem) => elem.id);

            console.log('myListIds', myListIds);
            yield put(moviesActions.updateMyListIdsSuccess(myListIds));

            yield put(moviesActions.deleteMovieSuccess(newList));
            console.log('newList', newList);

        }
    } catch ({ message }) {
        yield put(moviesActions.deleteMovieFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
