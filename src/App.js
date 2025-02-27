import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import Registration from './components/Registration/Registration';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./components/LoginPage/LoginPage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Blogs from "./components/Blogs/Blogs";
import Training from "./components/Training/Training";
import OpenedBlog from "./components/Blogs/OpenedBlog/OpenedBlog";
import ProgramProvider from "./components/Context/Program/ProgramProvider";
import BlogProvider from "./components/Context/Blog/BlogProvider";



function App() {

    //Login felhasználó név és jelszó Trainerhez: edzo, edzo
    //Login felhasználó név és jelszó Klienshez: kliens, kliens

    const [trainersTest,setTrainerTest] = useState([])

    useEffect(()=>{
        //init
      axios.get('/trainer/').then(({data})=>{
        const trainer = data;
        setTrainerTest(trainer);
      }).catch((error)=>{
          console.log(error)
      });

    },[])


    /*
    Feladatok
    User delete
    Onchange és patchek megírása
     */


  return (
   <div>
       <ProgramProvider>
           <BlogProvider>
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
           </BlogProvider>
       </ProgramProvider>

   </div>
  );
}

export default App;
