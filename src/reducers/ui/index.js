//core
import { Map } from 'immutable';
//Inst
import types from 'actions/ui/types';

const initialState = Map({
    avatarFetching:  false,
    authFetching:    false,
    feedFetching:    false,
    initialized:     false,
    passwordEditing: false,
    profileFetching: false,
    profileEditing:  false
});

export default (state = initialState, { type }) => {
    switch (type) {
        case types.INITIALIZE:
            return state.set('initialized', true);
        case types.START_FETCHING_AVATAR:
            return state.set('avatarFetching', true);
        case types.STOP_FETCHING_AVATAR:
            return state.set('avatarFetching', false);
        case types.START_FETCHING_AUTH:
            return state.set('authFetching', true);
        case types.STOP_FETCHING_AUTH:
            return state.set('authFetching', false);
        case types.START_FETCHING_FEED:
            return state.set('feedFetching', true);
        case types.STOP_FETCHING_FEED:
            return state.set('feedFetching', false);
        case types.START_EDITING_PASSWORD:
            return state.set('passwordEditing', true);
        case types.STOP_EDITING_PASSWORD:
            return state.set('passwordEditing', false);
        case types.START_FETCHING_PROFILE:
            return state.set('profileFetching', true);
        case types.STOP_FETCHING_PROFILE:
            return state.set('profileFetching', false);
        case types.START_EDITING_PROFILE:
            return state.set('profileEditing', true);
        case types.STOP_EDITING_PROFILE:
            return state.set('profileEditing', false);
        default:
            return state;
    }
};
