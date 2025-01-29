import axios from 'axios';
import { useEffect, useState} from 'react';
import Registration from './components/Registration/Registration';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./components/LoginPage/LoginPage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Blogs from "./components/Blogs/Blogs";
import Training from "./components/Training/Training";
import UserProvider from "./components/Context/UserProvider";
import OpenedBlog from "./components/Blogs/OpenedBlog/OpenedBlog";



function App() {

    /*
    Feladatok:
        -Blogok befejezése
        -Blogok CRUD műveletek
        -Színek kiválasztása
        -Időpontok az edzés fülön és a CRUD műveletek a trainernek, a jelentkezés a kliensnek
        -Login
        -Adataim Modal
        -NavBar függvényátírás
        -UserData userContextbe
        -Navbarba Adataim fül
        -Adataim fülön adatok módosítása, mint Telefonszám, nem, brithDate, Trainernek még qualification

     */

    const [trainersTest,setTrainerTest] = useState([])



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
       <UserProvider>
           <BrowserRouter>
               <Routes>
                   <Route index element={<LandingPage trainers={trainersTest}/>} />
                   <Route path="/landingPage" element={<LandingPage trainers={trainersTest}/>} />
                   <Route path="/login" element={<LoginPage/>} />
                   <Route path="/registration" element={<Registration />} />
                   <Route path="/blogs" element={<Blogs  />} />
                   <Route path="/openedBlog" element={<OpenedBlog  />} />
                   <Route path="/training" element={<Training  />} />
                   <Route path="*" element={<PageNotFound />} />
               </Routes>
           </BrowserRouter>
       </UserProvider>
   </div>
  );
}

export default App;
