import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import "./style.scss"


function Sign({ titleText, btnText, linkText, linkPath, sendFunc, sendLink }) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    return (
        <section className="auth-wrapper">
            <h1 className="auth-wrapper__title">{titleText}</h1>

            <form onSubmit={(e) => sendFunc(e, { login, password }, sendLink)} className="auth-wrapper__form">
                <div className="auth-wrapper__form-item">
                    <input type="text" placeholder="Login.." onChange={(e) => setLogin(e.target.value)} required />
                </div>

                <div className="auth-wrapper__form-item">
                    <input type="password" placeholder="Password.." onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button className="auth-wrapper__form-btn" type="submit">{btnText}</button>
                <NavLink className="auth-wrapper__form-link" to={linkPath}>{linkText}</NavLink>
            </form>
        </section>
    )
}

export default Sign;