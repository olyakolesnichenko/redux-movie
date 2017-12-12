//Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

//Instruments
import pages from 'routes/pages';

//Components
import Wrapper from 'containers/Wrapper';
import FullMovie from 'containers/FullMovie';

export default class Public extends Component {
    render () {
        return (
            <Switch>
                <Route exact component = { Wrapper } path = { pages.upcoming } />
                <Route exact component = { Wrapper } path = { pages.popular } />
                <Route exact component = { Wrapper } path = { pages.new } />
                <Route exact component = { Wrapper } path = { pages['my-list'] } />
                <Route exact component = { FullMovie } path = { pages['full-movie'] } />
                <Redirect to = { pages.upcoming } />
            </Switch>
        );
    }
}
