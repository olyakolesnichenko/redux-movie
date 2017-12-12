//Core
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
//Instruments
import movies from './movies';
import ui from './ui';

export default combineReducers({
    movies,
    router,
    ui
});
