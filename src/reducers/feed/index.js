//core
import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';

//Instruments
import types from 'actions/feed/types';

const resultInitialState = List();
const entitiesInitialState = Map({
    authors: Map(),
    posts:   Map()
});

const result =  (state = resultInitialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_POSTS_SUCCESS:
            return List(payload.result);
        case types.CREATE_POST_SUCCESS:
            return state.unshift(payload.result);
        case types.DELETE_POST_SUCCESS:
            return state.filter((id) => id !== payload);
        default:
            return state;
    }
};

const entities =  (state = entitiesInitialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_POSTS_SUCCESS:
            return fromJS(payload.entities);
        case types.CREATE_POST_SUCCESS:
            return state.mergeDeep(fromJS(payload.entities));
        case types.DELETE_POST_SUCCESS:
            return state.update('posts', (posts) => posts.delete(payload));
        case types.LIKE_POST_SUCCESS:
            return state.updateIn(
                ['posts', payload.postId, 'likes'],
                (likes) =>
                    likes.includes(payload.userId)
                        ? likes.filter((user) => user !== payload.userId)
                        :likes.unshift(payload.userId)
            );
        default:
            return state;
    }
};

export default combineReducers({
    entities,
    result

});
