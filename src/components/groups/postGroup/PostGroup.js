import React, { useState } from 'react';
import axios from 'axios';

import "./style.scss"


function PostGroup({ token, setUpdateGroups }) {
    const [data, setData] = useState();

    const postGroup = () => {
        axios
            .post(`https://my-notice--backend.herokuapp.com/api/groups/post`, data, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then((response) => {
                if (response.status === 200) console.log(response);;
            }).catch((e) => console.log(e));
        setUpdateGroups(true);
    }

    return (
        <div className='item--add-form'>
            <input className='item--add-form__input' type="text" placeholder='Название группы..' onChange={(e) => setData({ "title": e.target.value })} />
            <button className='item--add-form__btn' onClick={postGroup}>Создать новую группу</button>
        </div>
    )
}

export default PostGroup;