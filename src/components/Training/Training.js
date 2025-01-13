import Navbar from "../Navbar/Navbar";
import {useContext, useState} from "react";
import styles from "./Training.module.css"
import Trainer from "./Trainer/Trainer";
import Client from "./Client/Client";
import UserContext from "../Context/UserContext";


function Training(){


    const [programsData, setProgramsData]=useState([
        {
            trainer : {
                trainerId : 101,
                trainerName:"Sanyi",
                profession:"Pimp"
            },
            startDate: '2024-12-11 14:00',
            endDate: '2024-12-11 16:00',
            trainingType: 'PILATES',
            price : 1000
        },
        {
            trainer : {
                trainerId : 101,
                trainerName:"Sanyi",
                profession:"Pimp"
            },
            startDate: '2024-12-11 18:00',
            endDate: '2024-12-11 19:00',
            trainingType: 'SPINNING',
            price : 2000
        },
        {
            trainer : {
                trainerId : 102,
                trainerName:"Bela",
                profession:"Cigány"
            },
            startDate: '2024-12-12 12:00',
            endDate: '2024-12-12 14:00',
            trainingType: 'TRX',
            price : 1500
        },
        {
            trainer : {
                trainerId : 102,
                trainerName:"Bela",
                profession:"Cigány"
            },
            startDate: '2024-12-10 14:00',
            endDate: '2024-12-10 16:00',
            trainingType: 'POUND',
            price : 1500
        }
    ]);

    const userType = useContext(UserContext)

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