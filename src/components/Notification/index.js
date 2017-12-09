// Core
import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles';

export default class Notification extends Component {
    static propTypes = {
        dissolve: func.isRequired,
        error:    object.isRequired,
        id:       string.isRequired,
    };

    constructor () {
        super();

        this.handlePostmanAppear = ::this._handlePostmanAppear;
        this.handlePostmanDisappear = ::this._handlePostmanDisappear;
    }

    componentWillUnmount () {
        const { dissolve, id } = this.props;

        dissolve(id);
    }

    _handlePostmanAppear (postman) {
        fromTo(postman, 1, { x: 500, opacity: 0 }, { x: 0, opacity: 1 });
    }

    _handlePostmanDisappear (postman) {
        const { dissolve, id } = this.props;

        fromTo(
            postman,
            2,
            { x: 0, opacity: 1 },
            {
                x:          500,
                opacity:    0,
                onComplete: () => dissolve(id),
            }
        );
    }

    render () {
        const { error } = this.props;

        return (
            <Transition
                appear
                in
                timeout = { 5000 }
                onEnter = { this.handlePostmanAppear }
                onEntered = { this.handlePostmanDisappear }>
                <section className = { Styles.notification }>
                    <h6>Error!</h6>
                    <span>{error.message}</span>
                </section>
            </Transition>
        );
    }
}
