// Core
import { Map } from 'immutable';

// Instruments
import types from 'actions/ui/types';

const initialState = Map({
    initialized:     false,
    authFetching:    false,
    feedFetching:    false,
    profileFetching: false,
    avatarFetching:  false,
    profileEditing:  false,
    passwordEditing: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.INITIALIZE:
            return state.set('initialized', true);

        case types.START_AUTH_FETCHING:
            return state.set('authFetching', true);

        case types.STOP_AUTH_FETCHING:
            return state.set('authFetching', false);

        case types.START_FEED_FETCHING:
            return state.set('feedFetching', true);

        case types.STOP_FEED_FETCHING:
            return state.set('feedFetching', false);

        case types.START_PROFILE_FETCHING:
            return state.set('profileFetching', true);

        case types.STOP_PROFILE_FETCHING:
            return state.set('profileFetching', false);

        case types.START_AVATAR_FETCHING:
            return state.set('avatarFetching', true);

        case types.STOP_AVATAR_FETCHING:
            return state.set('avatarFetching', false);

        case types.START_PROFILE_EDITING:
            return state.set('profileEditing', true);

        case types.STOP_PROFILE_EDITING:
            return state.set('profileEditing', false);

        case types.START_PASSWORD_EDITING:
            return state.set('passwordEditing', true);

        case types.STOP_PASSWORD_EDITING:
            return state.set('passwordEditing', false);
        default:
            return state;
    }
};
