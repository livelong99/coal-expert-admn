import React, { useEffect, useState } from 'react';
import Form from './Form';
import Ship from './Ship';
import axios from "axios";

const MainS = () => {

    const [form, setForm] = useState(0);
    const [list, setList] = useState([]);
    const [getL, setGL] = useState(0);
    const [shpD, setShpD] = useState(0);

    const getList = () => {
        const lst = axios
          .get("https://coal-expert-back.herokuapp.com/get-ship-data")
          .then((t)=>
          {
              console.log(t.data);
              setList(t.data);
          })
    }

    const editShp = (dta) => {
        setShpD(dta);
        setForm(1);
    }

    const closeFrm = () => {
        setForm(0);
        setShpD(0);
    }

    useEffect(() => {
        if(list.length === 0 && getL===0){
            setGL(1);
            getList();
        }
    })

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
                {list.map((shp) => {
                    return(
                        <Ship editShp={editShp} data={shp.value}/>
                    )
                })}
            </div>
            {(form===1) ? <Form shpData={shpD} closeFrm={closeFrm}/> : null}
        </>
    )
}

export default MainS;