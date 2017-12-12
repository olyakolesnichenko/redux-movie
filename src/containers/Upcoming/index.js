// Core
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bool, object, array } from 'prop-types';

import { bindActionCreators } from 'redux';
//Instruments
import feedActions from 'actions/feed';
import { getPosts } from 'selectors/feed';
// Components
import Spinner from 'components/Spinner';
import Navigation from 'components/Navigation';
import Catcher from 'components/Catcher';
import Wall from 'components/Wall';

class Upcoming extends Component {

    static propTypes = {
        actions:      object.isRequired,
        feedFetching: bool.isRequired,
        posts:        array.isRequired,
        profile:      object.isRequired
    };
    render () {
        const { feedFetching, profile, posts, actions } = this.props;

        return [
            <Spinner key = '0' spin = { feedFetching } />,
            <Navigation key = '1' />,
            <Catcher key = '2'>
                <Wall actions = { actions } posts = { posts } profile = { profile } />
            </Catcher>
        ];
    }
}

const mapStateToProps = ({ ui, profile, feed }) => ({
    feedFetching: ui.get('feedFetching'),
    profile:      profile.toJS(),
    posts:        getPosts(feed)
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(feedActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);


