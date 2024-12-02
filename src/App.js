import styles from './App.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Registration from './components/Registration/Registration';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./components/LoginPage/LoginPage";
import PageNotFound from "./components/PageNotFound/PageNotFound";


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


  return (
   <div>
       <BrowserRouter>
           <Routes>
               <Route index element={<LandingPage trainers={trainers}/>} />
               <Route path="/landingPage" element={<LandingPage trainers={trainers}/>} />
               <Route path="/login" element={<LoginPage/>} />
               <Route path="/registration" element={<Registration />} />
               <Route path="*" element={<PageNotFound />} />
           </Routes>
       </BrowserRouter>

   </div>
  );
}

export default App;
