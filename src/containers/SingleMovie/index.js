// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import moviesActions from 'actions/movies';

import FullMovie from 'components/FullMovie';
import Spinner from 'components/Spinner';
import Navigation from 'components/Navigation';
import Catcher from 'components/Catcher';

class SingleMovie extends Component {
    static propTypes = {
        actions:        PropTypes.object.isRequired,
        fullMovie:      PropTypes.object.isRequired,
        match:          PropTypes.object.isRequired,
        moviesFetching: PropTypes.bool.isRequired,
    };
    componentWillMount () {
        const { id } = this.props.match.params;

        this.props.actions.fetchFullMovie(id);
    }
    render () {
        const {
            moviesFetching,
            fullMovie: { fullMovie: movie },
        } = this.props;

        return (
            <Catcher key = '0'>
                <Spinner key = '1' spin = { moviesFetching } />
                <Navigation key = '2' />
                { movie ? <FullMovie
                    id = { movie.id }
                    overview = { movie.overview }
                    poster_path = { movie.poster_path }
                    title = { movie.title }
                /> : <div> Loading... </div> }
            </Catcher>
        );
    }
}

const mapStateToProps = ({ ui, movies }) => ({
    moviesFetching: ui.get('moviesFetching'),
    fullMovie:      movies.toJS(),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moviesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
