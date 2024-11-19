import styles from './App.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';

import Modal from '@mui/material/Modal';
import Registration from './components/Registration/Registration';


function App() {




    const [clients,setClients] = useState([])

    useEffect(()=>{
      //init
        axios.get('http://localhost:8080/client/listAll').then(({data})=>{
          const client = data;
          setClients(client);
        }).catch((error)=>{
            console.log(error)
        })

    },[])

  


  return (
   <>
    <Navbar/>


        
   
   </>
  );
}

export default App;
