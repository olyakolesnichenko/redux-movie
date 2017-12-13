// Core
import { combineReducers, createStore } from 'redux';
import { routerReducer as router } from 'react-router-redux';

// Instruments
import store from './';
import ui from 'reducers/ui';
import forms from 'reducers/forms';
import auth from 'reducers/auth';
import profile from 'reducers/profile';
import posts from 'reducers/posts';
import users from 'reducers/users';
import notifications from 'reducers/notifications';

const reducer = combineReducers({
    router,
    ui,
    forms,
    auth,
    profile,
    posts,
    users,
    notifications,
});

const expectedStore = createStore(reducer);

describe('store:', () => {
    test('should have a valid state shape', () => {
        expect(store.getState()).toEqual(expectedStore.getState());
    });
});
