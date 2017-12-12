// Core
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bool, object, array } from 'prop-types';

import { bindActionCreators } from 'redux';
//Instruments
import moviesActions from 'actions/movies';
import { getMyList } from 'selectors/movies';
// Components
import Spinner from 'components/Spinner';
import Navigation from 'components/Navigation';
import Catcher from 'components/Catcher';
import List from 'components/List';

class MyList extends Component {

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
                <List actions = { actions } movies = { movies } />
            </Catcher>
        ];
    }
}

const mapStateToProps = ({ ui, movies }) => ({
    feedFetching: ui.get('feedFetching'),
    movies:        getMyList(movies)
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(feedActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);


