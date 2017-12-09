// Core
import React from 'react';

// Instruments
import Notification from 'components/Notification';

const Notifications = ({ notifications, dissolve }) =>
    notifications.map((notification) => (
        <Notification
            dissolve = { dissolve }
            key = { notification.id }
            { ...notification }
        />
    ));

export default Notifications;
