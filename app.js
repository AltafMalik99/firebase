// step 1. type module in script 
// step 2 . live server 

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth } from "firebase/auth";

  const firebaseConfig = {
    apiKey: "AIzaSyDYcefcGfx1K7ja1k6c-XniBK71-9Rj2Fs",
    authDomain: "my-first-project-9f5c0.firebaseapp.com",
    projectId: "my-first-project-9f5c0",
    storageBucket: "my-first-project-9f5c0.firebasestorage.app",
    messagingSenderId: "203135643760",
    appId: "1:203135643760:web:78df44e94d52a9b496c4b5",
    measurementId: "G-LGKWN7L05G"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  console.log('app=>',app);
  
  const auth = getAuth(app);
  console.log("auth=>",auth);
  

