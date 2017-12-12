//Types
import types from './types';

export default Object.freeze({
    initialize: () => ({
        type: types.INITIALIZE
    }),
    startFetchingMovies: () => ({
        type: types.START_FETCHING_MOVIES
    }),
    stopFetchingMovies: () => ({
        type: types.STOP_FETCHING_MOVIES
    }),
});
