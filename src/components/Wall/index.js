// Core
import React, { Component } from 'react';
import { object, array } from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Instruments
import Styles from './styles';

// Components
import Composer from 'components/Composer';
import Catcher from 'components/Catcher';
import Post from 'components/Post';
import Counter from 'components/Counter';

export default class Wall extends Component {
    static propTypes = {
        actions:       object.isRequired,
        notifications: array.isRequired,
        posts:         array.isRequired,
        profile:       object.isRequired,
    };

    componentDidMount () {
        this.props.actions.fetchPosts();

        this.refetch = setInterval(this.props.actions.fetchPosts, 30000);
    }

    componentWillUnmount () {
        clearInterval(this.refetch);
    }

    render () {
        const {
            actions,
            posts: postsData,
            profile: {
                id: userId,
                firstName: userFirstName,
                lastName: userLastName,
            },
        } = this.props;

        const posts = postsData.map((props) => (
            <CSSTransition
                classNames = { {
                    enter:       Styles.postInStart,
                    enterActive: Styles.postInEnd,
                    exit:        Styles.postOutStart,
                    exitActive:  Styles.postOutEnd,
                } }
                key = { props.id }
                timeout = { { enter: 700, exit: 600 } }>
                <Catcher>
                    <Post
                        { ...props }
                        deletePost = { actions.deletePost }
                        dislikePost = { actions.dislikePost }
                        likePost = { actions.likePost }
                        userFirstName = { userFirstName }
                        userId = { userId }
                        userLastName = { userLastName }
                    />
                </Catcher>
            </CSSTransition>
        ));

        return (
            <section className = { Styles.wall }>
                <Composer
                    createPost = { actions.createPost }
                    profile = { this.props.profile }
                />
                <Counter count = { posts.length } />
                <TransitionGroup>{posts}</TransitionGroup>
            </section>
        );
    }
}
