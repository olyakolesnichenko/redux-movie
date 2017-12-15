// Coret
import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Instruments
import Styles from './styles';

//import { bindActionCreators } from 'redux';
import pages from 'routes/pages';


export default class Navigation extends Component {

    constructor () {
        super();

        this.getNavigation = ::this._getNavigation;
    }

    _getNavigation () {
        //const { authenticated, profile: { firstName, avatar }} = this.props;

        return [
            <NavLink activeClassName = { Styles.active } key = '0' to = { `/movies${pages.upcoming}` }>
                Upcoming
            </NavLink>,
            <NavLink activeClassName = { Styles.active } key = '1' to = { `/movies${pages.popular}` }>
                Popular
            </NavLink>,
            <NavLink activeClassName = { Styles.active } key = '2' to = { `/movies${pages.new}` }>
                New
            </NavLink>,
            <NavLink activeClassName = { Styles.active } key = '3' to = { `/movies${pages['my-list']}` } >
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
