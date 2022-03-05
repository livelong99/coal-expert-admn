import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyBDwmB-SCLie208LC4CA0VatZUeR82ODYs",
  
    authDomain: "coal-expert.firebaseapp.com",
  
    projectId: "coal-expert",
  
    storageBucket: "coal-expert.appspot.com",
  
    messagingSenderId: "765033539936",
  
    appId: "1:765033539936:web:5622fccd1f61d7374b1605",
  
    measurementId: "G-5TJKYDBK9N"
  
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)
  