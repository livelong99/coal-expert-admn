import React from 'react';

const Ship = ({editShp, data}) => {

    return(
        <div className='shipCont'>
            <div className='idC'>
                <p>{data.id}</p>
            </div>
            <div onClick={() => {window.open(data.reportLink, "_blank")}} className='docL'>
                <p>Report</p>
                <img src="./Images/doc.svg" alt="" />
            </div>
            <p className='name'>{data.name}</p>
            <p className='detail'>Rate : {data.rate}<b>{data.gnar}</b>Total Quantity : {data.quantity}</p>
            <p className='Cntry'>Origin Country : <b>{data.originCntry}</b></p>
            <div onClick={() => {editShp(data)}} className='editBtn'>
                <p>Edit</p>
                <img src="./Images/edit.svg" alt="" />
            </div>
        </div>
    )
}

export default Ship;