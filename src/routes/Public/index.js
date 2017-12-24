//Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

//Instruments
import pages from 'routes/pages';

//Components
import Movies from 'containers/Movies';
import SingleMovie from 'containers/SingleMovie';

export default class Public extends Component {
    render () {
        return (
            <Switch>
                <Route exact component = { Movies } path = { `/movies/:filter` } />
                <Route exact component = { SingleMovie } path = { `/:id` } />
                <Redirect to = { `/movies${pages.upcoming}` } />
            </Switch>
        );
    }
}
