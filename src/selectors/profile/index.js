// Core
import { createSelectorWithDependencies as createSelector } from 'reselect-tools';

export const getProfile = createSelector(
    (profile) => profile,
    (profile) => profile.toJS()
);
