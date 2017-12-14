// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import moviesActions from 'actions/movies';

import Movie from 'components/Movie';
import Spinner from 'components/Spinner';
import Navigation from 'components/Navigation';
import Catcher from 'components/Catcher';

class Movies extends Component {
    static propTypes = {
        actions:        PropTypes.object.isRequired,
        match:          PropTypes.object.isRequired,
        moviesFetching: PropTypes.bool.isRequired,
    };
    constructor () {
        super();
        this.getMovies = ::this._getMovies;
        this.getMovieInfo = ::this._getMovieInfo;
    }
    componentWillMount () {
        this.getMovies();
    }
    componentWillReceiveProps (nextProps) {
        const type = this.props.match.params.filter;

        if (nextProps.match.params.filter !== type) {
            this.getMovies();
        }

    }
    _getMovieInfo () {
        const id = this.props.match.params.filter;

        this.props.actions.fetchFullMovie(id);

    }
    _getMovies () {
        const type = this.props.match.params.filter;

        if (type === 'my-list') {
            this.props.actions.fetchMyList();

        } if (type === 'new') {
            this.props.actions.fetchMovies('now_playing');
        } else {
            this.props.actions.fetchMovies(type);
        }

    }

    render () {
        const movies = this.props.movies.data;
        const { moviesFetching } = this.props;
        const moviesList = movies.map((movie) => <Movie key = { movie.id } { ...movie } getMovieInfo = { this.getMovieInfo } />);
        const result = movies.length > 0 ? (


            <Catcher key = '0'>
                <Spinner key = '1' spin = { moviesFetching } />,
                <Navigation key = '2' />,
                { moviesList }
            </Catcher>
        ) : (
            <div> Loading... </div>
        );

        return result;
    }
}

const mapStateToProps = ({ ui, movies }) => ({
    moviesFetching: ui.get('moviesFetching'),
    movies:         movies.toJS()
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moviesActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);