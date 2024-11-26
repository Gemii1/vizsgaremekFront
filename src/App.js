import styles from './App.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';

import Modal from '@mui/material/Modal';
import Registration from './components/Registration/Registration';
import LandingPage from './components/LandingPage/LandingPage';


function App() {



    const [clients,setClients] = useState([])
    const [trainers,setTrainers] = useState([
      {
        name:"Joska",
        birthYear:1991,
        phoneNumber:"+3620 756 32 32",
        imgURL:"Images/img1.jpg"

      },
        {
            name:"Joska",
            birthYear:1991,
            phoneNumber:"+3620 756 32 32",
            imgURL:"Images/img1.jpg"

        },
        {
            name:"Joska",
            birthYear:1991,
            phoneNumber:"+3620 756 32 32",
            imgURL:"Images/img1.jpg"

        },{
            name:"Joska",
            birthYear:1991,
            phoneNumber:"+3620 756 32 32",
            imgURL:"Images/img1.jpg"

        },{
            name:"Joska",
            birthYear:1991,
            phoneNumber:"+3620 756 32 32",
            imgURL:"Images/img1.jpg"

        },

    ])

  /*
      useEffect(()=>{
        //init
          axios.get('http://localhost:8080/client/listAll').then(({data})=>{
            const client = data;
            setClients(client);
          }).catch((error)=>{
              console.log(error)
          })

      },[])


   */


  const [isUserLoggedIn,setIsUserLoggedIn] = useState(false)

  function login() {
    if (!isUserLoggedIn) {
      return(
          <LandingPage trainers={trainers}/>

      )
    }
  }

  return (
   <>
      {login()}
   </>
  );
}

export default App;
