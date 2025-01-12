import styles from './App.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Registration from './components/Registration/Registration';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./components/LoginPage/LoginPage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Blogs from "./components/Blogs/Blogs";
import Training from "./components/Training/Training";




function App() {

    /*
    Feladatok:
        UserAdatok useContext-el amit minden komponens public lát ne kelljen átadogatni
        a userTypot(A userTypot az dönti majd el hogy bejelentkezéskor melyik adattáblában
         találtuk meg)!!! legfontosabb
         Programra való jelentkezésnél nem jelenik meg a trainer neve
         Program ár

        Ha nincs bejelentkezve akkor ne tudjon jelentkezni a trainingre, de tudja megtekinteni
        A blogokat ugyan úgy tudja megtekinteni mint egy default user,
     */

    const [clients,setClients] = useState([])
    const [trainersTest,setTrainerTest] = useState([])
    const [isUserLoggedIn,setIsUserLoggedIn] = useState(false)

    //False == Cliens, True == Edző
    const [userType, setUserType]=useState(null);




      useEffect(()=>{
        //init
          axios.get('/trainer/').then(({data})=>{
            const trainer = data;
            setTrainerTest(trainer);
          }).catch((error)=>{
              console.log(error)
          })
      },[])




  return (
   <div>
       <BrowserRouter>
           <Routes>
               <Route index element={<LandingPage trainers={trainersTest}/>} />
               <Route path="/landingPage" element={<LandingPage trainers={trainersTest}/>} />
               <Route path="/login" element={<LoginPage/>} />
               <Route path="/registration" element={<Registration />} />
               <Route path="/blogs" element={<Blogs userType={userType} />} />
               <Route path="/training" element={<Training userType={userType} />} />
               <Route path="*" element={<PageNotFound />} />
           </Routes>
       </BrowserRouter>

   </div>
  );
}

export default App;
