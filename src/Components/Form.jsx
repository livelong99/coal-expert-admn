import React from 'react';

const Form = ({closeFrm}) => {
    return(
        <div className='formBg'>
            <div className='formC'>
                <p className='head'>Fill in the Ship Details</p>
                <div onClick={() => {closeFrm()}} className='closeBtn'>
                    <img src="./Images/close.svg" alt="" />
                </div>
                <div className='InputC'>
                    <input type="text" placeholder='Ship Detail'/>
                    <input type="text" placeholder='Ship Detail'/>
                    <input className='long' type="text" placeholder='Ship Detail'/>
                    <input type="text" placeholder='Ship Detail'/>
                    <input type="text" placeholder='Ship Detail'/>
                </div>
                <div className='submitBtn'>
                    <p>Proceed</p>
                </div>
            </div>
        </div>
    )
}

export default Form;