import React from 'react';

const Ship = ({editShp, deleteShp, data}) => {

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
            <p className='Cntry'>Origin : <b>{data.originCntry}</b><span></span> Destination : <b>{data.destination}</b></p>
            <div onClick={() => {deleteShp(data.id)}} className='delBtn'>
                <p>Delete</p>
                <img src="./Images/delete.svg" alt="" />
            </div>
            <div onClick={() => {editShp(data)}} className='editBtn'>
                <p>Edit</p>
                <img src="./Images/edit.svg" alt="" />
            </div>
        </div>
    )
}

export default Ship;