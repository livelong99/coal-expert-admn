import React, { useState } from 'react';
import axios from "axios";

const Form = ({shpData, closeFrm}) => {

    const [data, setData] = useState((shpData===0) ? {} : shpData);  
    
    const setShip = async () => {

        console.log(data);

        const setD = await axios
          .post("https://coal-expert-back.herokuapp.com/set-ship", {
              data: data
          })
          .then((t)=>
              t.data
          )

        if(setD.status === 'ok'){
            console.log("Ship Added");
            closeFrm();
        }
    }

    return(
        <div className='formBg'>
            <div className='formC'>
                <p className='head'>Fill in the Ship Details</p>
                <div onClick={() => {closeFrm()}} className='closeBtn'>
                    <img src="./Images/close.svg" alt="" />
                </div>
                <div className='InputC'>
                    <div className='Input'>
                        <input value={data.name} onChange={(event) => {setData({...data, name: event.target.value})}} id="name" type="text" autoComplete='off' placeholder=" "/>
                        <label for="name" class="form__label">Ship Name</label>
                    </div>                    
                    <div className='Input'>
                        <input value={data.reportLink} onChange={(event) => {setData({...data, reportLink: event.target.value})}} id="doc" type="text" autoComplete='off' placeholder=" "/>
                        <label for="doc" class="form__label">PDF Report (Link)</label>
                    </div>
                    <div className='Input short'>
                        <input disabled={(shpData===0) ? false : true} value={data.id} onChange={(event) => {setData({...data, id: event.target.value})}} id="id" type="text" autoComplete='off' placeholder=" "/>
                        <label for="id" class="form__label">Ship ID</label>
                    </div>
                    <div className='Input short'>
                        <input value={data.originCntry} onChange={(event) => {setData({...data, originCntry: event.target.value})}} id="origin" type="text" autoComplete='off' placeholder=" "/>
                        <label for="origin" class="form__label">Origin Port</label>
                    </div>
                    <div className='Input short'>
                        <input value={data.destination} onChange={(event) => {setData({...data, destination: event.target.value})}} id="destination" type="text" autoComplete='off' placeholder=" "/>
                        <label for="destination" class="form__label">Destination Port</label>
                    </div>
                    <div className='Input short'>
                        <input value={data.quantity} onChange={(event) => {setData({...data, quantity: parseFloat(event.target.value)})}} id="quan" type="text" autoComplete='off' placeholder=" "/>
                        <label for="quan" class="form__label">Total Quantity</label>
                        <div className='postfix'><p>MT</p></div>
                    </div>
                    <div className='Input vShort'>
                        <input value={data.gar} onChange={(event) => {setData({...data, gar: event.target.value})}} id="gn" type="text" autoComplete='off' placeholder=" "/>
                        <label for="gn" class="form__label">GAR</label>
                    </div>
                    <div className='Input vShort'>
                        <input value={data.nar} onChange={(event) => {setData({...data, nar: event.target.value})}} id="gn" type="text" autoComplete='off' placeholder=" "/>
                        <label for="gn" class="form__label">NAR</label>
                    </div>
                    <div className='Input short'>
                        <input style={{paddingLeft: "40px"}} value={data.rate} onChange={(event) => {setData({...data, rate: parseFloat(event.target.value)})}} id="rate" type="text" autoComplete='off' placeholder=" "/>
                        <label style={{left: "30px"}} for="rate" class="form__label">Rate</label>                        
                        <div className='prefix'><p>₹</p></div>
                        <div style={{right: "0px"}} className='postfix'><p>/MT</p></div>
                    </div>
                    <div className='Input'>
                        <input value={data.add1} onChange={(event) => {setData({...data, add1: event.target.value})}} id="doc" type="text" autoComplete='off' placeholder=" "/>
                        <label for="doc" class="form__label">Additional Detail 01</label>
                    </div>
                    <div className='Input'>
                        <input value={data.add2} onChange={(event) => {setData({...data, add2: event.target.value})}} id="doc" type="text" autoComplete='off' placeholder=" "/>
                        <label for="doc" class="form__label">Additional Detail 02</label>
                    </div>
                </div>
                <div onClick={setShip} className='submitBtn'>
                    <p>Proceed</p>
                </div>
            </div>
        </div>
    )
}

export default Form;