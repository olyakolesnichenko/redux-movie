// Core
import React, { Component } from 'react';
import { object, array } from 'prop-types';
import {
    Transition,
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles';

// Components
import Composer from 'components/Composer';
import Catcher from 'components/Catcher';
import Post from 'components/Post';
import Counter from 'components/Counter';
import Postman from 'components/Postman';

export default class Wall extends Component {
    static propTypes = {
        actions: object.isRequired,
        posts:   array.isRequired,
        profile: object.isRequired
    };

    constructor () {
        super();

        this.handlePostmanAppear = ::this._handlePostmanAppear;
        this.handlePostmanDisappear = ::this._handlePostmanDisappear;
    }

    componentDidMount () {
        this.props.actions.fetchPosts();

        this.refetch = setInterval(this.props.actions.fetchPosts, 7000);
    }

    componentWillUnmount () {
        clearInterval(this.refetch);
    }

    _handlePostmanAppear (postman) {
        fromTo(postman, 2, { x: 500, opacity: 0 }, { x: 0, opacity: 1 });
    }

    _handlePostmanDisappear (postman) {
        fromTo(postman, 2, { x: 0, opacity: 1 }, { x: 500, opacity: 0 });
    }

    render () {
        const {
            actions,
            posts: postsData,
            profile: {
                id: userId,
                firstName: userFirstName,
                lastName: userLastName
            }
        } = this.props;

        const posts = postsData.map(
            ({
                author,
                avatar,
                comment,
                created,
                firstName,
                id,
                lastName,
                likes
            }) => (
                <CSSTransition
                    classNames = { {
                        enter:       Styles.postInStart,
                        enterActive: Styles.postInEnd,
                        exit:        Styles.postOutStart,
                        exitActive:  Styles.postOutEnd
                    } }
                    key = { id }
                    timeout = { { enter: 700, exit: 600 } }>
                    <Catcher>
                        <Post
                            author = { author }
                            avatar = { avatar }
                            comment = { comment }
                            created = { created }
                            deletePost = { actions.deletePost }
                            firstName = { firstName }
                            id = { id }
                            lastName = { lastName }
                            likePost = { actions.likePost }
                            likes = { likes }
                            userFirstName = { userFirstName }
                            userId = { userId }
                            userLastName = { userLastName }
                        />
                    </Catcher>
                </CSSTransition>
            )
        );

        return (
            <section className = { Styles.wall }>
                <Composer
                    createPost = { actions.createPost }
                    profile = { this.props.profile }
                />
                <Counter count = { posts.length } />
                <TransitionGroup>{posts}</TransitionGroup>
                <Transition
                    appear
                    in
                    timeout = { 3000 }
                    onEnter = { this.handlePostmanAppear }
                    onEntered = { this.handlePostmanDisappear }>
                    <Postman profile = { this.props.profile } />
                </Transition>
            </section>
        );
    }
}
