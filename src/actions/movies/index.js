//Types
import types from './types';

export default Object.freeze({
    fetchMovies: (type) => ({
        type:    types.FETCH_MOVIES,
        payload: type,
    }),
    fetchMoviesSuccess: (movies) => ({
        type:    types.FETCH_MOVIES_SUCCESS,
        payload: movies,
    }),
    fetchMoviesFail: (message) => ({
        type:    types.FETCH_MOVIES_FAIL,
        payload: message,
    }),
    fetchFullMovie: (id) => ({
        type:    types.FETCH_FULL_MOVIE,
        payload: id,
    }),
    fetchFullMovieSuccess: (movie) => ({
        type:    types.FETCH_FULL_MOVIE_SUCCESS,
        payload: movie,
    }),
    fetchFullMovieFail: (message) => ({
        type:    types.FETCH_FULL_MOVIE_FAIL,
        payload: message,
    }),
    addMovie: (id) => ({
        type:    types.ADD_MOVIE,
        payload: id,
    }),
    addMovieSuccess: (movie) => ({
        type:    types.ADD_MOVIE_SUCCESS,
        payload: movie,
    }),
    addMovieFail: (message) => ({
        type:    types.ADD_MOVIE_FAIL,
        payload: message,
    }),
    deleteMovie: (id) => ({
        type:    types.DELETE_MOVIE,
        payload: id,
    }),
    deleteMovieSuccess: (movies) => ({
        type:    types.DELETE_MOVIE_SUCCESS,
        payload: movies,
    }),
    deleteMovieFail: (message) => ({
        type:    types.DELETE_MOVIE_FAIL,
        payload: message,
    }),
    fetchMyList: () => ({
        type: types.FETCH_MY_LIST,
    }),
    fetchMyListSuccess: (movies) => ({
        type:    types.FETCH_MY_LIST_SUCCESS,
        payload: movies,
    }),
    fetchMyListFail: (message) => ({
        type:    types.FETCH_MY_LIST_FAIL,
        payload: message,
    }),
    updateMyListIds: () => ({
        type: types.UPDATE_MY_LIST_IDS,
    }),
    updateMyListIdsSuccess: (ids) => ({
        type:    types.UPDATE_MY_LIST_IDS_SUCCESS,
        payload: ids,
    }),
    updateMyListIdsFail: (message) => ({
        type:    types.UPDATE_MY_LIST_IDS_FAIL,
        payload: message,
    }),
    isMyList: (flag) => ({
        type:    types.IS_MY_LIST,
        payload: flag,
    }),
    isMyListSuccess: (flag) => ({
        type:    types.IS_MY_LIST_SUCCESS,
        payload: flag,
    }),
    isMyListFail: (message) => ({
        type:    types.IS_MY_LIST_FAIL,
        payload: message,
    }),
    isExist: (id) => ({
        type:    types.IS_EXIST,
        payload: id,
    }),
    isExistSuccess: (flag) => ({
        type:    types.IS_EXIST_SUCCESS,
        payload: flag,
    }),
    isExistFail: (message) => ({
        type:    types.IS_EXIST_FAIL,
        payload: message,
    }),
});
