// Core
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

// Instruments
import ui from './ui';
import movies from './movies';

export default combineReducers({
    router,
    ui,
    movies,
});
