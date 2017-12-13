// Core
import { createSelectorWithDependencies as createSelector } from 'reselect-tools';

export const getAuthenticated = createSelector(
    (auth) => auth,
    (auth) => auth.get('authenticated')
);
getAuthenticated.selectorName = 'getAuthenticated';
