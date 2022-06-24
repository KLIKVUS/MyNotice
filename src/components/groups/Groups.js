import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import GetGroups from './getGroups/GetGroups';


function Groups({ token }) {
    return (
        <Routes>
            <Route path='/'>
                <Route path='*' element={<Navigate to={"/groups/get/mygroups"} />} />
                <Route path='get/*' element={<GetGroups token={token} />} />
            </Route>
        </Routes>
    )
}

export default Groups;