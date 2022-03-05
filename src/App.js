import React, { useEffect, useState } from 'react';
import Login from './Components/Login';
import "./scss/main.scss"
import { auth } from './fConfig';
import MainS from './Components/MainS';


function App() {

  const [loginState, setLoginState] = useState(-2);

  const loggedIn = () => {
    if(auth.currentUser === null){
      setLoginState(0);
    }
    else{
      setLoginState(1);
    }
  }

  useEffect(() => {
    if(loginState===-2){
      setLoginState(-1);
      setTimeout(() => {
        if(auth.currentUser === null){
          setLoginState(0);
        }
        else{
          setLoginState(1);
        }     
      }, 1000);  
    }
     
  })

  return (
    <>
      {(loginState===0) ? <Login loggedIn={loggedIn}/> : (loginState===1) ? <MainS/> : null}
    </>
  );
}

export default App;
