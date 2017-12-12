//core
import { Map } from 'immutable';

//Instruments
import reducer from './';
import types from 'actions/profile/types';

const initialState = Map({
    id:        '',
    groupId:   '',
    token:     '',
    created:   0,
    avatar:    '',
    firstName: '',
    lastName:  '',
    email:     ''

});

const profile = {
    firstName: 'Jack'
};
const avatar = 'https://url.io';

describe('profile reducer:', () => {
    test(`should return state by default`, () => {
        expect(reducer(initialState, { type: '' })).toEqual(initialState);
    });
    test(`should handle 'FILL_USER_PROFILE' and 'UPDATE_PROFILE_SUCCESS' actions`, () => {
        expect(
            reducer(initialState, {
                type:    types.FILL_USER_PROFILE,
                payload: profile
            })
        ).toEqual(initialState.merge(profile));
        expect(
            reducer(initialState, {
                type:    types.UPDATE_PROFILE_SUCCESS,
                payload: profile
            })
        ).toEqual(initialState.merge(profile));
    });
    test(`should handle 'UPDATE_AVATAR_SUCCESS' action`, () => {
        expect(
            reducer(initialState, {
                type:    types.UPDATE_AVATAR_SUCCESS,
                payload: avatar
            })
        ).toEqual(initialState.set('avatar', avatar));
    });
    test(`should handle 'CLEAR_USER_PROFILE' action`, () => {
        expect(
            reducer(initialState, {
                type: types.CLEAR_USER_PROFILE
            })
        ).toEqual(initialState);
    });
});
