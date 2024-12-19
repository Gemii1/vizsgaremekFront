import styles from './Client.module.css';
import Grid from '@mui/joy/Grid';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import axios from 'axios';
import {useEffect, useState} from "react";

function Client({programs}) {

    const daysOfWeek = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
    const [trainerId, setTrainerId] = useState(null );


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

    function getTrainerName(trainerId){
        axios.get(`/trainer/${trainerId}`).then(({ data }) => {
            let trainerName = data.name;
            return(
                <>
                    {trainerName}
                </>
            )

        }).catch((error) => {
            console.log(error)
        });
    }


    return (
        <div className={styles.calendar}>
            <Grid container rowSpacing={1} spacing={2} columns={{xs: 2, sm: 2, md: 12}}>
                {daysOfWeek.map((day) => (
                    <Grid item xs={2.4} key={day} className={styles.days}>
                        <div className={styles.program}>
                            <h2>{day}</h2>
                            <Divider color='black'/>
                            <div className={styles.programOnDay}>
                                <p>Programok:</p>
                                {groupedPrograms[day] ?
                                    (groupedPrograms[day].map((program, index) => (
                                            <>
                                                <Divider/>
                                                <div key={index} className={styles.dates}>

                                                    <div>Edzés : {program.trainingType}</div>
                                                    <div>Kezdés: {program.startDate}</div>
                                                    <div>Vége: {program.endDate}</div>
                                                </div>
                                                <div className={styles.signUpButton}>
                                                    <Button variant='contained'>Jelentkezés</Button>
                                                </div>
                                            </>
                                        ))
                                    ) : (
                                        <>
                                            <Divider/>
                                            <div className={styles.dates}>Nincs program</div>
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