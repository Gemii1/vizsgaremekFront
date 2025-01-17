import styles from './Client.module.css';
import Grid from '@mui/joy/Grid';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import axios from 'axios';
import {useContext, useEffect, useState} from "react";
import UserContext from "../../Context/UserContext";

function Client({programs}) {

    const daysOfWeek = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];

    const {userType,isUserLoggedIn} = useContext(UserContext);

    const formatDate = (dateString) => {
        const date = new Date(dateString.replace(' ', 'T'));
        const options = { weekday: 'long' };
        const dayName = new Intl.DateTimeFormat('hu-HU', options).format(date);
        return dayName.charAt(0).toUpperCase() + dayName.slice(1);
    };

    const groupedPrograms = programs.reduce((acc, program) => {
        const day = formatDate(program.startDate);
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(program);
        return acc;
    }, {});

    function handleApplication(handler){
        if (handler) {
            return (
                <Button variant='contained' sx={{fontSize:'1.3rem'}}>Jelentkezés</Button>
            )
        }
    }



    return (
        <div className={styles.calendar}>
            <Grid container rowSpacing={1} spacing={2} columns={{xs: 2, sm: 2, md: 12}}>
                {daysOfWeek.map((day) => (
                    <Grid item xs={2.4} key={day} className={styles.days}>
                        <div className={styles.program}>
                            <h2>{day}</h2>
                            <p></p>
                            <Divider color='black'/>
                            <div className={styles.programOnDay}>
                                <p>Programok:</p>
                                {groupedPrograms[day] ?
                                    (groupedPrograms[day].map((program, index) => (
                                            <>
                                                <Divider/>
                                                <div key={index} className={styles.dates}>

                                                    <div><h3>Edzés : </h3> {program.trainingType}</div>
                                                    <div><h3>Edző : </h3>  {program.trainer.trainerName}</div>
                                                    <div><h3>Kezdés : </h3>  {program.startDate.substring(program.startDate.length-5,program.startDate.length)}</div>
                                                    <div><h3>Vége : </h3>  {program.endDate.substring(program.endDate.length-5,program.endDate.length)}</div>
                                                    <div><h3>Ár : </h3>  {program.price} Ft</div>
                                                </div>
                                                <div className={styles.signUpButton}>
                                                    {handleApplication(isUserLoggedIn)}
                                                </div>
                                            </>
                                        ))
                                    ) : (
                                        <>
                                            <Divider/>
                                            <div >Nincs program</div>
                                            {handleApplication(false)}
                                        </>
                                    )}
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Client;