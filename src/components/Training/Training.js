import Navbar from "../Navbar/Navbar";
import {useContext, useEffect, useState} from "react";
import styles from "./Training.module.css"
import Trainer from "./Trainer/Trainer";
import Client from "./Client/Client";
import UserContext from "../Context/User/UserContext";
import axios from "axios";
import ProgramContext from "../Context/Program/ProgramContext";


function Training(){



    const  {programs,fetchPrograms} = useContext(ProgramContext);
    const [programsData, setProgramsData]=useState([]);
    useEffect(() => {
        fetchPrograms();
    },[]);






    const {userType,isUserLoggedIn} = useContext(UserContext)

    function handleUser(){
        if (userType){
            return(
                <div>
                    <Trainer/>
                </div>
            );
        }else {
            return (
                <div>
                    <Client/>
                </div>
            )
        }
    }

    return (
        <>
            <Navbar/>
            <div className={styles.calendar}>
                {handleUser()}
            </div>
        </>
    )
}
export default Training;