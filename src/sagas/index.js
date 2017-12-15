//Core
import { all } from 'redux-saga/effects';

//Instruments
import movies from './movies';

export function* saga () {
    yield all([
        movies.addMovieWatcher(),
        movies.deleteMovieWatcher(),
        movies.fetchFullMovieWatcher(),
        movies.fetchMoviesWatcher(),
        movies.fetchMyListWatcher(),
        movies.updateMyListIdsWatcher(),
        movies.isMyListWatcher(),
        movies.isExistWatcher()
    ]);
}
