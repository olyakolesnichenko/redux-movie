// Core
import React from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './styles.scss';

const Movie = (props) => {
    const { poster_path: posterPath, title, overview, voteAverage } = props; // eslint-disable-line
    const poster = posterPath ?
        <img alt = 'poster' src = { `https://image.tmdb.org/t/p/w500/${posterPath}` } />
        : <img alt = 'poster' src = { `'../../theme/assets/no-cover.png'` } />;

    return (

        <div className = { Styles.movie } >
                { /*isAbleToRemove */}
                { /*isAbleToAdd */ }

                { poster }
                <span className = { Styles.vote }>{ voteAverage }</span>
                <p className = { Styles.title }>{ title }</p>

        </div>
    );
};

Movie.propTypes = {
    overview:    string.isRequired,
    title:       string.isRequired,
    poster_path: string // eslint-disable-line
};

export default Movie;

