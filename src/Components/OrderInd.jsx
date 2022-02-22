import React, { useEffect, useState } from 'react';
import axios from "axios";

const OrderDt = ({closeOrder, data}) => { 

    const [user, setUser] = useState(0);
    const [payId, setPayId] = useState((data.main.status===-1) ? "" : data.main.transactionId);

    function currencyFormat(num) {
        return '₹' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

     const verify = async () => {

        var order = {...data.main, transactionId: payId};


        const setD = await axios
          .post("https://coal-expert-back.herokuapp.com/verify-order", {
              order: order
          })
          .then((t)=>
              t.data
          )

        if(setD.status === 'ok'){
            console.log("Order Verified");
            window.location.reload();
        }
    }

    const getUser = async () => {
        console.log(data.main.UserId);
        const usr = await axios
          .get("https://coal-expert-back.herokuapp.com/get-user-info?uid=" + data.main.UserId)
          .then((t)=>
          setUser(t.data.data)
          )      
    }

    useEffect(() => {
        if(user===0){
            setUser(1);
            getUser();
        }
    })

    return(
        <div className='orderBg'>
            <div className='orderC'>
                <p className='head'>Order Details</p>
                <div onClick={closeOrder} className='closeBtn'>
                    <img src="./Images/close.svg" alt="" />
                </div>
                <div className='Det'>
                    <p className='DetHead'>User Information :</p>
                    <div className='DetCont'>
                        <p className='It'><b>Name: </b><br/> {user.Cname}</p>
                        <p className='It'><b>Phone: </b><br/> {user.Contact}</p>
                        <p className='It'><b>Email: </b><br/> {user.Email}</p>                        
                        <p className='It'><b>GSTIN: </b><br/> {user.GST}</p>
                    </div>
                </div>
                <div className='Det'>
                    <p className='DetHead'>Ship Information :</p>
                    <div className='DetCont'>
                        <p className='It'><b>Name: </b><br/> {data.main.shipData.name}</p>
                        <p className='It'><b>Origin: </b><br/> {data.main.shipData.originCntry}</p>
                        <p className='It'><b>Destination: </b><br/> {data.main.shipData.destination}</p>                        
                        <p className='It'><b>Quality: </b><br/> {data.main.shipData.gnar}</p>
                    </div>
                </div>
                <div className='Det'>
                    <p className='DetHead'>Order Information :</p>
                    <div style={{width: "100%"}} className='DetCont'>
                        <p className='It'><b>Amount: </b><br/> {currencyFormat(data.main.amount)}</p>
                        <p className='It'><b>Quantity: </b><br/> {data.main.quantity + " MT"}</p>
                        <p className='It'><b>Payment ID: </b>
                            <div style={{marginLeft: "20px"}} className='Input'>
                            <input  disabled={(data.main.status===-1 && data.mode===2) ? false : true} id="name" type="text" enable={"true"} defaultValue={(data.main.status==-1) ? (data.mode==1) ? "Unpaid" : "" : data.main.transactionId} autoComplete='off' placeholder={(data.main.status==-1) ? (data.mode==1) ? "" : "Transaction Id" : ""}/>
                            </div>
                        </p>
                    </div>
                </div>
                <div onClick={verify} className='submitBtn'>
                    <p>Proceed</p>
                </div>
            </div>
        </div>
    )
}

export default OrderDt;