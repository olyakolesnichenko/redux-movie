//core
import { call, put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';
import movie from 'schema/movies';
import { normalize } from 'normalizr';

export function* addMovieWorker ({ payload: id }) {
    try {
        yield put(uiActions.startFetchingMovies());

        const response = yield call(localStorage.getItem('myMoviesList'));

        const { data: movies } = yield call([response, response.json]);
        if (!response) {

            throw new Error('movies not found');
        }

        const isExist = movies.some((elem) => elem.id === id);
        if (!isExist) {JSON.stringify
            this._getMovieInfo(id).then((movie) => {
                movies.push(movie);
               localStorage.setItem('myMoviesList', (movies));

               // this.updateMyListIds();
            });
        }

        yield put(moviesActions.addMovieSuccess(movies));

    } catch ({ message }) {
        yield put(moviesActions.addMovieFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
