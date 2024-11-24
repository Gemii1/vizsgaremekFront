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
        imgURL:"img1.jpg"

      },
        {
            name:"Joska",
            birthYear:1991,
            phoneNumber:"+3620 756 32 32",
            imgURL:"img1.jpg"

        },
        {
            name:"Joska",
            birthYear:1991,
            phoneNumber:"+3620 756 32 32",
            imgURL:"img1.jpg"

        },{
            name:"Joska",
            birthYear:1991,
            phoneNumber:"+3620 756 32 32",
            imgURL:"img1.jpg"

        },{
            name:"Joska",
            birthYear:1991,
            phoneNumber:"+3620 756 32 32",
            imgURL:"https://media.discordapp.net/attachments/952640543253475348/1308903299805745203/img1.jpg?ex=673fa2b0&is=673e5130&hm=0fbb60c26d55d00d098e636e399ef60b4e8179d6eec53e085ba751a37994df5e&=&format=webp&width=718&height=718"

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
