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

import Styles from 'components/Movie/styles.scss';

class Movies extends Component {
    static propTypes = {
        actions:        PropTypes.object.isRequired,
        fetchMyList:    PropTypes.object.isRequired,
        isMyList:       PropTypes.bool.isRequired,
        match:          PropTypes.object.isRequired,
        movies:         PropTypes.object.isRequired,
        moviesFetching: PropTypes.bool.isRequired,
    };
    constructor () {
        super();
        this.addToMyList = ::this._addToMyList;
        this.getMovies = ::this._getMovies;
        this.deleteFromMyList = ::this._deleteFromMyList;
        this.updateMyListIds = ::this._updateMyListIds;
        this.addToMyList = ::this._addToMyList;
    }
    componentWillMount () {
        const type = this.props.match.params.filter;

        this.props.actions.fetchMyList();
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
    _deleteFromMyList (id) {
        this.props.actions.deleteMovie(id);
    }
    _addToMyList (id) {
        this.props.actions.addMovie(id);

    }
    _updateMyListIds () {
        this.props.actions.updateMyListIds();
    }
    render () {
        const {
            moviesFetching,
            isMyList,
            movies: { data: movies },
            fetchMyList: { fetchMyList: myList },
        } = this.props;

        const moviesList = movies.map((movie) => {
            const inList = myList ? myList.some((myMovie) => myMovie.id === movie.id) : false;

            return (
                <Movie
                    addToMyList = { this.addToMyList }
                    deleteFromMyList = { this.deleteFromMyList }
                    key = { movie.id } { ...movie }
                    id = { movie.id }
                    inList = { inList }
                    isMyList = { isMyList }
                />
            );
        });

        return (
            <Catcher>
                <Spinner spin = { moviesFetching } />
                <Navigation />
                <section className = { Styles.movieWrapper } >
                    { movies.length > 0 ? moviesList : <div> Loading... </div> }
                </section>
            </Catcher>
        );
    }
}

const mapStateToProps = ({ ui, movies }) => ({
    moviesFetching: ui.get('moviesFetching'),
    movies:         movies.toJS(),
    isMyList:       movies.get('isMyList'),
    fetchMyList:    movies.toJS(),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moviesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
