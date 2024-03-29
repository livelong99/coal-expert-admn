import React from 'react';

const Order = ({openOrder, data}) => {

    function currencyFormat(num) {
        return '₹' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

    return(
        <div className='orderCont'>
            <div className='idC longIdc'>
                <p>{data.orderId}</p>
            </div>
            <div className='orderStatusImg'>
                <img src={(data.status == -1) ? "./Images/paymentWait.svg" : (data.status == 0) ? "./Images/orderWait.svg" : "./Images/orderSuccess.svg"} alt="" />
            </div>
            <br />
            <br />
            <div className='orderItList'>
                <div className='listItem'><img className='icon' src="./Images/ship.svg" alt="" /></div>
                <div className='listItem'><p>{data.shipData.name}</p></div>
                <div className='listItem dot'/>
                <div className='listItem'><p>{"#" +data.shipData.id}</p></div>
                <div className='listItem dot'/><div className='listItem'><p>{data.shipData.gnar}</p></div>
            </div>
            <br />
            <div className='orderItList'>
                <div className='listItem'><img className='icon' src="./Images/user.svg" alt="" /></div>
                <div className='listItem'><p>{"User ID : " + data.UserId}</p></div>
            </div>
            <br />
            <div className='orderItList'>
                <div className='listItem'><img className='icon' src="./Images/box.svg" alt="" /></div>
                <div className='listItem'><p>{currencyFormat(data.amount)}</p></div>
                <div className='listItem dot'/>
                <div className='listItem'><p>{data.quantity + " MT"}</p></div>
            </div>
            <div className='BtnList'>
                <div onClick={()=>{
                    openOrder({main: data, mode: 1})
                }} className='Btn'><p>View Details</p></div>
                {(data.status !== 1) ? <div onClick={()=>{
                    openOrder({main: data, mode: 2})
                }} className='Btn'><p>Verify</p></div> : null}
            </div>
        </div>
    )
}

export default Order;