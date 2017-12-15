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
        //addToMyList:      PropTypes.func.isRequired,
        getMovieInfo:     PropTypes.func.isRequired,
        id:               PropTypes.number.isRequired,
        //isInMyList:       PropTypes.bool.isRequired,
        //myList:           PropTypes.bool.isRequired,
        //posterPath:       PropTypes.string.isRequired,
        //removeFromMyList: PropTypes.func.isRequired,
        //voteAverage:      PropTypes.number.isRequired
    };
    constructor () {
        super();
        this.addToMyList = ::this._addToMyList;
        this.getMovieInfo = ::this._getMovieInfo;
        this.removeFromMyList = ::this._removeFromMyList;
    }
    _addToMyList () {
        const { id } = this.props;
        this.props.actions.addMovie(id);
    }
    _getMovieInfo () {
        const { id } = this.props;

        this.props.actions.fetchFullMovie(id);
    }
    _removeFromMyList () {
        const { id } = this.props;

        this.props.actions.deleteMovie(id);
    }
    // _getCross () {
    //     // const { userId, author: authorId } = this.props;
    //
    //     return userId === authorId ? (
    //         <span className = { Styles.cross } onClick = { this.deletePost } />
    //     ) : null;
    // }
    render () {
        const {poster_path: posterPath, title, overview, voteAverage} = this.props; // eslint-disable-line
        const poster = posterPath ?
            <img alt = 'poster' src = { `https://image.tmdb.org/t/p/w500/${posterPath}` } />
            : <img alt = 'poster' src = { `'../../theme/assets/no-cover.png'` } />;

        return (

            <div className = { Styles.movie } >
                {/*isAbleToRemove */}
                {/*isAbleToAdd */}

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
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moviesActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);