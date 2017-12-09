// Coret
import React, { Component } from 'react';
import { bool, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

// Instruments
import Styles from './styles';
import pages from 'routes/pages';
import authActions from 'actions/auth';
import { getAuthenticated } from 'selectors/auth';
import { getProfile } from 'selectors/profile';

class Navigation extends Component {
    static propTypes = {
        authenticated: bool.isRequired,
        logout:        func.isRequired,
        profile:       object.isRequired,
    };

    constructor () {
        super();

        this.getNavigation = ::this._getNavigation;
        this.logout = ::this._logout;
    }

    _getNavigation () {
        const { authenticated, profile: { firstName, avatar }} = this.props;

        return authenticated
            ? [
                <NavLink
                    activeClassName = { Styles.active }
                    key = '0'
                    to = { pages.profile }>
                    <img src = { avatar } />
                    {firstName}
                </NavLink>,
                <NavLink
                    activeClassName = { Styles.active }
                    key = '1'
                    to = { pages.feed }>
                      Feed
                </NavLink>,
                <button key = '2' onClick = { this.logout }>
                      Log Out
                </button>
            ]
            : [
                <NavLink
                    activeClassName = { Styles.active }
                    key = '0'
                    to = { pages.login }>
                      Log In
                </NavLink>,
                <NavLink
                    activeClassName = { Styles.active }
                    key = '1'
                    to = { pages.signUp }>
                      Sign Up
                </NavLink>
            ];
    }

    _logout () {
        this.props.logout();
    }

    render () {
        const navigation = this.getNavigation();

        return <section className = { Styles.navigation }>{navigation}</section>;
    }
}

const mapStateToProps = ({ auth, profile }) => ({
    authenticated: getAuthenticated(auth),
    profile:       getProfile(profile),
});

const mapDispatchToProps = (dispatch) => ({
    logout: bindActionCreators(authActions.logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
