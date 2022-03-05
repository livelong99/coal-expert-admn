import React, { useEffect, useState, useRef } from 'react';
import Form from './Form';
import Ship from './Ship';
import axios from "axios";
import Order from './Order';
import OrderDt from './OrderInd';
import { CSVLink } from 'react-csv'
import { auth } from '../fConfig';

const MainS = () => {

    const [form, setForm] = useState(0);
    const [orderDet, setOrderDet] = useState(0);
    const [list, setList] = useState([]);
    const [getL, setGL] = useState(0);
    const [shpD, setShpD] = useState(0);
    const [show, setShow] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderData, setOrderData] = useState({});
    const [users, setUsers] = useState([]);
    const [ships, setShips] = useState([]);
    const csvLinkU = useRef() 
    const csvLinkS = useRef() 

    const downShip = async () => {
        if(list.length===0){
            await getList();
        }
        var arr = []
        list.forEach(el => {
           var element = {
               ID: el.id,
               Name: el.value.name,
               Quantity: el.value.quantity,
               Rate: el.value.rate,
               Quality: el.value.gnar,
               Origin: el.value.originCntry,
               Destination: el.value.destination,
               Additional_1: el.value.add1,
               Additional_2: el.value.add2,
               Link: el.value.reportLink                
           }
           arr.push(element);            
        });
        setShips(arr);
        console.log(arr);
        csvLinkS.current.link.click()
    }

    const downPhone = async () =>  {
        await axios
            .get("https://coal-expert-back.herokuapp.com/get-all-users")
            .then((response) => {
                var arr = []
                response.data.forEach((el) => {
                    var element = {
                        ID: el.id,
                        Name: el.Cname,
                        Phone: el.Contact,
                        Email: el.Email,
                        GST: el.GST,
                        TnC: el.TnC
                    }
                    arr.push(element);
                })
                setUsers(arr);
                csvLinkU.current.link.click()
            })

            
    }

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
    
    const closeOrder = () => {        
        getOrders();
        setOrderData({});
        setOrderDet(0);
    }

    const openOrder = (data) => {
        setOrderData(data);
        setOrderDet(1);
    }

    const logOut = async () => {
        await auth.signOut();
        window.location.reload();

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
                    <img src="./Images/logoIcon.svg" alt="" />
                </div>
                <div onClick={downPhone} className='download'>   
                    <p>Download Users</p>                 
                </div>
                <CSVLink 
                        data={users}
                        filename='users.csv'
                        className='hidden'
                        ref={csvLinkU}
                        target='_blank'
                    />
                <div onClick={(show===false) ? () => {setForm(1)} : null} className='primaryBtn'>
                    <p>{(show===false) ? "Add to List" : "Orders"}</p>
                </div>
                <div onClick={Navigate} className='secondaryBtn'>
                    <img src={(show===false) ? "./Images/orders.svg" : "./Images/add.svg"} alt="" />
                </div>
                <div onClick={downShip} className='download'>   
                    <p>Download Ships</p>           
                </div>
                <CSVLink 
                        data={ships}
                        filename='ships.csv'
                        className='hidden'
                        ref={csvLinkS}
                        target='_blank'
                    />
                <div style={{backgroundColor: "rgb(185, 74, 74)"}} onClick={logOut} className='download'>   
                    <p>Log out</p>           
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
                        <Order openOrder={openOrder} data={order}/>
                    )
                })}
            </div>}
            {(form===1) ? <Form shpData={shpD} closeFrm={closeFrm}/> : null}
            {(orderDet===1) ? <OrderDt data={orderData} closeOrder={closeOrder} /> : null}
        </>
    )
}

export default MainS;