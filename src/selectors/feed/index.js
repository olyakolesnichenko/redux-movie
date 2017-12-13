// Core
import { createSelectorWithDependencies as createSelector } from 'reselect-tools';

const getPostsIds = (posts) => posts.result;
const getPostsMap = (posts) => posts.entities;
const getUsersMap = (_, users) => users;

const getAuthorShape = createSelector(
    (author) => author,
    (author) => ({
        firstName: author.get('firstName'),
        lastName:  author.get('lastName'),
        avatar:    author.get('avatar'),
    })
);

getAuthorShape.selectorName = 'getAuthorShape';

const getLikesShape = createSelector(
    (state) => state.likes,
    (state) => state.users,
    (likes, users) =>
        likes.map((liker) => ({
            id:        liker,
            firstName: users.getIn([liker, 'firstName']),
            lastName:  users.getIn([liker, 'lastName']),
        }))
);

getLikesShape.selectorName = 'getLikesShape';

export const getPosts = createSelector(
    getPostsIds,
    getPostsMap,
    getUsersMap,
    (ids, posts, users) =>
        ids
            .map((id) =>
                posts
                    .get(id)
                    .merge(
                        users
                            .get(posts.getIn([id, 'author']))
                            .update((author) => getAuthorShape(author))
                    )
                    .update('likes', (likes) => getLikesShape({ likes, users }))
            )
            .toJS()
);

getPosts.selectorName = 'getPosts';

export const getUsers = createSelector(getUsersMap, (users) => users.toJS());
