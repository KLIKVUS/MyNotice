import React from 'react';
import { NavLink } from 'react-router-dom';

import "./style.scss"


function Nav({ setIsAuth, setToken, navigate }) {
    const logout = () => {
        document.cookie = `token=; exprices=; max-age=-1`;
        setIsAuth(false);
        setToken();
        navigate("/auth/signin", { replace: true });
    }


    return (
        <nav className='nav'>
            <NavLink to={"/groups/get/mygroups"} className="nav__link">Мои группы</NavLink>
            <NavLink to={"/groups/get/signedgroups"} className="nav__link">Мои подписки</NavLink>
            <button onClick={logout} className="nav__link--mark">Выйти</button>
        </nav>
    )
}

export default Nav;