//core
import { call, put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';

export function* addMovieWorker ({ payload: movie }) {
    try {
        yield put(uiActions.startFetchingMovies());

        const response = localStorage.getItem('myMoviesList');
        console.log('need to be a full movie1', movie);
        if (!response || !movie ) {

            throw new Error('movies not found');
        }
        const  movies = JSON.parse(response);
console.log('need to be a full movie2', movie);
        // movies.push(movie);
        // localStorage.setItem('myMoviesList', JSON.stringify(movies));


        yield put(moviesActions.addMovieSuccess(movies));

    } catch ({ message }) {
        yield put(moviesActions.addMovieFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
