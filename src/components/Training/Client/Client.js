import styles from './Client.module.css';
import { Grid } from '@mui/joy';
import { Divider, Button, Snackbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/User/UserContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProgramContext from "../../Context/Program/ProgramContext";
import axios from "axios";

function Client() {
    const daysOfWeek = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
    const { user, isUserLoggedIn } = useContext(UserContext);
    const { programs } = useContext(ProgramContext);
    const [snackBarSuccess, setSnackBarSuccess] = useState(false);
    const [snackBarError, setSnackBarError] = useState(false);
    const [registeredPrograms, setRegisteredPrograms] = useState({});

    const closeSnackBarSuccess = () => setSnackBarSuccess(false);
    const openSnackBarSuccess = () => setSnackBarSuccess(true);

    const closeSnackBarError = () => setSnackBarError(false);
    const openSnackBarError = () => setSnackBarError(true);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long' };
        const dayName = new Intl.DateTimeFormat('hu-HU', options).format(date);
        return dayName.charAt(0).toUpperCase() + dayName.slice(1);
    };

    const groupedPrograms = programs.reduce((acc, program) => {
        const day = formatDate(program.startTime);
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(program);
        return acc;
    }, {});

    const getTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleUserRegistrationToProgram = async (program) => {
        try {
            const response = await axios.post(`/program/${program.id}/clients/${user.id}`);
            await getProgramClients(program);
            openSnackBarSuccess();
        } catch (error) {
            openSnackBarError();
        }
    };

    const  handleUserCancellationToProgram = async (program) => {
        try {
            const response = await axios.delete(`/program/${program.id}/clients/${user.id}`);
            await getProgramClients(program);
            openSnackBarSuccess()
        } catch (error) {
            openSnackBarError();
        }
    };

    const getProgramClients = async (program) => {
        try {
            const response = await axios.get(`/program/${program.id}/client-list`);
            if (response.data && Array.isArray(response.data)) {
                const isRegistered = response.data.some(client => client.id === user.id);
                setRegisteredPrograms(prevState => ({
                    ...prevState,
                    [program.id]: isRegistered
                }));
            }
        } catch (error) {
            console.error("Hiba a jelentkezők lekérése során:", error);
        }
    };

    useEffect(() => {
        programs.forEach(program => {
            getProgramClients(program);
        });
    }, [programs]);

    const handleApplication = (isLoggedIn, program) => {
        if (isLoggedIn && program.status === "UPCOMING" && !registeredPrograms[program.id]) {
            return (
                <Button variant='contained' sx={{ fontSize: '1.3rem' }} onClick={() => handleUserRegistrationToProgram(program)}>
                    Jelentkezés
                </Button>
            );
        }else if (isLoggedIn && program.status === "UPCOMING" && registeredPrograms[program.id]){
            return (
                <Button variant='outlined' color='error' sx={{ fontSize: '1.3rem' }} onClick={() => handleUserCancellationToProgram(program)}>
                    Lemondás
                </Button>
            )
        }
        return null;
    };

    const handleStatus = (status) => {
        let color, statusText;
        switch (status) {
            case "UPCOMING":
                color = 'green';
                statusText = 'Közelgő';
                break;
            case "IN_PROGRESS":
                color = 'orange';
                statusText = 'Folyamatban lévő';
                break;
            case "COMPLETED":
                color = 'red';
                statusText = 'Befejezett';
                break;
            default:
                return null;
        }
        return (
            <>
                <MoreVertIcon style={{ color: color }} />
                <div>{statusText}</div>
            </>
        );
    };

    return (
        <div className={styles.calendar}>
            <Grid container rowSpacing={1} spacing={2} columns={{ xs: 2, sm: 2, md: 12 }}>
                {daysOfWeek.map((day) => (
                    <Grid item xs={2.4} key={day} className={styles.days}>
                        <div className={styles.program}>
                            <h2>{day}</h2>
                            <Divider color='black' />
                            <div className={styles.programOnDay}>
                                <p>Programok:</p>
                                {groupedPrograms[day] ?
                                    groupedPrograms[day].map((program, index) => (
                                        <div key={index}>
                                            <Divider />
                                            <div className={styles.status}>
                                                {handleStatus(program.status)}
                                            </div>
                                            <div className={styles.dates}>
                                                <div><h3>Edzés : </h3> {program.programType}</div>
                                                <div><h3>Edző : </h3> {program.trainer.name}</div>
                                                <div><h3>Kezdés : </h3> {getTime(program.startTime)}</div>
                                                <div><h3>Vége : </h3> {getTime(program.endTime)}</div>
                                                <div><h3>Ár : </h3> {program.price} Ft</div>
                                            </div>
                                            <div className={styles.signUpButton}>
                                                {handleApplication(isUserLoggedIn, program)}
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <>
                                        <Divider />
                                        <div>Nincs program</div>
                                    </>
                                }
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <Snackbar
                open={snackBarSuccess}
                autoHideDuration={6000}
                onClose={closeSnackBarSuccess}
                message="Sikeres!"
                sx={{
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: 'green',
                    }
                }}
            />
            <Snackbar
                open={snackBarError}
                autoHideDuration={6000}
                onClose={closeSnackBarError}
                message="Sikertelen próbálkozás!"
                sx={{
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: 'red',
                    }
                }}
            />
        </div>
    );
}

export default Client;