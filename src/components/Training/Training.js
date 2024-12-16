import Navbar from "../Navbar/Navbar";
import {useState} from "react";
import styles from "./Training.module.css"
import Trainer from "./Trainer/Trainer";

function Training(){

    //False == Cliens, True == Edző
    const [userType, setUserType]=useState(true);

    function handleUser(){
        if (userType){
            return(
                <div>
                    <Trainer/>
                </div>
            );
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