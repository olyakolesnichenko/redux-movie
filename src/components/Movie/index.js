// Core
import React, { Component } from 'react';
//import { string, object, number, bool } from 'prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import moviesActions from 'actions/movies';
// Instruments
import Styles from './styles.scss';

class Movie extends Component {
    static propTypes = {
        actions:          PropTypes.object.isRequired,
        moviesFetching:   PropTypes.bool.isRequired,
        overview:         PropTypes.string.isRequired,
        title:            PropTypes.string.isRequired,
        getMovieInfo:     PropTypes.func.isRequired,
        id:               PropTypes.number.isRequired,
        isExist:          PropTypes.bool.isRequired,
        isMyList:         PropTypes.bool.isRequired,
        voteAverage:      PropTypes.number.isRequired,
    };
    constructor () {
        super();
        this.addToMyList = ::this._addToMyList;
        this.getMovieInfo = ::this._getMovieInfo;
        this.isAbleToAdd = ::this._isAbleToAdd;
        this.isAbleToRemove = ::this._isAbleToRemove;
        this.removeFromMyList = ::this._removeFromMyList;
    }
    _addToMyList () {
        const { id } = this.props;
        if (!this.props.actions.isExist(id)) {
            const movie = this.props.actions.fetchFullMovie(id);
            console.log('_addToMyList_Movie', movie);
            // this.props.actions.addMovie(movie);
            // this.props.actions.updateMyListIds();
        }
    }
    _getMovieInfo () {
        const { id } = this.props;

        this.props.actions.fetchFullMovie(id);
    }
    _removeFromMyList () {
        const { id } = this.props;

        this.props.actions.deleteMovie(id);
    }
    _isAbleToRemove () {
        const { isMyList } = this.props;

        return isMyList ? (
            <span className = { Styles.cross } onClick = { this.removeFromMyList } />
        ) : null;
    }
    _isAbleToAdd () {
        const { isMyList, isExist } = this.props;

        return !isMyList && !isExist ?
            <span
                className = { Styles.heart } onClick = { this.addToMyList }
            /> : !isMyList && isExist ? <span
                className = { Styles.heartRed } onClick = { this.removeFromMyList }
            /> : null;
    }

    render () {
        const {poster_path: posterPath, title, vote_average: voteAverage} = this.props; // eslint-disable-line
        const poster = posterPath ?
            <img alt = 'poster' src = { `https://image.tmdb.org/t/p/w500/${posterPath}` } />
            : <img alt = 'poster' src = { `'../../theme/assets/no-cover.png'` } />;
        const isAbleToRemove = this.isAbleToRemove();
        const isAbleToAdd = this.isAbleToAdd();

        return (

            <div className = { Styles.movie } >
                { isAbleToRemove }
                { isAbleToAdd }

                {poster}
                <span className = { Styles.vote } >{voteAverage}</span>
                <p className = { Styles.title } >{title}</p>

            </div>
        );
    }
}

// Movie.propTypes = {
//     overview:    string.isRequired,
//     title:       string.isRequired,
//     poster_path: string // eslint-disable-line
// };


const mapStateToProps = ({ ui, movies }) => ({
    moviesFetching: ui.get('moviesFetching'),
    movies:         movies.toJS(),
    isExist:        movies.get('isExist'),
    isMyList:       movies.get('isMyList'),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moviesActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
