// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Instruments
import Styles from './styles.scss';

export default class Movie extends Component {
    static propTypes = {
        actions:          PropTypes.object.isRequired,
        addToMyList:      PropTypes.func.isRequired,
        deleteFromMyList: PropTypes.func.isRequired,
        getMovieInfo:     PropTypes.func.isRequired,
        id:               PropTypes.number.isRequired,
        inList:           PropTypes.bool.isRequired,
        isMyList:         PropTypes.bool.isRequired,
        moviesFetching:   PropTypes.bool.isRequired,
    };
    constructor () {
        super();
        this.addToMyList = ::this._addToMyList;
        this.deleteFromMyList = ::this._deleteFromMyList;
        this.getMovieInfo = ::this._getMovieInfo;
        this.isAbleToAdd = ::this._isAbleToAdd;
        this.isAbleToRemove = ::this._isAbleToRemove;
    }
    _addToMyList () {
        const { addToMyList, id } = this.props;

        addToMyList(id);
    }
    _deleteFromMyList () {
        const { deleteFromMyList, id } = this.props;

        deleteFromMyList(id);
    }
    _getMovieInfo (id) {
        //const id = this.props.match.params;
        console.log('_getMovieInfo', id);
        this.props.actions.fetchFullMovie(id);

    }
    _isAbleToRemove () {
        const { isMyList } = this.props;

        return isMyList ? (
            <span className = { Styles.cross } onClick = { this.deleteFromMyList } />
        ) : null;
    }
    _isAbleToAdd () {
        const { isMyList, inList } = this.props;

        return !isMyList && !inList ?
            <span
                className = { Styles.heart } onClick = { this.addToMyList }
            /> : !isMyList && inList ? <span
                className = { Styles.heartRed } onClick = { this.deleteFromMyList }
            /> : null;
    }

    render () {
        const {id, poster_path: posterPath,  title, vote_average: voteAverage} = this.props; // eslint-disable-line
        const poster = posterPath ?
            <img alt = 'poster' src = { `https://image.tmdb.org/t/p/w500/${posterPath}` } />
            : <img alt = 'poster' src = { `'../../theme/assets/no-cover.png'` } />;
        const isAbleToRemove = this.isAbleToRemove();
        const isAbleToAdd = this.isAbleToAdd();

        return (

            <div className = { Styles.movie } >
                { isAbleToRemove }
                { isAbleToAdd }
                <Link to = { `/${id}` } >
                    {poster}
                    <span className = { Styles.vote } >{voteAverage}</span>
                    <p className = { Styles.title } >{title}</p>
                </Link>
            </div>
        );
    }
}
