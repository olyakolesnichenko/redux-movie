//Core //npm modules
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { saga } from 'sagas'; //root saga
//redux dev tool dont't work  in production
const dev = process.env.NODE_ENV === 'development'; //eslint-disable-line
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const middleware = [];
const composeEnhancers = devtools && dev ? devtools : compose;

window.compose = compose;
//Instruments //from project
import reducer from 'reducers';

const logger = createLogger({
    duration:  true,
    collapsed: true,
    diff:      true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005',
    },
});

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();//only return middleware

middleware.push(sagaMiddleware);
//middleware.push(thunk);
middleware.push(routerMiddleware(history));


if (dev) {
    middleware.push(logger);
}

// {
//     console.log('prev state', store.getState());
//     console.log('action', action);
//     next(action);
//     console.log('next state', store.getState());
// };
export { history };
export default createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(saga); //saga -> root saga
