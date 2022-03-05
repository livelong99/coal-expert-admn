import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../fConfig";


export default function Login ({loggedIn}) {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      loggedIn();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='loginContainer'>
      <div className='formContainer'>
        <p className='head'>Admin Login</p>
        <div className='InputC'>
          <div className='Input'>
              <input value={email} onChange={(event) => {setEmail(event.target.value)}} id="email" type="email  " autoComplete='off' placeholder=" "/>
              <label for="email" class="form__label">Email</label>
          </div>                    
          <div className='Input'>
              <input value={pass} onChange={(event) => {setPass(event.target.value)}} id="pass" type="password" autoComplete='off' placeholder=" "/>
              <label for="pass" class="form__label">Password</label>
          </div>
        </div>
        <div onClick={login} className='button'>
          <p>Login</p>
        </div>
      </div>
    </div>
  )
}