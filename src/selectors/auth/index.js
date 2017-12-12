//Core
import { createSelector } from 'reselect';

export const getAuthenticated = createSelector((state) => state.auth, (auth) => auth.get('authenticated'));