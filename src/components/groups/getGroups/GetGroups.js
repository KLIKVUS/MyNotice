import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import PostGroup from '../postGroup/PostGroup';
import FindGroups from '../FindGroups';

import "./style.scss"


function GetGroups({ token }) {
    const [groups, setGroups] = useState();
    const [updateGroups, setUpdateGroups] = useState(false);

    const [foundedGroups, setFoundedGroups] = useState();

    useEffect(() => {
        axios
            .get("https://my-notice--backend.herokuapp.com/api/groups/get", {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then((response) => {
                if (response.status === 200) setGroups(response.data.result);
                setUpdateGroups(false);
            }).catch((e) => {console.log(e); setGroups()});
    }, [updateGroups, token])

    const dellGroup = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        axios
            .delete(`https://my-notice--backend.herokuapp.com/api/groups/dell/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(() => {
                setUpdateGroups(true);
            }).catch((e) => console.log(e));
    }

    const MygroupsRender = () => {
        return (
            <React.Fragment>
                <h1 className='items-wrapper__titel'>Создать группу:</h1>
                <PostGroup token={token} setUpdateGroups={setUpdateGroups} />

                <h1 className='items-wrapper__titel'>Ваши группы:</h1>
                {!groups && <p align="center">Сейчас тут пусто :(</p>}
                <div className='items'>
                    {groups && groups.owns.map((group) => {
                        return (
                            <NavLink key={group._id} to={`/notifications/get/${group._id}`} className='item'>
                                <h1 className='item__title'>{group.title}</h1>
                                <p className='item__subs-count'>{group.subscribers} подписчиков</p>

                                <div className='item__btns'>
                                    <button onClick={(e) => dellGroup(e, group._id)} className={"item__dell-btn"} />
                                    {/* <button onClick={(e) => e.stopPropagation()} className={"item__edit-btn"} /> */}
                                </div>
                            </NavLink>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }

    const SignedgroupsRender = () => {
        return (
            <React.Fragment>
                <h1 className='items-wrapper__titel'>Найти группу:</h1>
                <p align="center">Для проверки можно ввести HELLO</p>
                <p align="center">И я уже усталь это делать. Поэтому если смогу, то в сб или вск доделац</p>
                <FindGroups token={token} setFoundedGroups={setFoundedGroups} />
                <div className='items'>
                    {foundedGroups && foundedGroups.map((group) => {
                        return (
                            <NavLink key={group._id} to={`/notifications/get/${group._id}`} className='item'>
                                <h1 className='item__title'>{group.title}</h1>
                                <p className='item__subs-count'>{group.subscribers} подписоты</p>
                            </NavLink>
                        )
                    })}
                </div>

                <h1 className='items-wrapper__titel'>Ваши подписки:</h1>
                {!groups && <p align="center">Сейчас тут пусто :(</p>}
                <div className='items'>
                    {groups && groups.signed.map((group) => {
                        return (
                            <NavLink key={group._id} to={`/notifications/get/${group._id}`} className='item'>
                                <h1 className='item__title'>{group.title}</h1>
                                <p className='item__subs-count'>{group.subscribers} подписоты</p>
                            </NavLink>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }


    return (
        <section className='items-wrapper'>
            <Routes>
                <Route path='mygroups' element={<MygroupsRender />} />
                <Route path='signedgroups' element={<SignedgroupsRender />} />
            </Routes>
        </section>
    )
}

export default GetGroups;