//Core
import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, withRouter } from 'react-router';

//Instruments
import pages from 'routes/pages';
import authActions from 'actions/auth';
import moviesActions from 'actions/movies';
import uiActions from 'actions/ui';
// //Routing
 import Public from './Public';
//Components
import Catcher from 'components/Catcher';
import Loading from 'components/Loading';

class Routes extends Component {
    static propTypes = {
        history:       object.isRequired,
        initialize:    func.isRequired,
        initialized:   bool.isRequired,
        location:      object.isRequired
    };
    componentDidMount () {
        const { history, location, initialize } = this.props;
       // const token = localStorage.getItem('token');

       // token ? login({ token }) : initialize();

        if (true) {
            if (location.pathname === pages.profile) {
                return;
            }
            history.replace(pages.upcoming);
        }
    }
    componentWillReceiveProps ({
        initialized,
        history,
        location
    }) {
        if ( !initialized) {
            this.props.initialize();
        }


    }
    render () {
        const { initialized } = this.props;

        return initialized ? (
            <Catcher>
                <Switch>
                    <Public />
                </Switch>
            </Catcher>
        ) : (
            <Loading />
        );
    }
}

const mapStateToProps = ({ ui }) => ({
    initialized:   ui.get('initialized')
});


const { initialize } = uiActions;
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ initialize }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
