//Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

//Instruments
import pages from 'routes/pages';

//Components
import Movies from 'containers/Movies';

export default class Public extends Component {
    render () {
        return (
            <Switch>
                <Route exact component = { Movies } path = { `/movies/:filter` } />
                <Redirect to = { `/movies${pages.upcoming}` } />
            </Switch>
        );
    }
}
