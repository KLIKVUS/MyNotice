import React from 'react';
import { Routes, Route } from 'react-router-dom';

import GetNotifications from './getNotifications/GetNotifications';

import "./style.scss"


function Notifications({ token }) {
    return (
        <Routes>
            <Route path='/'>
                <Route path='get/:id' element={<GetNotifications token={token} />} />
            </Route>
        </Routes>
    )
}

export default Notifications;