//core
import { call, put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* addMovieWorker ({ payload: movie }) {
    try {
        yield put(uiActions.startFetchingMovies());

        const response = localStorage.getItem('myMoviesList');

        if (!movie.id) {
            throw new Error('movie not found');
        }
        if (response) {
            const movies = JSON.parse(response);

            movies.push(movie);
            localStorage.setItem('myMoviesList', JSON.stringify(movies));
        } else {
            const movies = [];

            movies.push(movie);
            localStorage.setItem('myMoviesList', JSON.stringify(movies));
        }
        const  movies = JSON.parse(response);

        yield put(moviesActions.addMovieSuccess(movies));

    } catch ({ message }) {
        yield put(moviesActions.addMovieFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
