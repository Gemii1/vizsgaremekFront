import Navbar from "../Navbar/Navbar";
import {useContext, useEffect, useState} from "react";
import styles from "./Training.module.css"
import Trainer from "./Trainer/Trainer";
import Client from "./Client/Client";
import UserContext from "../Context/UserContext";
import axios from "axios";


function Training(){


    const [programsData, setProgramsData]=useState([]);
    useEffect(() => {
        fetchProgramsData();
    },[]);

    const fetchProgramsData = async () => {
        try {
            const response = await axios.get("/program/");
            setProgramsData(response.data);
        }catch(err){
            console.log("Error fetching programs"+err);
        }
    }





    const {userType,isUserLoggedIn} = useContext(UserContext)

    function handleUser(){
        if (userType){
            return(
                <div>
                    <Trainer programs={programsData}/>
                </div>
            );
        }else {
            return (
                <div>
                    <Client programs={programsData}/>
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