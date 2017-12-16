// Core
import React, { Component } from 'react';
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
        isExist:        PropTypes.bool.isRequired,
        isMyList:       PropTypes.bool.isRequired,
        match:          PropTypes.object.isRequired,
        movies:         PropTypes.object.isRequired,
        moviesFetching: PropTypes.bool.isRequired,
    };
    constructor () {
        super();
        this.addToMyList = ::this._addToMyList;
        this.getMovies = ::this._getMovies;
        this.getMovieInfo = ::this._getMovieInfo;
        this.removeFromMyList = ::this._removeFromMyList;
        this.updateMyListIds = ::this._updateMyListIds;
    }
    componentWillMount () {
        const type = this.props.match.params.filter;
        this.updateMyListIds();
        this.getMovies(type);
    }
    componentWillReceiveProps (nextProps) {
        const type = this.props.match.params.filter;

        if (nextProps.match.params.filter !== type) {
            const filter = nextProps.match.params.filter;

            this.getMovies(filter);
        }
    }
    _getMovieInfo () {
        const id = this.props.match.params.filter;

        this.props.actions.fetchFullMovie(id);

    }
    _getMovies (type) {
        if (type === 'my-list') {
            this.props.actions.fetchMyList();
            this.props.actions.isMyList(true);
        } else if (type === 'new') {
            this.props.actions.fetchMovies('now_playing');
            this.props.actions.isMyList(false);
        } else {
            this.props.actions.fetchMovies(type);
            this.props.actions.isMyList(false);
        }

    }
    _removeFromMyList (id) {
        this.props.actions.deleteMovie(id);
        this.props.actions.updateMyListIds();
    }
    _addToMyList (id) {
        if (this.props.actions.isExist(id)) {
            const movie = this.props.actions.fetchFullMovie(id);

            this.props.actions.addMovie(movie);
            this.props.actions.updateMyListIds();
        }
    }
    _updateMyListIds () {
        this.props.actions.updateMyListIds();
    }
    render () {
        const movies = this.props.movies.data;
        const { moviesFetching, isExist, isMyList } = this.props;
        const moviesList = movies.map((movie) => <Movie key = { movie.id } { ...movie }
                                                        getMovieInfo = { this.getMovieInfo }
                                                        isExist = { isExist }
                                                        isMyList = { isMyList }
                                                    />);
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
    movies:         movies.toJS(),
    isExist:        movies.get('isExist'),
    isMyList:       movies.get('isMyList'),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moviesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
