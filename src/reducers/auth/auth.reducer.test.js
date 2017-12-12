//core
import { Map } from 'immutable';

//Instruments
import reducer from './';
import types from 'actions/auth/types';

const initialState = Map({
    authenticated: false
});


describe('auth reducers:', () => {
    test(`'LOGIN_SUCCESS' `, () => {
        expect(
            reducer(initialState, {
                type:    types.LOGIN_SUCCESS
            })
        ).toMatchSnapshot();
    });
    test(`'SIGNUP_SUCCESS' `, () => {
        expect(
            reducer(initialState, {
                type:    types.SIGNUP_SUCCESS
            })
        ).toMatchSnapshot();
    });
    test(`'LOGOUT_SUCCESS' `, () => {
        expect(
            reducer(initialState, {
                type:    types.LOGOUT_SUCCESS
            })
        ).toMatchSnapshot();
    });
    test(`'default ' `, () => {
        expect(
            reducer(initialState, {
                type:    ''
            })
        ).toMatchSnapshot();
    });

});
