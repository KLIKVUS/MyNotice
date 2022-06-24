import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Auth from './auth/Auth';
import Nav from './nav/Nav';
import Groups from './groups/Groups';
import Notifications from './notifications/Notifications';

import "./style.scss"


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        function getCookie(name) {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
              ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }

        const tokenFromCookie = getCookie("token");
        let date = new Date(Date.now() + 432000e3);

        if (token && !tokenFromCookie) {
            document.cookie = `token=${JSON.stringify(token)}; path=/; expires=${date.toUTCString()}`;
        } else if (!token && tokenFromCookie) {
            setIsAuth(true);
            setToken(JSON.parse(tokenFromCookie))
            navigate("/groups/get/mygroups", { replace: true });
        }
    }, [token]);


    return (
        <React.Fragment>
            {isAuth && <Nav setIsAuth={setIsAuth} setToken={setToken} navigate={navigate} />}

            <Routes>
                <Route path='*' exact element={<Navigate to="/auth/signin" />} />

                <Route path='/auth/*' element={<Auth setIsAuth={setIsAuth} setToken={setToken} />} />
                {isAuth && <Route path='/groups/*' element={<Groups token={token} />} />}
                {isAuth && <Route path='/notifications/*' element={<Notifications token={token} />} />}
            </Routes>
        </React.Fragment>
    )
}

export default App;