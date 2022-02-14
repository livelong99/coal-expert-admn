import React, { useEffect, useState } from 'react';
import Form from './Form';
import Ship from './Ship';
import axios from "axios";
import Order from './Order';

const MainS = () => {

    const [form, setForm] = useState(0);
    const [list, setList] = useState([]);
    const [getL, setGL] = useState(0);
    const [shpD, setShpD] = useState(0);
    const [show, setShow] = useState(false);
    const [orders, setOrders] = useState([]);

    const getOrders = () => {
        const lst = axios
          .get("https://coal-expert-back.herokuapp.com/get-all-orders")
          .then((response)=>
          {
              
              console.log(response.data.data);
              setOrders(response.data.data);
          })
    }

    const getList = () => { 
        const lst = axios
          .get("https://coal-expert-back.herokuapp.com/get-ship-data")
          .then((t)=>
          {
              console.log(t.data);
              setList(t.data);
          })
    }

    const Navigate = () => {
        if(show){
            getList();
        }
        else{
            getOrders();
        }
        setShow(!show);
    }

    const editShp = (dta) => {
        setShpD(dta);
        setForm(1);
    }

    const deleteShp = async (id) => {
        const delD = await axios
          .post("https://coal-expert-back.herokuapp.com/del-ship", {
              id: id
          })
          .then((t)=>
              t.data
          )

        if(delD.status === 'ok'){
            console.log("Ship Deleted");
            getList();
        }
    }

    const verifyPayment = (data) => {

    }

    const closeFrm = () => {
        getList();
        setForm(0);
        setShpD(0);
    }

    useEffect(() => {
        // if(orders.length === 0 && getL===0){
        //     setGL(1);
        //     getOrders();
        // }
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
                <div onClick={(show===false) ? () => {setForm(1)} : null} className='primaryBtn'>
                    <p>{(show===false) ? "Add to List" : "Orders"}</p>
                </div>
                <div onClick={Navigate} className='secondaryBtn'>
                    <img src={(show===false) ? "./Images/orders.svg" : "./Images/add.svg"} alt="" />
                </div>
            </div>
            {(show===false) ? <div className='ListC'>
                {list.map((shp) => {
                    return(
                        <Ship editShp={editShp} deleteShp={deleteShp} data={shp.value}/>
                    )
                })}
            </div> : <div className='ListC'>
                {orders.map((order) => {
                    return(
                        <Order verifyPayment={verifyPayment} data={order}/>
                    )
                })}
            </div>}
            {(form===1) ? <Form shpData={shpD} closeFrm={closeFrm}/> : null}
        </>
    )
}

export default MainS;