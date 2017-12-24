//core
import { call, put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';
import { PATH, KEY } from 'instruments/api';

export function* addMovieWorker ({ payload: id }) {

    try {
        yield put(uiActions.startFetchingMovies());
        let movies = [];
        const myList = localStorage.getItem('myMoviesList');

        if (!id) {
            throw new Error('id not found');
        }
        const response = yield call(fetch, `${PATH}${id}?api_key=${KEY}&language=en-US`, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('Movie were not loaded.');
        }
        const movie = yield call([response, response.json]);

        if (myList) {
            movies = JSON.parse(myList);
        }
        movies.push(movie);
        localStorage.setItem('myMoviesList', JSON.stringify(movies));

        yield put(moviesActions.addMovieSuccess(movies));
        const myListIds = movies.map((elem) => elem.id);

        yield put(moviesActions.updateMyListIdsSuccess(myListIds));

    } catch ({ message }) {
        yield put(moviesActions.addMovieFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
