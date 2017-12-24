// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.scss';

export default class FullMovie extends Component {
    static propTypes = {
        id:         PropTypes.number.isRequired,
        overview:   PropTypes.string.isRequired,
        posterPath: PropTypes.string.isRequired,
        title:      PropTypes.string.isRequired,
    };

    render () {
        const { overview, poster_path: posterPath, title } = this.props; // eslint-disable-line
        const poster = posterPath ?
            <img alt = 'poster' src = { `https://image.tmdb.org/t/p/w500/${posterPath}` } />
            : <img alt = 'poster' src = { `'../../theme/assets/no-cover.png'` } />;

        return (

            <div className = { Styles.fullmovie } >
                {poster}
                <p className = { Styles.title } >{title}</p>
                <p className = { Styles.overview } >{overview}</p>
                <Link to = '/' > {`<<Back `}</Link>
            </div>
        );
    }
}
