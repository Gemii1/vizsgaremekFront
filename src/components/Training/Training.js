import Navbar from "../Navbar/Navbar";
import {useState} from "react";
import styles from "./Training.module.css"
import Trainer from "./Trainer/Trainer";
import Client from "./Client/Client";


function Training(){

    //False == Cliens, True == Edző
    const [userType, setUserType]=useState(true);
    const [programsData, setProgramsData]=useState([
        {
            trainerId : 101,
            startDate: '2024-12-11 14:00',
            endDate: '2024-12-11 16:00',
            trainingType: 'PILATES',
            price : 1000
        },
        {
            trainerId : 101,
            startDate: '2024-12-11 18:00',
            endDate: '2024-12-11 19:00',
            trainingType: 'SPINNING',
            price : 2000
        },
        {
            trainerId : 101,
            startDate: '2024-12-12 12:00',
            endDate: '2024-12-12 14:00',
            trainingType: 'TRX',
            price : 1500
        }
    ]);

    function handleUser(){
        if (userType){
            return(
                <div>
                    <Trainer programs={programsData}/>
                </div>
            );
        }else {
            <div>
                <Client/>
            </div>
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