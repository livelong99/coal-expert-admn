import React, { useState } from 'react';
import Form from './Form';
import Ship from './Ship';

const MainS = () => {

    const [form, setForm] = useState(0);

    const closeFrm = () => {
        setForm(0)
    }

    return(
        <>
            <div className='TopC'>
                <div className='logo'>
                    <img src="./Images/DummyLogo.png" alt="" />
                </div>
                <div onClick={() => {setForm(1)}} className='AddBtn'>
                    <p>Add to List</p>
                </div>
            </div>
            <div className='ListC'>
                <Ship/>
                <Ship/>
                <Ship/>
                <Ship/>
                <Ship/>
                <Ship/>
            </div>
            {(form===1) ? <Form closeFrm={closeFrm}/> : null}
        </>
    )
}

export default MainS;