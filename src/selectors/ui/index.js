// Core
import { createSelector } from 'reselect';

const getUi = (ui) => ui;

export const getInitialized = createSelector(getUi, (ui) =>
    ui.get('initialized')
);

