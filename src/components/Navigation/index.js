// Coret
import React, { Component } from 'react';
import { bool, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getProfile } from 'selectors/profile';
import { getAuthenticated } from 'selectors/auth';
// Instruments
import Styles from './styles';

import { bindActionCreators } from 'redux';
import pages from 'routes/pages';

import authActions from 'actions/auth';

export default class Navigation extends Component {
    static propTypes = {
    };


    constructor () {
        super();

        this.getNavigation = ::this._getNavigation;
    }

    _getNavigation () {
        //const { authenticated, profile: { firstName, avatar }} = this.props;

        return [
                <NavLink activeClassName = { Styles.active } key = '0' to = { pages.upcoming }>
                   Upcoming
                </NavLink>,
                <NavLink activeClassName = { Styles.active } key = '1' to = { pages.popular }>
                    Popular
                </NavLink>,
                <NavLink activeClassName = { Styles.active } key = '2' to = { pages.new }>
                    New
                </NavLink>,
                <NavLink activeClassName = { Styles.active } key = '3' to = { pages.myList }>
                    MyList
                </NavLink>
            ];
    }

    render () {
        const navigation = this.getNavigation();

        return <section className = { Styles.navigation }>{navigation}</section>;
    }
}
// const mapStateToProps = (state) => ({
//     authenticated: getAuthenticated(state),
//     profile:       getProfile(state)
// });
//
// const mapDispatchToProps = (dispatch) => ({
//     logout: bindActionCreators(authActions.logout, dispatch)
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
