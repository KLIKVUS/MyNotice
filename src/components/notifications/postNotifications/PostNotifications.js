import React, { useState } from 'react';
import axios from 'axios';

import "./style.scss"


function PostNotifications({ token, setUpdateNotifications, groupId }) {
    const [data, setData] = useState({"group": groupId});

    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    now.setMilliseconds(null);
    now.setSeconds(null);
    const curDate = now.toISOString().slice(0, -1);

    const postNotifications = () => {
        axios
            .post(`https://my-notice--backend.herokuapp.com/api/notifications/post`, data, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then((response) => {
                if (response.status === 200) console.log(response);;
            }).catch((e) => console.log(e));
        setUpdateNotifications(true);
    }

    return (
        <div className='item--add-form'>
            <input className='item--add-form__input' type="text" placeholder='Title..' required onChange={(e) => setData({ ...data, "title": e.target.value })} />

            <textarea className='item--add-form__input item--add-form__inputarea' type="text" placeholder='Content..' required onChange={(e) => setData({ ...data, "content": e.target.value })} />
            <div className='item--add-form__radio'>
                <div>
                    <input type="radio" id="process" name="drone" value="" defaultChecked onChange={(e) => setData({ ...data, "type": e.target.value })} />
                    <label htmlFor="process">В процессе</label>
                </div>
                <div>
                    <input type="radio" id="success" name="drone" value="SUCCESS" onChange={(e) => setData({ ...data, "type": e.target.value })} />
                    <label htmlFor="success">Сделаное</label>
                </div>
            </div>
            <div className='item--add-form__radio'>
                <div>
                    <input type="radio" id="warning" name="drone" value="WARNING" onChange={(e) => setData({ ...data, "type": e.target.value })} />
                    <label htmlFor="warning">Проблемы</label>
                </div>
                <div>
                    <input type="radio" id="fail" name="drone" value="FAIL" onChange={(e) => setData({ ...data, "type": e.target.value })} />
                    <label htmlFor="fail">Усе плохА</label>
                </div>
            </div>

            <div className='item--add-form__date'>
                <label htmlFor="meeting-time">Запланировать время отправки на </label>
                <input type="datetime-local" id="meeting-time"
                    name="meeting-time" defaultValue={curDate}></input>
            </div>

            <button className='item--add-form__btn' onClick={postNotifications}>Создать</button>
        </div>
    )
}

export default PostNotifications;