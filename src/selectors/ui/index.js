// Core
import { createSelector } from 'reselect';

const getUi = (ui) => ui;

export const getInitialized = createSelector(getUi, (ui) =>
    ui.get('initialized')
);

export const getAuthFetching = createSelector(getUi, (ui) =>
    ui.get('authFetching')
);

export const getFeedFetching = createSelector(getUi, (ui) =>
    ui.get('feedFetching')
);

export const getProfileFetching = createSelector(getUi, (ui) =>
    ui.get('profileFetching')
);

export const getProfileEditing = createSelector(getUi, (ui) =>
    ui.get('profileEditing')
);

export const getPasswordEditing = createSelector(getUi, (ui) =>
    ui.get('passwordEditing')
);

export const getAvatarFetching = createSelector(getUi, (ui) =>
    ui.get('avatarFetching')
);
