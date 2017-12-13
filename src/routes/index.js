// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch } from 'react-router';

// Routing
import Public from './Public';

// Components
import Catcher from 'components/Catcher';

class Routes extends Component {
    render () {
        return (
            <Catcher>
                <Switch>
                    <Public />
                </Switch>
            </Catcher>
        );
    }
}

export default withRouter(connect()(Routes));
