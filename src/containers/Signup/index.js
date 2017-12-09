// Core
import React, { Component } from 'react';

// Components
import Notifications from 'components/Notifications';
import Spinner from 'components/Spinner';
import Navigation from 'components/Navigation';
import Catcher from 'components/Catcher';
import SignupForm from 'components/Forms/Signup';

export default class Signup extends Component {
    render () {
        return [
            <Notifications key = '0' />,
            <Spinner key = '1' />,
            <Navigation key = '2' />,
            <Catcher key = '3'>
                <SignupForm />
            </Catcher>
        ];
    }
}
