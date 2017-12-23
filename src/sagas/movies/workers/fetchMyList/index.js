//core
import { put } from 'redux-saga/effects';
//Instruments
import uiActions from 'actions/ui';
import moviesActions from 'actions/movies';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export function* fetchMyListWorker () {

    try {
        yield put(uiActions.startFetchingMovies());
        let movies = [];
        const response = localStorage.getItem('myMoviesList');
console.log(response);
        if (response) {
            movies = JSON.parse(response);
            console.log(movies);
        } else {
            localStorage.setItem('myMoviesList', JSON.stringify([]));
        }
        yield put(moviesActions.fetchMoviesSuccess(movies));
        yield put(moviesActions.fetchMyListSuccess(movies));

    } catch ({ message }) {
        yield put(moviesActions.fetchMyListFail(message));
    } finally {
        yield put(uiActions.stopFetchingMovies());
    }


}
const mapStateToProps = ({ ui, movies }) => ({
    moviesFetching: ui.get('moviesFetching'),
    movies:         movies.toJS(),
    isMyList:       movies.get('isMyList'),
    fullMovie:      movies.get('fetchFullMovie'),
    myMoviesList:   movies.get('fetchMyList'),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moviesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(fetchMyListWorker);
