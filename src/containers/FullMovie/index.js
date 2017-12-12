// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class FullMovie extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired
    };
    static contextTypes = {
        apiPath: PropTypes.string.isRequired,
        apiKey:  PropTypes.string.isRequired,
        key:     PropTypes.string.isRequired
    };
    constructor () {
        super();
        this.getMovieInfo = ::this._getMovieInfo;
        this.setFilm = ::this._setFilm;
    }
    state = {
        movie: {}
    };
    componentWillMount () {
        const { id } = this.props.match.params;

        this.getMovieInfo(id);
    }

    _setFilm (movie) {
        this.setState({
            movie
        });
    }

    async _getMovieInfo (id) {
        const { apiPath, key } = this.context;
        //const movie = await getMovieInfo(apiPath, key, id);

        this._setFilm({});
    }

    render () {

        const { poster_path, title, overview } = this.state.movie;
        const poster = poster_path ?
            <img alt = 'poster' src = { `https://image.tmdb.org/t/p/w500/${poster_path}` } />
            : <img alt = 'poster' src = { `'../../theme/assets/no-cover.png'` } />;

        const result = title ? (
            <div className = { Styles.fullmovie } >
                { poster }
                <div>
                    <p className = { Styles.title }>{ title }</p>
                    <p className = { Styles.overview }>{ overview }</p>
                </div>
                <Link to = '/' > {`<<Back `}</Link>
            </div>
        ) : (
            <div> Loading... </div>
        );

        return result;
    }
}
