// Core
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';

//import Movie from '../../components/Movie';
//import Header from '../../components/Header';
import FullMovie from '../../components/FullMovie';

import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import TweenMax from 'gsap';


export default class Wrapper extends Component {
    // static contextTypes = {
    //     apiKey:  PropTypes.string.isRequired,
    //     apiPath: PropTypes.string.isRequired,
    //     key:     PropTypes.string.isRequired
    // };
    constructor () {
        super();
        this.addToMyList = ::this._addToMyList;
        this.getMoviesList = ::this._getMoviesList;
        this.getMovieInfo = ::this._getMovieInfo;
        this.getMyList = ::this._getMyList;
        this.handleHeaderAppear = ::this._handleHeaderAppear;
        this.removeFromMyList = ::this._removeFromMyList;
        this.updateMyListIds = ::this._updateMyListIds;
    }
    state = {
        inMyListIds: [],
        movies:      [],
        myList:      true
    };
    componentWillMount () {
        this.updateMyListIds();
        this.getMoviesList();
    }
    _updateMyListIds () {
        const myMoviesList = localStorage.getItem('myMoviesList') ? JSON.parse(localStorage.getItem('myMoviesList')) : [];

        this.setState(() => ({
            inMyListIds: myMoviesList.map((elem) => elem.id)
        }));
    }
    _getMoviesList (type = 'upcoming') {
        fetch(`${this.context.apiPath}${type}${this.context.apiKey}`, {
            method: 'GET'
        })
            .then((result) => {
                if (result.status !== 200) {
                    throw new Error('Movies were not loaded.');
                }

                return result.json();
            })
            .then((data) =>
                this.setState(() => ({
                    movies: data.results,
                    myList: false
                }))
            )
            .catch(({ message }) => console.log(message));
    }
    _getMyList () {
        const myMoviesList = localStorage.getItem('myMoviesList');

        if (myMoviesList) {
            this.setState(() => ({
                movies: JSON.parse(myMoviesList),
                myList: true
            }));
        } else {
            this.setState(() => ({
                movies: [],
                myList: true
            }));
        }
    }
    _getMovieInfo (id) {
        return fetch(`${this.context.apiPath}${id}?api_key=${this.context.key}&language=en-US`, {
            method: 'GET'
        })
            .then((result) => {
                if (result.status !== 200) {
                    throw new Error('Movie were not loaded.');
                }

                return result.json();
            })
            .then((data) => {
                console.log(data);

                return data;
            })
            .catch(({ message }) => console.log(message));

    }
    _removeFromMyList (id) {
        const myMoviesList = JSON.parse(localStorage.getItem('myMoviesList'));

        const newList = myMoviesList.filter((movie) => movie.id !== id);

        localStorage.setItem('myMoviesList', JSON.stringify(newList));
        this.updateMyListIds();
        this.setState(() => ({
            movies: this.state.myList ? newList : this.state.movies
        }));
    }
    _addToMyList (id) {
        const myMoviesList = localStorage.getItem('myMoviesList')
            ? JSON.parse(localStorage.getItem('myMoviesList')) : [];

        const isExist = myMoviesList.some((elem) => elem.id === id);

        if (!isExist) {
            this._getMovieInfo(id).then((movie) => {
                myMoviesList.push(movie);
                localStorage.setItem('myMoviesList', JSON.stringify(myMoviesList));

                this.updateMyListIds();
            });
        }
    }
    _handleHeaderAppear (header) {
        TweenMax.fromTo(header, 2, { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, 0.5, '-=.3');
    }
    render () {
        const { inMyListIds, movies, myList } = this.state;

        console.log(movies);
        const moviesList = movies.map(
            ({ id, title, vote_average, poster_path }) => (
                <CSSTransition
                    appear
                    in
                    classNames = { {
                        enter:        Styles.movieEnter,
                        enterActive:  Styles.movieEnterActive,
                        appear:       Styles.movieAppear,
                        appearActive: Styles.movieAppearActive,
                        exit:         Styles.movieDelete,
                        exitActive:   Styles.movieDeleteActive
                    } }
                    key = { id }
                    timeout = { { enter: 1500, exit: 1500 } } >
                    <Movie
                        addToMyList = { this.addToMyList }
                        getMovieInfo = { this.getMovieInfo }
                        id = { id }
                        isInMyList = { inMyListIds.some((elem) => elem === id) }
                        myList = { myList }
                        posterPath = { poster_path }
                        removeFromMyList = { this.removeFromMyList }
                        title = { title }
                        voteAverage = { vote_average }
                    />
                </CSSTransition>

            ));

        console.log('rendering...');

        return (
            <section className = { Styles.wrapper }>
                <Transition
                    appear
                    in
                    timeout = { 3500 }
                    onEnter = { this.handleHeaderAppear }>
                    <Header getMoviesList = { this.getMoviesList } getMyList = { this.getMyList } />
                </Transition>
                <TransitionGroup>
                    <Switch>
                        <Route
                            exact
                            path = '/'
                            render = { () => [moviesList] }
                        />
                        <Route component = { FullMovie } path = '/:id' />
                    </Switch>
                </TransitionGroup>
            </section>
        );
    }
}
