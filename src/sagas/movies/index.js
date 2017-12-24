//Core
import { takeEvery } from 'redux-saga/effects';

//Instruments
import types from 'actions/movies/types';

import { fetchMoviesWorker } from './workers/fetchMovies';
import { fetchFullMovieWorker } from './workers/fetchFullMovie';
import { addMovieWorker } from './workers/addMovie';
import { deleteMovieWorker } from './workers/deleteMovie';
import { fetchMyListWorker } from './workers/fetchMyList';
import { updateMyListIdsWorker } from './workers/updateMyListIds';
import { isMyListWorker } from './workers/isMyList';

export default Object.freeze({
    * fetchMoviesWatcher () {
        yield takeEvery(types.FETCH_MOVIES, fetchMoviesWorker);
    },
    * fetchFullMovieWatcher () {
        yield takeEvery(types.FETCH_FULL_MOVIE, fetchFullMovieWorker);
    },
    * addMovieWatcher () {
        yield takeEvery(types.ADD_MOVIE, addMovieWorker);
    },
    * deleteMovieWatcher () {
        yield takeEvery(types.DELETE_MOVIE, deleteMovieWorker);
    },
    * fetchMyListWatcher () {
        yield takeEvery(types.FETCH_MY_LIST, fetchMyListWorker);
    },
    * updateMyListIdsWatcher () {
        yield takeEvery(types.UPDATE_MY_LIST_IDS, updateMyListIdsWorker);
    },
    * isMyListWatcher () {
        yield takeEvery(types.IS_MY_LIST, isMyListWorker);
    },
});
