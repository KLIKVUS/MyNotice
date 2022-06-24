import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sign from './sign/Sign';

import "./style.scss"


function Auth({ setIsAuth, setToken }) {
    const navigate = useNavigate();

    const onSubmitBtnClick = (e, data, path) => {
        e.preventDefault();

        axios
            .post(`https://my-notice--backend.herokuapp.com/api${path}`, data)
            .then((response) => {
                if (response.status === 200) {
                    setIsAuth(true);
                    setToken(response.data.result.token);
                    navigate("/groups/get/mygroups", { replace: true });
                }
            }).catch((e) => console.log(e));
    };

    return (
        // <div className="wrapper">
        <div className="logo-wrapper">
            <section className="logo">
                <h1 className="logo__title">My <span>Notice</span></h1>
                <p className="logo__text">Просто создавай свои уведомления и делись ими.</p>
            </section>

            <Routes>
                <Route path='/'>
                    <Route path='*' element={<Navigate to={"/signin"} />} />

                    <Route path='signin' element={<Sign titleText="Авторизация" btnText="Войти" linkText="Создать аккаунт." linkPath="/auth/signup" sendFunc={onSubmitBtnClick} sendLink={"/auth/signin"} />} />
                    <Route path='signup' element={<Sign titleText="Регистрация" btnText="Создать" linkText="Войти в аккаунт." linkPath="/auth/signin" sendFunc={onSubmitBtnClick} sendLink={"/auth/signin"} />} />
                </Route>
            </Routes>
        </div>
        // </div >
    )
}

export default Auth;