import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import "./style.scss"
import PostNotifications from '../postNotifications/PostNotifications';


function GetNotifications({ token }) {
    const params = useParams();
    const [notifications, setNotifications] = useState();
    const [updateNotifications, setUpdateNotifications] = useState(false);
    const noticeTypes = {
        "": "В процессе",
        "SUCCESS": "Сделано",
        "WARNING": "Проблемы",
        "FAIL": "Усе плохА"
    }

    useEffect(() => {
        axios
            .get(`https://my-notice--backend.herokuapp.com/api/notifications/get/${params.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then((response) => {
                if (response.status === 200) setNotifications(response.data.result);
                setUpdateNotifications(false);
            }).catch((e) => console.log(e));
    }, [updateNotifications])

    const dellNotification = (id) => {
        axios
            .delete(`https://my-notice--backend.herokuapp.com/api/notifications/dell/${params.id}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then((response) => {
                if (response.status === 200) console.log(response);
                setUpdateNotifications(true);
            }).catch((e) => console.log(e));
    }


    return (
        <section className='items-wrapper'>
            <h1 className='items-wrapper__titel'>Ваши уведомления:</h1>
            <div className='items'>
                {notifications && notifications.map((notification) => {
                    return (
                        <div key={notification.id} className='item'>
                            <h1 className='item__title'>{notification.title}</h1>
                            <p className='item__type'>Тип уведомления: {noticeTypes[notification.type]}</p>
                            <p className='item__subtitle'>Описание: {notification.content}</p>

                            <div className='item__btns'>
                                <button onClick={(e) => dellNotification(notification.id)} className={"item__dell-btn"} />
                                <button onClick={(e) => e.stopPropagation()} className={"item__edit-btn"} />
                            </div>
                        </div>
                    )
                })}

                <PostNotifications token={token} setUpdateNotifications={setUpdateNotifications} groupId={params.id} />
            </div>
        </section>
    )
}

export default GetNotifications;