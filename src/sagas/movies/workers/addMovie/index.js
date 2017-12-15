//core
import { call, put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* addMovieWorker ({ payload: movie }) {
    try {
        yield put(uiActions.startFetchingMovies());

        const response = yield call(localStorage.getItem('myMoviesList'));

        const { data: movies } = yield call([response, response.json]);
        if (!response) {

            throw new Error('movies not found');
        }

        movies.push(movie);
        localStorage.setItem('myMoviesList', movies);


        yield put(moviesActions.addMovieSuccess(movies));

    } catch ({ message }) {
        yield put(moviesActions.addMovieFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
