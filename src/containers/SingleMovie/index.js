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

class SingleMovie extends Component {
    static propTypes = {
        moviesFetching: PropTypes.bool.isRequired
    };
    constructor () {
        super();
        this.getMovieInfo = ::this._getMovieInfo;
    }
    componentWillMount () {
        this.getMovieInfo();
    }

    _getMovies () {
        this.props.actions.fetchFullMovie();
    }

    render () {
        const id = this.props.movies.data;
        const { moviesFetching } = this.props;
        const moviesList = movies.map((movie) => <Movie key = { movie.id } { ...movie } />);
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