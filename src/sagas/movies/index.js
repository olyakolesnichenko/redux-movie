//Core
import { takeEvery } from 'redux-saga/effects';

//Instruments
import types from 'actions/movies/types';

import { fetchMoviesWorker } from './workers/fetchMovies';
import { addMovieWorker } from './workers/addMovie';
import { deleteMovieWorker } from './workers/deleteMovie';
import { fetchMyListWorker } from './workers/fetchMyList';

export default Object.freeze({
    * fetchMoviesWatcher () {
        yield takeEvery(types.FETCH_MOVIES, fetchMoviesWorker);
    },
    * addMovieWatcher () {
        yield takeEvery(types.ADD_MOVIE, addMovieWorker);
    },
    * deleteMovieWatcher () {
        yield takeEvery(types.DELETE_MOVIE, deleteMovieWorker);
    },
    * fetchMyListWatcher () {
        yield takeEvery(types.FETCH_MY_LIST, fetchMyListWorker);
    }
});
