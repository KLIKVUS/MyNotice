import React, { useState } from 'react';
import axios from 'axios';


function FindGroups({ token, setFoundedGroups }) {
    const [searchGroupValue, setSearchGroupValue] = useState();

    const searchGroup = () => {
        axios
            .get(`https://my-notice--backend.herokuapp.com/api/groups/getGroupsByName/${searchGroupValue}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then((response) => {
                if (response.status === 200) setFoundedGroups(response.data.result);
            }).catch((e) => console.log(e));
            setFoundedGroups("Ничего нема")
    }

    return (
        <div className='item--add-form'>
            <input className='item--add-form__input' type="text" placeholder='Название группы..' onChange={(e) => setSearchGroupValue(e.target.value)} />
            <button className='item--add-form__btn' onClick={() => searchGroup()}>Найти группу</button>
        </div>
    )
}

export default FindGroups;